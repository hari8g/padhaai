#!/usr/bin/env python3
"""Export legacy Paadhai pages into this repo.

What it does:
- Fetches each URL listed in `content/site.json` under `legacy.pages`
- Saves a raw HTML snapshot to `content/raw/<slug>.html`
- Extracts main page text and converts to Markdown -> `content/pages/<slug>.md`
- Downloads linked PDFs/images into `public/legacy/` (best-effort)

Usage:
  pip install -r scripts/requirements.txt
  python scripts/export_site.py
"""

from __future__ import annotations

import json
import os
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md

ROOT = Path(__file__).resolve().parents[1]
SITE_JSON = ROOT / "content" / "site.json"
RAW_DIR = ROOT / "content" / "raw"
PAGES_DIR = ROOT / "content" / "pages"
PUBLIC_LEGACY = ROOT / "public" / "legacy"

UA = "paadhai-modern-site-exporter/1.0"

def slug_to_path(slug: str) -> Path:
  slug = slug.strip("/").replace("..", "")
  return Path(slug)

def ensure_parent(p: Path) -> None:
  p.parent.mkdir(parents=True, exist_ok=True)

def clean_filename(name: str) -> str:
  name = re.sub(r"[^a-zA-Z0-9._-]+", "-", name).strip("-")
  return name[:160] if name else "file"

def download_asset(url: str, out_dir: Path) -> str | None:
  try:
    r = requests.get(url, headers={"User-Agent": UA}, timeout=30)
    r.raise_for_status()
    parsed = urlparse(url)
    fname = clean_filename(Path(parsed.path).name or "asset")
    out_path = out_dir / fname
    ensure_parent(out_path)
    out_path.write_bytes(r.content)
    return str(out_path.relative_to(ROOT))
  except Exception:
    return None

def extract_main(soup: BeautifulSoup) -> str:
  # Heuristics: prefer <main>, then common content wrappers, else body text.
  for sel in ["main", "#content", ".content", ".container", "article"]:
    node = soup.select_one(sel)
    if node and node.get_text(strip=True):
      return node.decode()
  body = soup.body or soup
  return body.decode()

def html_to_markdown(html: str) -> str:
  # markdownify keeps links; we also collapse excessive whitespace.
  text = md(html, heading_style="ATX")
  text = re.sub(r"\n{3,}", "\n\n", text).strip()
  return text

def write_page(slug: str, title: str, markdown: str) -> None:
  md_path = PAGES_DIR / f"{slug_to_path(slug)}.md"
  ensure_parent(md_path)
  front = f"---\ntitle: {title}\nsource: legacy-import\n---\n\n"
  md_path.write_text(front + markdown + "\n", encoding="utf-8")

def main():
  data = json.loads(SITE_JSON.read_text(encoding="utf-8"))
  pages = data["legacy"]["pages"]

  RAW_DIR.mkdir(parents=True, exist_ok=True)
  PUBLIC_LEGACY.mkdir(parents=True, exist_ok=True)

  for p in pages:
    slug = p["slug"]
    url = p["url"]
    print(f"[fetch] {slug} <- {url}")

    try:
      r = requests.get(url, headers={"User-Agent": UA}, timeout=30)
      r.raise_for_status()
      html = r.text
    except requests.exceptions.HTTPError as e:
      print(f"  [skip] {e}")
      continue
    except Exception as e:
      print(f"  [error] {e}")
      continue

    raw_path = RAW_DIR / f"{slug_to_path(slug)}.html"
    ensure_parent(raw_path)
    raw_path.write_text(html, encoding="utf-8")

    soup = BeautifulSoup(html, "lxml")
    title = (soup.title.get_text(strip=True) if soup.title else slug).split("|")[0].strip() or slug

    main_html = extract_main(soup)
    markdown = html_to_markdown(main_html)

    # Download PDFs / images referenced on the page (best effort)
    for tag in soup.find_all(["a", "img"]):
      link = tag.get("href") or tag.get("src")
      if not link:
        continue
      abs_url = urljoin(url, link)
      if abs_url.lower().endswith((".pdf", ".png", ".jpg", ".jpeg", ".webp", ".gif")):
        rel = download_asset(abs_url, PUBLIC_LEGACY)
        if rel and tag.name == "a":
          # keep as relative link in markdown
          pass

    write_page(slug, title, markdown)

  # Download known resource PDFs as well
  for res in data["legacy"].get("resources", []):
    u = res["url"]
    print(f"[asset] {u}")
    download_asset(u, PUBLIC_LEGACY)

  print("\nDone. Raw HTML: content/raw/ • Markdown: content/pages/ • Assets: public/legacy/")

if __name__ == "__main__":
  main()

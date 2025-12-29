# Paadhai — Modern Website (Content-preserving rebuild)

This repository contains a modern Next.js website scaffold **and** a `scripts/` exporter that can *pull the full content from the existing site* (all pages + PDFs + images), snapshot it, and convert pages into Markdown that this site renders.

## Tech stack
- Next.js (App Router) + TypeScript
- TailwindCSS
- Markdown content rendered server-side (remark)
- Optional: automatic content import from existing site via `scripts/export_site.py`

## Quick start (website)
```bash
npm install
npm run dev
```

## Import / transport content from the current website
> This step fetches all known pages from the legacy site and saves:
> - raw HTML snapshots → `content/raw/`
> - extracted Markdown → `content/pages/`
> - downloaded assets (images/pdfs) → `public/legacy/`

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
python scripts/export_site.py
```

Then run:
```bash
npm run dev
```

## Configure
- `content/site.json` controls navigation, footer, links, and the list of legacy URLs to import.
- Donations page renders bank / wire details from `content/donate.json`.

## Notes
- This repo preserves attribution and keeps original source snapshots for auditability.
- Please verify all donation/bank details before publishing.

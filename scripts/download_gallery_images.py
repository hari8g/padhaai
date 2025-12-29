#!/usr/bin/env python3
"""
Download gallery images from padhaai.org.in/first-camp/
"""
import requests
from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import urljoin, urlparse
import os

BASE_URL = "https://padhaai.org.in/first-camp/"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
PUBLIC_LEGACY = Path(__file__).parent.parent / "public" / "legacy"

def download_image(url: str, dest_dir: Path) -> str | None:
    """Download an image and return its relative path."""
    try:
        r = requests.get(url, headers={"User-Agent": UA}, timeout=30, stream=True)
        r.raise_for_status()
        
        # Get filename from URL
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)
        if not filename or '.' not in filename:
            filename = f"image_{hash(url) % 10000}.jpg"
        
        dest_path = dest_dir / filename
        
        # Download the image
        with open(dest_path, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"  [download] {filename}")
        return f"/legacy/{filename}"
    except Exception as e:
        print(f"  [error] {e}")
        return None

def main():
    PUBLIC_LEGACY.mkdir(parents=True, exist_ok=True)
    
    print(f"[fetch] {BASE_URL}")
    try:
        r = requests.get(BASE_URL, headers={"User-Agent": UA}, timeout=30)
        r.raise_for_status()
        html = r.text
    except Exception as e:
        print(f"  [error] {e}")
        return
    
    soup = BeautifulSoup(html, "lxml")
    
    # Find all images in the page
    images = []
    for img in soup.find_all("img"):
        src = img.get("src") or img.get("data-src")
        if not src:
            continue
        
        # Get alt text for reference
        alt = img.get("alt", "")
        
        # Convert to absolute URL
        abs_url = urljoin(BASE_URL, src)
        
        # Skip common UI images
        if any(skip in abs_url.lower() for skip in ["logo", "icon", "button", "arrow", "menu"]):
            continue
        
        images.append((abs_url, alt))
    
    print(f"\nFound {len(images)} images")
    
    # Download images
    downloaded = []
    downloaded_urls = set()
    for url, alt in images:
        if url not in downloaded_urls:
            downloaded_urls.add(url)
            rel_path = download_image(url, PUBLIC_LEGACY)
            if rel_path:
                downloaded.append((url, alt, rel_path))
    
    print(f"\nDownloaded {len(downloaded)} images")
    
    # Print mapping for reference
    print("\nImage mapping:")
    for i, (url, alt, rel_path) in enumerate(downloaded, 1):
        print(f"{i}. {rel_path} - {alt[:50]}")

if __name__ == "__main__":
    main()


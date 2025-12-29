import Link from "next/link";
import site from "../../content/site.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 mt-32">
      <div className="px-6 md:px-8 py-6 text-center text-neutral-500 text-sm">
        {site.footer.copyright}
      </div>
    </footer>
  );
}

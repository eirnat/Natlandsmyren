import Link from "next/link";
import { GARD_MERKENAVN } from "../lib/gard";

export function SiteTopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-sage-soft/50 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3.5 md:px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-sage-dark transition-colors hover:text-sage md:text-xl"
        >
          {GARD_MERKENAVN}
        </Link>
      </div>
    </header>
  );
}

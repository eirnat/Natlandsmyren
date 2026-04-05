import Link from "next/link";
import { GARD_MERKENAVN } from "../lib/gard";

export function SiteTopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#3A4D3A]/18 bg-[#F5E9D3]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl justify-center px-4 py-3.5 md:px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-[#3A4D3A] transition-all duration-200 hover:text-[#2d3d2d] active:scale-[0.98] md:text-xl"
        >
          {GARD_MERKENAVN}
        </Link>
      </div>
    </header>
  );
}

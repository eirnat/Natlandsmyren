import { GARD_MERKENAVN } from "../lib/gard";
import Link from "next/link";

export function FarmFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t-2 border-black/25 bg-moss py-8 text-center text-sm text-cream/90">
      <p className="font-semibold text-cream">
        {GARD_MERKENAVN}{" "}
        <span className="font-medium text-cream/75">{year}</span>
      </p>
      <p className="mt-3">
        <Link
          href="/historie"
          className="font-semibold text-cream/90 underline decoration-cream/50 underline-offset-4 transition hover:text-cream hover:decoration-cream"
        >
          Historie
        </Link>
      </p>
    </footer>
  );
}

import { GARD_MERKENAVN } from "../lib/gard";
import Link from "next/link";

export function FarmFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[var(--farm-border)] bg-[var(--color-takegraa)] py-8 text-center text-small text-foreground">
      <p className="font-medium text-foreground">
        {GARD_MERKENAVN}{" "}
        <span className="text-foreground/75">{year}</span>
      </p>
      <p className="mt-3">
        <Link href="/historie" className="link-farm font-medium">
          Historie
        </Link>
      </p>
    </footer>
  );
}

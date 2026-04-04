import Link from "next/link";
import { GARD_NAVN } from "../lib/gard";

const fotlenker = [
  { href: "/", label: "Hjem" },
  { href: "/dyrene", label: "Dyrene" },
  { href: "/historie", label: "Historie" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function FarmFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-sage-soft/40 bg-cream-muted/90">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <nav
          aria-label="Sidemeny"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-sage-dark"
        >
          {fotlenker.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-ink-muted transition hover:text-sage-dark"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-8 text-center font-display text-base text-sage-dark md:text-lg">
          {GARD_NAVN}
        </p>
        <p className="mt-1 text-center text-xs text-ink-muted md:text-sm">
          {year}
        </p>
      </div>
    </footer>
  );
}

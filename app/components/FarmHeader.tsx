import Link from "next/link";
import { GARD_HEADER_NAVN } from "../lib/gard";

const lenker = [
  { href: "/", label: "Hjem" },
  { href: "/dyrene", label: "Dyrene" },
  { href: "/historie", label: "Historie" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function FarmHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-sage-soft/60 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-8">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-sage-dark transition-colors hover:text-honey md:text-2xl"
        >
          {GARD_HEADER_NAVN}
        </Link>
        <nav aria-label="Hovedmeny">
          <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
            {lenker.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-sage-soft/50 hover:text-sage-dark sm:px-4"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

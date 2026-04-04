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
    <footer className="mt-auto border-t border-moss/10 bg-oatmeal-muted/90">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <nav
          aria-label="Sidemeny"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-moss"
        >
          {fotlenker.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-moss-muted transition-all duration-200 hover:text-ochre active:opacity-70"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-8 text-center font-display text-base text-moss md:text-lg">
          {GARD_NAVN}
        </p>
        <p className="mt-1 text-center text-xs text-moss-muted md:text-sm">
          {year}
        </p>
      </div>
    </footer>
  );
}

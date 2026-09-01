import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Hjem" },
  { href: "/historie", label: "Historie" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function SiteNav() {
  return (
    <header className="border-b border-[var(--farm-border)] bg-background">
      <nav
        className="mx-auto flex max-w-[72rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-8"
        aria-label="Hovednavigasjon"
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold text-foreground"
        >
          Natlandsmyren
        </Link>
        <ul className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-farm text-sm font-medium">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

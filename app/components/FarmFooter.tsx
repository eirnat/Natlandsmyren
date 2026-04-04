import { GARD_NAVN } from "../lib/gard";

export function FarmFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-sage-soft/50 bg-cream-muted/80">
      <div className="mx-auto max-w-5xl rounded-t-[2rem] px-6 py-12 text-center md:px-8">
        <p className="font-display text-lg text-sage-dark">{GARD_NAVN}</p>
        <p className="mt-2 text-sm text-ink-muted">
          Et sted for tradisjon og glede · {year}
        </p>
      </div>
    </footer>
  );
}

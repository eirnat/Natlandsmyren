import { GARD_MERKENAVN } from "../lib/gard";

export function FarmFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-moss/15 bg-cream-deep/55 py-7 text-center text-sm text-foreground/80">
      <p className="font-medium text-moss">
        {GARD_MERKENAVN}{" "}
        <span className="text-foreground/75">{year}</span>
      </p>
    </footer>
  );
}

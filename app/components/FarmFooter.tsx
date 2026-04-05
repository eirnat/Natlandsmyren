import { GARD_MERKENAVN } from "../lib/gard";

export function FarmFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t-2 border-black/25 bg-moss py-8 text-center text-sm text-cream/90">
      <p className="font-semibold text-cream">
        {GARD_MERKENAVN}{" "}
        <span className="font-medium text-cream/75">{year}</span>
      </p>
    </footer>
  );
}

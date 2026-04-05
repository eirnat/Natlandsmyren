import { GARD_MERKENAVN } from "../lib/gard";

export function FarmFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[#3A4D3A]/15 bg-[#EADDC4]/55 py-7 text-center text-sm text-[#2D332A]/80">
      <p className="font-medium text-[#3A4D3A]">
        {GARD_MERKENAVN}{" "}
        <span className="text-[#2D332A]/75">{year}</span>
      </p>
    </footer>
  );
}

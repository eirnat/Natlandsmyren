import { GARD_MERKENAVN } from "../lib/gard";

export function FarmFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[#2d362d]/10 bg-[#fdfbf7] py-6 text-center text-sm text-[#586056]">
      <p>
        {GARD_MERKENAVN} {year}
      </p>
    </footer>
  );
}

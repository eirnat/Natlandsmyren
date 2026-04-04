import type { Metadata } from "next";
import { GARD_NAVN } from "../lib/gard";

export const metadata: Metadata = {
  title: `Dyrene – ${GARD_NAVN}`,
  description: `Dyrene på ${GARD_NAVN}.`,
};

export default function DyrenePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
      <header className="mb-12 text-center md:mb-16">
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
          Dyrene
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted md:text-lg">
          Her kan du presentere dyrene – med bilder i avrundede rammer når du
          legger dem inn.
        </p>
      </header>

      <ul className="grid gap-10 sm:grid-cols-2">
        {[
          {
            tittel: "Eksempel: Hønene",
            tekst: "Korte linjer om rasen, personlighet og rutiner.",
          },
          {
            tittel: "Eksempel: Sauene",
            tekst: "Beite, lamming eller det som passer gården din.",
          },
        ].map((kort) => (
          <li
            key={kort.tittel}
            className="overflow-hidden rounded-[1.75rem] border border-sage-soft/60 bg-cream-muted/30 shadow-sm"
          >
            <div
              className="farm-img aspect-[16/10] bg-gradient-to-br from-sage-soft/80 to-honey-soft/50"
              aria-hidden
            />
            <div className="p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-sage-dark">
                {kort.tittel}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-muted">
                {kort.tekst}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

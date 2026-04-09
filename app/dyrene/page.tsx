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
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Dyrene
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-medium text-foreground/85 md:text-lg">
          Her kan du presentere dyrene – med bilder i avrundede rammer når du
          legger dem inn.
        </p>
      </header>

      <ul className="grid gap-8 sm:grid-cols-2 sm:gap-10">
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
          <li key={kort.tittel} className="farm-panel overflow-hidden p-0">
            <div
              className="farm-img aspect-[16/10] bg-gradient-to-br from-sage-soft/60 to-honey-soft/40"
              aria-hidden
            />
            <div className="p-6 md:p-8">
              <h2 className="font-display text-xl font-bold text-foreground">
                {kort.tittel}
              </h2>
              <p className="mt-3 font-medium leading-relaxed text-foreground/85">
                {kort.tekst}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

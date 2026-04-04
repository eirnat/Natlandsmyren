import type { Metadata } from "next";
import { GARD_NAVN } from "../lib/gard";

export const metadata: Metadata = {
  title: `Historie – ${GARD_NAVN}`,
  description: `Historien til ${GARD_NAVN}.`,
};

export default function HistoriePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-16">
      <article className="rounded-[2rem] border border-sage-soft/60 bg-cream-muted/25 p-8 md:p-12 lg:p-14">
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
          Historie
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">
          Her kan du fortelle hvordan {GARD_NAVN} ble til – familie, bygninger,
          generasjoner eller hvordan hobbygården fikk form. Hold avsnittene
          korte og luftige, så teksten blir lett å lese på skjerm.
        </p>
        <p className="mt-5 leading-relaxed text-ink-muted">
          Erstatt denne teksten med egne minner og årstall. Et bilde i toppen
          eller langs margen (med{" "}
          <code className="rounded-md bg-cream-deep px-1.5 py-0.5 text-sm text-sage-dark">
            className=&quot;farm-img&quot;
          </code>
          ) får samme avrundede stil som resten av siden.
        </p>
      </article>
    </div>
  );
}

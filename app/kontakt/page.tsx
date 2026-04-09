import type { Metadata } from "next";
import { GARD_NAVN } from "../lib/gard";

export const metadata: Metadata = {
  title: `Kontakt – ${GARD_NAVN}`,
  description: `Kontakt ${GARD_NAVN}.`,
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="farm-panel p-8 md:p-10">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Kontakt
          </h1>
          <p className="mt-5 font-medium leading-relaxed text-foreground md:text-lg">
            Vil du stille et spørsmål, avtale besøk eller bare si hei? Legg inn
            e-post, telefon eller et enkelt skjema her når du er klar.
          </p>
          <dl className="mt-8 space-y-4 font-medium text-foreground">
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-moss">
                E-post
              </dt>
              <dd className="mt-1">
                <span className="text-foreground/70">din@epost.no</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-moss">
                Sted
              </dt>
              <dd className="mt-1">{GARD_NAVN}</dd>
            </div>
          </dl>
        </div>
        <div
          className="farm-img flex min-h-[280px] items-center justify-center rounded-2xl border-2 border-moss bg-card p-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.22)] md:min-h-0"
          role="img"
          aria-label="Plassholder for kart eller bilde"
        >
          <p className="font-display text-lg font-medium text-foreground/75 md:text-xl">
            Kart eller bilde kan plasseres her
          </p>
        </div>
      </div>
    </div>
  );
}

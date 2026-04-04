import type { Metadata } from "next";
import { GARD_NAVN } from "../lib/gard";

export const metadata: Metadata = {
  title: `Kontakt – ${GARD_NAVN}`,
  description: `Kontakt ${GARD_NAVN}.`,
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="rounded-[2rem] border border-sage-soft/60 bg-cream-muted/30 p-8 md:p-10">
          <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            Kontakt
          </h1>
          <p className="mt-5 leading-relaxed text-ink-muted md:text-lg">
            Vil du stille et spørsmål, avtale besøk eller bare si hei? Legg inn
            e-post, telefon eller et enkelt skjema her når du er klar.
          </p>
          <dl className="mt-8 space-y-4 text-ink-muted">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-sage-dark">
                E-post
              </dt>
              <dd className="mt-1">
                <span className="text-ink/60">din@epost.no</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-sage-dark">
                Sted
              </dt>
              <dd className="mt-1">{GARD_NAVN}</dd>
            </div>
          </dl>
        </div>
        <div
          className="farm-img flex min-h-[280px] items-center justify-center rounded-[2rem] border border-honey-soft/50 bg-gradient-to-br from-honey-soft/30 via-cream to-sage-soft/40 p-8 text-center md:min-h-0"
          role="img"
          aria-label="Plassholder for kart eller bilde"
        >
          <p className="font-display text-lg text-sage-dark/75 md:text-xl">
            Kart eller bilde kan plasseres her
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Fence, Flower2, History } from "lucide-react";
import { GARD_NAVN } from "./lib/gard";

const fokus = [
  {
    tittel: "Sauer på beite",
    beskrivelse:
      "Våre sauer trives på myrene rundt gården. Vi legger vekt på rolig drift, godt beite og sunne dyr – ull og lam er en bonus fra naturens side.",
    ikon: Fence,
    href: "/dyrene",
    lenkeTekst: "Les om dyrene",
    accent: "bg-sage-soft/90 text-sage-dark ring-sage/20",
  },
  {
    tittel: "Bier og humler",
    beskrivelse:
      "Honning og pollinering henger sammen. Vi holder bikuber med respekt for årstidene og sørger for at floraen rundt gården får blomstre.",
    ikon: Flower2,
    href: "/dyrene",
    lenkeTekst: "Se mer under Dyrene",
    accent: "bg-honey-soft/90 text-honey ring-honey/25",
  },
  {
    tittel: "Historie og tradisjon",
    beskrivelse:
      "Natlandsmyren bærer spor av generasjoner før oss. Vi vil bevare fortellingene – fra gamle bygninger til det som binder gården til bygda.",
    ikon: History,
    href: "/historie",
    lenkeTekst: "Utforsk historien",
    accent: "bg-cream-deep text-ink ring-sage-soft",
  },
] as const;

export default function Home() {
  return (
    <div className="pb-20 md:pb-28">
      {/* Hero */}
      <section
        className="relative border-b border-sage-soft/40 bg-gradient-to-b from-cream via-cream-muted/40 to-cream"
        aria-labelledby="forside-tittel"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(200,162,39,0.12),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-16 md:px-8 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-sage-dark/75 md:text-sm">
            Hobbygård · sauer · bier · historie
          </p>
          <h1
            id="forside-tittel"
            className="font-display mx-auto mt-6 max-w-4xl text-center text-4xl font-semibold leading-[1.12] tracking-tight text-ink md:text-5xl lg:text-[3.25rem]"
          >
            {GARD_NAVN}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-ink-muted md:text-xl md:leading-relaxed">
            En liten gård med store verdier: dyr som trives, bikuber som summer,
            og en historie som fortjener å bli fortalt videre.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              href="/dyrene"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-8 py-3.5 text-sm font-semibold text-cream shadow-md shadow-sage/20 transition hover:bg-sage-dark hover:shadow-lg"
            >
              Møt sauer og bier
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/historie"
              className="inline-flex items-center justify-center rounded-full border-2 border-sage/25 bg-cream/80 px-8 py-3.5 text-sm font-semibold text-sage-dark transition hover:border-honey/50 hover:bg-honey-soft/30"
            >
              Vår historie
            </Link>
          </div>
        </div>
      </section>

      {/* Hovedinnhold */}
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Tre søyler */}
        <section className="mt-16 md:mt-20" aria-labelledby="fokus-overskrift">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="fokus-overskrift"
              className="font-display text-2xl font-semibold text-ink md:text-3xl"
            >
              Hjertet i gårdsdriften
            </h2>
            <p className="mt-3 text-ink-muted md:text-lg">
              Tre bærebjelker som definerer hvem vi er – og hva du kan forvente
              av et besøk eller en samtale med oss.
            </p>
          </div>
          <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
            {fokus.map(
              ({ tittel, beskrivelse, ikon: Ikon, href, lenkeTekst, accent }) => (
                <li key={tittel}>
                  <article className="group flex h-full flex-col rounded-[1.75rem] border border-cream-deep bg-cream-muted/35 p-8 shadow-sm transition hover:border-sage-soft hover:shadow-md md:p-7 lg:p-8">
                    <div
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-2 ring-inset ${accent}`}
                    >
                      <Ikon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="font-display mt-6 text-xl font-semibold text-sage-dark">
                      {tittel}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted md:text-[0.95rem] md:leading-relaxed">
                      {beskrivelse}
                    </p>
                    <Link
                      href={href}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sage transition group-hover:gap-2.5 group-hover:text-sage-dark"
                    >
                      {lenkeTekst}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </article>
                </li>
              ),
            )}
          </ul>
        </section>

        {/* Historie – fremhevet bånd */}
        <section
          className="mt-16 md:mt-20"
          aria-labelledby="historie-fremhevet"
        >
          <div className="overflow-hidden rounded-[2rem] border border-sage-dark/10 bg-sage-dark text-cream shadow-xl shadow-sage/25">
            <div className="grid gap-10 p-10 md:grid-cols-2 md:items-center md:gap-12 md:p-12 lg:p-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-honey-light/90">
                  Røtter
                </p>
                <h2
                  id="historie-fremhevet"
                  className="font-display mt-3 text-2xl font-semibold leading-snug md:text-3xl"
                >
                  Mer enn et stedsnavn
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-cream/85 md:text-base md:leading-relaxed">
                  Natlandsmyren er tuftet på langvarig bruk av jorda og
                  fellesskap rundt gården. Vi bygger videre med ydmykhet for det
                  som har vært – og åpenhet for dem som vil lære mer.
                </p>
                <Link
                  href="/historie"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-honey px-6 py-3 text-sm font-semibold text-ink transition hover:bg-honey-light"
                >
                  Les hele historien
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div
                className="farm-img relative aspect-[4/3] min-h-[200px] rounded-[1.5rem] border border-cream/15 bg-gradient-to-br from-sage-light/30 via-sage/40 to-honey/20"
                role="img"
                aria-label="Illustrativ plassholder – bytt ut med bilde fra gården"
              >
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <p className="font-display text-base text-cream/70 md:text-lg">
                    Bilde: gård, beite eller historisk motiv
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avsluttende CTA */}
        <section
          className="mt-16 rounded-[2rem] border border-sage-soft/60 bg-gradient-to-br from-cream-muted/60 to-honey-soft/15 px-8 py-12 text-center md:mt-20 md:px-12 md:py-14"
          aria-labelledby="kontakt-cta"
        >
          <h2
            id="kontakt-cta"
            className="font-display text-xl font-semibold text-ink md:text-2xl"
          >
            Lyst å hilse på oss?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-muted md:text-lg">
            Enten du lurer på sauer, honning eller lokal historie – ta gjerne
            kontakt.
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-sage bg-sage px-8 py-3.5 text-sm font-semibold text-cream transition hover:bg-sage-dark"
          >
            Gå til kontakt
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </div>
    </div>
  );
}

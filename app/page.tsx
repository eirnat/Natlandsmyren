import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Fence, Flower2, History } from "lucide-react";

const fokus = [
  {
    tittel: "Sauer",
    beskrivelse:
      "Vi har sau på beite rundt gården. Vanlig hverdag: for, beite og tilsyn. Ull og lam henger med.",
    ikon: Fence,
    href: "/dyrene",
    lenkeTekst: "Dyrene",
    accent: "bg-sage-soft/90 text-sage-dark ring-sage/20",
  },
  {
    tittel: "Bier",
    beskrivelse:
      "Noen kuber står på tunet. Honning varierer med vær og blomstring. Pollinering er en sidegevinst.",
    ikon: Flower2,
    href: "/dyrene",
    lenkeTekst: "Dyrene",
    accent: "bg-sage-soft/70 text-sage-dark ring-sage/25",
  },
  {
    tittel: "Historie",
    beskrivelse:
      "Gården har lang brukshistorie. Vi har samlet det vi vet på en egen side, så det er lett å finne.",
    ikon: History,
    href: "/historie",
    lenkeTekst: "Historie-siden",
    accent: "bg-cream-deep text-ink ring-sage-soft",
  },
] as const;

export default function Home() {
  return (
    <div className="pb-20 md:pb-28">
      {/* Forsidebilde – bredt format */}
      <div className="mx-auto max-w-6xl px-6 pt-8 md:px-8 md:pt-10">
        <figure className="relative aspect-[16/7] w-full overflow-hidden rounded-[1.25rem] border border-sage-soft/45 shadow-sm md:aspect-[21/9] md:rounded-[1.5rem]">
          <Image
            src="/images/gardvinter.jpg"
            alt="Natlandsmyren om vinteren"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1152px) 100vw, 1152px"
            priority
          />
        </figure>
      </div>

      {/* Hero */}
      <section
        className="relative border-b border-sage-soft/40 bg-gradient-to-b from-cream via-cream-muted/35 to-cream"
        aria-labelledby="forside-tittel"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(125,143,111,0.08),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-16 md:px-8 md:pt-12 md:pb-24 lg:pb-28">
          <p className="text-center text-sm text-sage-dark/80 md:text-base">
            Sauer · bier · historie
          </p>
          <h1
            id="forside-tittel"
            className="font-display mx-auto mt-6 max-w-4xl text-center text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl lg:text-[3.25rem]"
          >
            natlandsmyren
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-ink-muted md:text-lg">
            Hobbygård med sau, bikuber og litt skrift om hvordan stedet har vært
            brukt. Ingen fanfare – bare det vi faktisk gjør.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/dyrene"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-7 py-3 text-sm font-medium text-cream transition hover:bg-sage-dark"
            >
              Dyrene
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/historie"
              className="inline-flex items-center justify-center rounded-full border border-sage/30 bg-cream px-7 py-3 text-sm font-medium text-sage-dark transition hover:border-sage/50 hover:bg-sage-soft/40"
            >
              Historie
            </Link>
          </div>
        </div>
      </section>

      {/* Hovedinnhold */}
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <section className="mt-16 md:mt-20" aria-labelledby="fokus-overskrift">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="fokus-overskrift"
              className="font-display text-2xl font-semibold text-ink md:text-3xl"
            >
              Dette holder vi på med
            </h2>
            <p className="mt-3 text-ink-muted md:text-base">
              Tre hovedgrep. Mer detaljer finner du på sidene under.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
            {fokus.map(
              ({ tittel, beskrivelse, ikon: Ikon, href, lenkeTekst, accent }) => (
                <li key={tittel}>
                  <article className="group flex h-full flex-col rounded-[1.75rem] border border-cream-deep bg-cream-muted/40 p-7 transition hover:border-sage-soft md:p-6 lg:p-7">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset ${accent}`}
                    >
                      <Ikon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="font-display mt-5 text-lg font-semibold text-sage-dark">
                      {tittel}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                      {beskrivelse}
                    </p>
                    <Link
                      href={href}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-sage transition group-hover:gap-1.5 group-hover:text-sage-dark"
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

        <section className="mt-16 md:mt-20" aria-labelledby="historie-fremhevet">
          <div className="overflow-hidden rounded-[2rem] border border-sage-dark/15 bg-sage-dark text-cream shadow-md">
            <div className="mx-auto max-w-2xl px-9 py-10 md:px-11 md:py-12 lg:px-12 lg:py-14">
              <div className="mb-8 flex justify-center md:justify-start">
                <div className="rounded-xl border border-cream/25 bg-cream/[0.06] p-3 shadow-sm">
                  <div className="relative h-[5.5rem] w-[5.5rem] sm:h-24 sm:w-24">
                    <Image
                      src="/images/emblem.jpg"
                      alt="Emblem for Natlandsmyren"
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                </div>
              </div>
              <p className="text-center text-xs font-medium uppercase tracking-wider text-sage-light/90 md:text-left">
                Historie
              </p>
              <h2
                id="historie-fremhevet"
                className="font-display mt-2 text-center text-xl font-semibold leading-snug md:text-left md:text-2xl"
              >
                Om gården
              </h2>
              <p className="mt-4 text-center text-sm leading-relaxed text-cream/90 md:text-left md:text-[0.95rem]">
                Det har bodd folk her lenge, og bygningene har vært med en
                stund. Vi prøver å holde orden i fakta og årstall der vi kan.
              </p>
              <div className="mt-8 flex justify-center md:justify-start">
                <Link
                  href="/historie"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/35 bg-cream/10 px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-cream/20"
                >
                  Til historie-siden
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mt-16 rounded-[2rem] border border-sage-soft/50 bg-cream-muted/50 px-7 py-11 text-center md:mt-20 md:px-10 md:py-12"
          aria-labelledby="kontakt-cta"
        >
          <h2
            id="kontakt-cta"
            className="font-display text-lg font-semibold text-ink md:text-xl"
          >
            Kontakt
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-muted md:text-base">
            Spørsmål om sau, honning eller det som står på historie-siden? Send
            en melding.
          </p>
          <Link
            href="/kontakt"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3 text-sm font-medium text-cream transition hover:bg-sage-dark"
          >
            Kontaktside
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </div>
    </div>
  );
}

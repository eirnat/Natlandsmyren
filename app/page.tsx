import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconBie, IconHone, IconSau } from "./components/GardDyrIkoner";

const fokus = [
  {
    tittel: "Birøktning",
    beskrivelse:
      "Få kuber på tunet. Honning og stell følger årstidene.",
    ikon: IconBie,
    href: "/dyrene",
  },
  {
    tittel: "Hønsehold",
    beskrivelse:
      "Høner i hagen. Egg til eget bruk og rolig tilsyn.",
    ikon: IconHone,
    href: "/dyrene",
  },
  {
    tittel: "Sauehold",
    beskrivelse:
      "Sau på beite. Vanlig drift med for, beite og tilsyn.",
    ikon: IconSau,
    href: "/dyrene",
  },
] as const;

export default function Home() {
  return (
    <div className="pb-14 md:pb-20">
      {/* Fullbredde toppbilde */}
      <figure className="relative w-full overflow-hidden shadow-sm">
        <div className="relative h-[min(34vh,300px)] w-full min-h-[200px] md:h-[min(36vh,340px)]">
          <Image
            src="/images/gardvinter.jpg"
            alt="Natlandsmyren om vinteren"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent"
            aria-hidden
          />
          <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-4 md:px-8 md:pb-5">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-cream md:text-3xl lg:text-[2rem]">
              Natlandsmyren
            </h1>
          </figcaption>
        </div>
      </figure>

      {/* Tre søyler – tett under bildet, laptop-vennlig */}
      <div className="mx-auto max-w-6xl px-4 pt-3 md:px-6 md:pt-4">
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-3 md:gap-4">
          {fokus.map(({ tittel, beskrivelse, ikon: Ikon, href }) => (
            <li key={tittel}>
              <article className="flex h-full flex-col rounded-2xl border border-sage-soft/50 bg-cream-muted/50 p-4 shadow-sm transition hover:border-sage-soft hover:shadow md:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-soft/70 text-sage-dark">
                  <Ikon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h2 className="font-display mt-3 text-base font-semibold text-ink md:text-lg">
                  {tittel}
                </h2>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-muted md:text-sm">
                  {beskrivelse}
                </p>
                <Link
                  href={href}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sage-dark transition hover:gap-1.5 md:text-sm"
                >
                  Mer
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </article>
            </li>
          ))}
        </ul>

        {/* Historie – bilde venstre, større */}
        <section
          className="mt-10 md:mt-12"
          aria-labelledby="historie-forhåndsvisning"
        >
          <div className="overflow-hidden rounded-2xl border border-sage-dark/12 bg-sage-dark text-cream shadow-md md:rounded-[1.35rem]">
            <div className="flex flex-col md:flex-row md:items-stretch">
              <div className="relative aspect-[5/4] w-full shrink-0 border-b border-cream/10 md:w-[min(44%,320px)] md:border-b-0 md:border-r md:aspect-auto md:min-h-[280px]">
                <Image
                  src="/images/emblem.jpg"
                  alt="Emblem for Natlandsmyren"
                  fill
                  className="object-contain p-6 md:p-8"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center px-6 py-7 md:px-8 md:py-8 lg:px-10">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-sage-light/95">
                  Historie
                </p>
                <h2
                  id="historie-forhåndsvisning"
                  className="font-display mt-1.5 text-xl font-semibold leading-snug md:text-2xl"
                >
                  Om gården
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/88 md:text-[0.9375rem]">
                  Gården har lang brukshistorie. Vi samler det vi vet på egen
                  side, med årstall og fakta der vi har det.
                </p>
                <Link
                  href="/historie"
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-2 text-sm font-medium text-cream transition hover:bg-cream/15"
                >
                  Historie-siden
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mt-10 rounded-2xl border border-sage-soft/45 bg-cream-muted/40 px-6 py-8 text-center md:mt-12 md:px-8 md:py-9"
          aria-labelledby="kontakt-cta"
        >
          <h2
            id="kontakt-cta"
            className="font-display text-base font-semibold text-ink md:text-lg"
          >
            Kontakt
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
            Melding om sau, honning, høner eller historie.
          </p>
          <Link
            href="/kontakt"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-sage px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-sage-dark"
          >
            Kontaktside
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </div>
    </div>
  );
}

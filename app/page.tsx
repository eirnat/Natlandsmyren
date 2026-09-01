import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { ProductSection } from "./components/ProductSection";
import { prosePortableComponents } from "./components/prosePortableText";
import type { AktivitetDoc, LandingDoc } from "../src/sanity/lib/home-data";
import { getHomePageData } from "../src/sanity/lib/home-data";
import { urlFor } from "../src/sanity/lib/image";

/** ISR: forsiden hentes på nytt fra Sanity minst hvert 60. sekund. */
export const revalidate = 60;

const DEFAULT_HERO_TITTEL = "Velkommen til Natlandsmyren";
const DEFAULT_HERO_SRC = "/images/gardsommer.jpg";
const DEFAULT_HERO_ALT = "Natlandsmyren om sommeren";
const DEFAULT_HISTORIE_OVERSKRIFT = "Historien om Natlandsmyr";
const DEFAULT_HISTORIE_BILDE_SRC = "/images/emblem.jpg";
const DEFAULT_HISTORIE_BILDE_ALT = "Emblem for Natlandsmyren";

const DEFAULT_HISTORIE_BLOKKER: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "fallback-a",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "a",
        text: "Gården Natlandsmyr var opprinnelig en husmannsplass under gården Nedre Natland, og ble opprettet i ca. 1750.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "fallback-b",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "b",
        text: "I 1751 ble plassen kalt Dalen. Navnet Myren har også vært benyttet på plassen. Det sies at eierne av Nedre Natland anla bl.a. husmannsplassene Natlandsmyr, Tøshaugen, Fagerbakken og Roligheten i søre del av eiendommen for å hevde eiendomsgrensen mot Sandalen, da her tidligere hadde vært uenighet om denne grensen.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "fallback-c",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "c",
        text: "Natlandsmyr ble utskilt som eget bruk i 1841, og året etter, i 1842 ble gården kjøpt av Ole Monsen Skåldal, som er tipp, tipp oldefar til dagens eier.",
        marks: [],
      },
    ],
  },
];

const FALLBACK_AKTIVITETER = [
  {
    _id: "local-birokt",
    tittel: "Birøkt",
    beskrivelse:
      "Honning med karakter, hentet hjem fra kubene på Natlandsmyren.",
    figur: "/images/bie.svg",
    href: "/birokt",
  },
  {
    _id: "local-honsehold",
    tittel: "Hønsehold",
    beskrivelse:
      "Ferske gårdsegg fra hønene på tunet – hver dag, rett fra huset. Frittgående høner som trives ute.",
    figur: "/images/høne.svg",
    href: "/hoensehold",
  },
  {
    _id: "local-sauehold",
    tittel: "Sauehold",
    beskrivelse:
      "Gammelnorsk spælsau – robuste sauer som kjenner myra og holder landskapet i form, beite for beite.",
    figur: "/images/sau.svg",
    href: "/sau",
  },
] as const;

function aktivitetHref(a: AktivitetDoc): string {
  const intern = a.internLenke?.trim();
  if (intern) return intern;
  const s = a.slug?.current?.trim();
  if (s) return `/${s}`;
  return "#";
}

function heroImageUrl(landing: LandingDoc): string {
  const ref = landing?.heroBilde?.asset?._ref;
  if (!ref) return DEFAULT_HERO_SRC;
  try {
    return urlFor(landing.heroBilde).width(2400).quality(88).url();
  } catch {
    return DEFAULT_HERO_SRC;
  }
}

function historieBildeUrl(landing: LandingDoc): string {
  const ref = landing?.historieBilde?.asset?._ref;
  if (!ref) return DEFAULT_HISTORIE_BILDE_SRC;
  try {
    return urlFor(landing.historieBilde).width(1200).quality(88).url();
  } catch {
    return DEFAULT_HISTORIE_BILDE_SRC;
  }
}

function ikonUrl(a: AktivitetDoc): string | null {
  if (!a.ikon?.asset?._ref) return null;
  try {
    return urlFor(a.ikon).quality(90).auto("format").url();
  } catch {
    return null;
  }
}

type AktivitetRad = {
  _id: string;
  tittel: string;
  beskrivelse: string;
  href: string;
  bildeUrl: string | null;
  bildeAlt: string;
};

function mapAktivitet(a: AktivitetDoc): AktivitetRad {
  return {
    _id: a._id,
    tittel: a.tittel,
    beskrivelse: a.beskrivelse,
    href: aktivitetHref(a),
    bildeUrl: ikonUrl(a),
    bildeAlt: a.ikon?.alt?.trim() || a.tittel,
  };
}

export default async function Home() {
  const { landing, aktiviteter: aktiviteterRaw } = await getHomePageData();

  const heroTittel = landing?.heroTittel?.trim() || DEFAULT_HERO_TITTEL;
  const heroSrc = heroImageUrl(landing);
  const heroAlt = landing?.heroBilde?.alt?.trim() || DEFAULT_HERO_ALT;
  const historieOverskrift =
    landing?.historieOverskrift?.trim() || DEFAULT_HISTORIE_OVERSKRIFT;
  const historieTekst =
    landing?.historieTekst && landing.historieTekst.length > 0
      ? landing.historieTekst
      : DEFAULT_HISTORIE_BLOKKER;
  const historieBildeSrc = historieBildeUrl(landing);
  const historieBildeAlt =
    landing?.historieBilde?.alt?.trim() || DEFAULT_HISTORIE_BILDE_ALT;

  const aktivitetRader: AktivitetRad[] =
    aktiviteterRaw.length > 0
      ? aktiviteterRaw.map(mapAktivitet)
      : FALLBACK_AKTIVITETER.map((a) => ({
          _id: a._id,
          tittel: a.tittel,
          beskrivelse: a.beskrivelse,
          href: a.href,
          bildeUrl: a.figur,
          bildeAlt: a.tittel,
        }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="w-full" aria-labelledby="hero-heading">
        <div className="relative aspect-[5/3] w-full min-h-[200px] sm:aspect-[2.2/1] sm:min-h-[240px] md:aspect-[2.6/1] md:min-h-[280px]">
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 z-[1] bg-black/50"
            aria-hidden
          />
          <div className="absolute inset-0 z-[2] flex items-center justify-center px-5 sm:px-8 md:px-12">
            <h1
              id="hero-heading"
              className="max-w-3xl text-center font-display text-hero font-semibold tracking-tight text-white antialiased drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
            >
              {heroTittel}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[72rem] px-4 pb-[var(--space-5)] pt-[var(--space-4)] sm:px-6 md:px-8 md:pb-[var(--space-6)] md:pt-[var(--space-5)]">
        <section aria-labelledby="aktivitet-heading">
          <h2 id="aktivitet-heading" className="sr-only">
            Aktiviteter på gården
          </h2>
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-[var(--space-4)] sm:grid-cols-3 sm:gap-[var(--space-3)]">
            {aktivitetRader.map((rad, index) => (
              <li key={rad._id} className="border-b border-[var(--farm-border)] pb-[var(--space-3)] last:border-b-0 sm:border-b-0 sm:pb-0">
                <Link
                  href={rad.href}
                  className="aktivitet-kort group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
                >
                  <div className="aktivitet-kort__bilde relative aspect-[4/3] w-full overflow-hidden">
                    {rad.bildeUrl ? (
                      <Image
                        src={rad.bildeUrl}
                        alt={rad.bildeAlt}
                        fill
                        className="object-cover object-center"
                        priority={index < 3}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-cream-deep" aria-hidden />
                    )}
                  </div>
                  <div className="pt-[var(--space-2)] text-left">
                    <span className="aktivitet-kort__tittel text-card-title font-display font-semibold text-foreground">
                      {rad.tittel}
                    </span>
                    <span className="mt-1 block text-base font-normal leading-relaxed text-foreground/85">
                      {rad.beskrivelse}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="farm-panel mt-[var(--space-5)] overflow-hidden lg:grid lg:grid-cols-2 lg:items-stretch"
          aria-labelledby="historie-heading"
        >
          <div className="flex flex-col justify-center p-[var(--space-3)] sm:p-[var(--space-4)] lg:text-left">
            <h2
              id="historie-heading"
              className="font-display text-section font-semibold text-foreground"
            >
              {historieOverskrift}
            </h2>
            <div className="historie-tekst mt-[var(--space-2)] max-w-prose">
              <PortableText
                value={historieTekst}
                components={prosePortableComponents}
              />
            </div>
            <p className="mt-[var(--space-3)] text-base text-foreground/85">
              Les mer på{" "}
              <Link href="/historie" className="link-farm font-medium">
                historie-siden
              </Link>
              .
            </p>
          </div>
          <div className="relative min-h-[240px] w-full border-t border-[var(--farm-border)] sm:min-h-[260px] lg:min-h-0 lg:h-full lg:border-l lg:border-t-0">
            <Image
              src={historieBildeSrc}
              alt={historieBildeAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </section>

        <ProductSection />
      </div>
    </div>
  );
}

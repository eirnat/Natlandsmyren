import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ProductSection } from "./components/ProductSection";
import type { AktivitetDoc, LandingDoc } from "../src/sanity/lib/home-data";
import { getHomePageData } from "../src/sanity/lib/home-data";
import { urlFor } from "../src/sanity/lib/image";

/** ISR: forsiden hentes på nytt fra Sanity minst hvert 60. sekund. */
export const revalidate = 60;

const DEFAULT_HERO_TITTEL = "Velkommen til Natlandsmyren";
const DEFAULT_HERO_SRC = "/images/gardvinter.jpg";
const DEFAULT_HERO_ALT = "Natlandsmyren om vinteren";

const DEFAULT_HISTORIE_OVERSKRIFT = "Historien om Natlandsmyr";

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
    aksentfarge: "#D48420",
    href: "/birokt",
  },
  {
    _id: "local-honsehold",
    tittel: "Hønsehold",
    beskrivelse:
      "Ferske gårdsegg fra hønene på tunet – hver dag, rett fra huset. Frittgående høner som trives ute.",
    figur: "/images/høne.svg",
    aksentfarge: "#A64B2A",
    href: "/honsehold",
  },
  {
    _id: "local-sauehold",
    tittel: "Sauehold",
    beskrivelse:
      "Gammelnorsk spælsau – robuste sauer som kjenner myra og holder landskapet i form, beite for beite.",
    figur: "/images/sau.svg",
    aksentfarge: "#3E4A3E",
    href: "/sau",
  },
] as const;

const historiePortableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-base font-medium leading-relaxed text-foreground first:mt-8 sm:text-lg sm:leading-relaxed">
        {children}
      </p>
    ),
  },
};

function aktivitetHref(a: AktivitetDoc): string {
  const s = a.slug?.current?.trim();
  if (s) return `/${s}`;
  if (a.internLenke?.trim()) return a.internLenke.trim();
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

function ikonUrl(a: AktivitetDoc): string | null {
  if (!a.ikon?.asset?._ref) return null;
  try {
    return urlFor(a.ikon).width(128).height(128).fit("max").url();
  } catch {
    return null;
  }
}

export default async function Home() {
  const { landing, aktiviteter: aktiviteterRaw } = await getHomePageData();
  /** Maks tre kremfliser – samme rekkefølge som i Sanity (rekkefolge-felt). */
  const aktiviteter = aktiviteterRaw.slice(0, 3);

  const heroTittel = landing?.heroTittel?.trim() || DEFAULT_HERO_TITTEL;
  const heroSrc = heroImageUrl(landing);
  const heroAlt =
    landing?.heroBilde?.alt?.trim() || DEFAULT_HERO_ALT;
  const historieOverskrift =
    landing?.historieOverskrift?.trim() || DEFAULT_HISTORIE_OVERSKRIFT;
  const historieTekst =
    landing?.historieTekst && landing.historieTekst.length > 0
      ? landing.historieTekst
      : DEFAULT_HISTORIE_BLOKKER;

  type AktivitetRad =
    | {
        _id: string;
        tittel: string;
        beskrivelse: string;
        href: string;
        aksentfarge: string;
        sanityIkonUrl: string | null;
        ikonAlt: string;
        figur?: undefined;
      }
    | {
        _id: string;
        tittel: string;
        beskrivelse: string;
        href: string;
        aksentfarge: string;
        sanityIkonUrl: null;
        figur: string;
        ikonAlt: string;
      };

  const aktivitetRader: AktivitetRad[] =
    aktiviteter.length > 0
      ? aktiviteter.map((a) => ({
          _id: a._id,
          tittel: a.tittel,
          beskrivelse: a.beskrivelse,
          href: aktivitetHref(a),
          aksentfarge: a.aksentfarge?.trim() || "#D48420",
          sanityIkonUrl: ikonUrl(a),
          ikonAlt: a.ikon?.alt?.trim() || "",
        }))
      : FALLBACK_AKTIVITETER.map((x) => ({
          _id: x._id,
          tittel: x.tittel,
          beskrivelse: x.beskrivelse,
          href: x.href,
          aksentfarge: x.aksentfarge,
          sanityIkonUrl: null,
          figur: x.figur,
          ikonAlt: "",
        }));

  return (
    <div className="min-h-screen bg-[#9B7039] text-foreground">
      <section className="w-full" aria-labelledby="hero-heading">
        <div className="relative aspect-[5/3] w-full min-h-[220px] sm:aspect-[2.2/1] sm:min-h-[260px] md:aspect-[2.6/1] md:min-h-[300px] lg:min-h-[340px]">
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 z-[1] bg-black/60 sm:bg-black/58"
            aria-hidden
          />
          <div className="absolute inset-0 z-[2] flex items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16">
            <h1
              id="hero-heading"
              className="max-w-5xl text-center font-sans text-[clamp(1.875rem,5.5vw+0.5rem,3rem)] font-black leading-[1.08] tracking-tight text-white antialiased drop-shadow-[0_4px_32px_rgba(0,0,0,0.75)] sm:text-[clamp(2.125rem,5vw+0.75rem,3.5rem)] md:text-[clamp(2.5rem,4vw+1rem,4rem)] lg:text-6xl lg:leading-[1.06] xl:text-7xl"
            >
              {heroTittel}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 md:px-8 md:pb-28 md:pt-20 lg:pt-24">
        <section aria-labelledby="aktivitet-heading">
          <h2 id="aktivitet-heading" className="sr-only">
            Aktiviteter på gården
          </h2>
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-6 md:gap-8">
            {aktivitetRader.map((rad) => (
              <li key={rad._id}>
                <Link
                  href={rad.href}
                  className="group flex min-h-[18rem] flex-col items-center rounded-2xl border-2 border-moss bg-card px-5 py-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out hover:border-moss hover:bg-moss hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-moss sm:min-h-[19rem] sm:px-6 sm:py-9"
                  style={
                    {
                      "--flis-aksent": rad.aksentfarge,
                    } as CSSProperties
                  }
                >
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                    <span
                      className="absolute h-[3.25rem] w-[3.25rem] rounded-full opacity-25"
                      style={{ backgroundColor: "var(--flis-aksent)" }}
                      aria-hidden
                    />
                    {rad.sanityIkonUrl ? (
                      <Image
                        src={rad.sanityIkonUrl}
                        alt={rad.ikonAlt || ""}
                        width={64}
                        height={64}
                        className="relative z-[1] h-16 w-16 object-contain"
                        sizes="64px"
                      />
                    ) : rad.figur ? (
                      <Image
                        src={rad.figur}
                        alt=""
                        width={64}
                        height={64}
                        className="relative z-[1] h-16 w-16 object-contain"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <span className="mt-5 text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-white">
                    {rad.tittel}
                  </span>
                  <span className="mt-3 max-w-[22rem] text-sm font-medium leading-relaxed text-foreground transition-colors duration-300 group-hover:text-white sm:max-w-none">
                    {rad.beskrivelse}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="mt-16 overflow-hidden rounded-2xl border-2 border-moss bg-card shadow-[0_16px_48px_rgba(0,0,0,0.2)] sm:mt-20 md:mt-24 lg:grid lg:grid-cols-2 lg:items-stretch"
          aria-labelledby="historie-heading"
        >
          <div className="flex flex-col justify-center p-8 text-center sm:p-10 md:p-12 lg:p-14 lg:text-left">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-moss">
              Historie
            </p>
            <h2
              id="historie-heading"
              className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              {historieOverskrift}
            </h2>
            <div className="historie-tekst">
              <PortableText
                value={historieTekst}
                components={historiePortableComponents}
              />
            </div>
            <p className="mt-6 text-base font-medium leading-relaxed text-foreground sm:text-lg">
              Les mer på{" "}
              <Link
                href="/historie"
                className="font-bold text-moss underline decoration-moss decoration-4 underline-offset-[5px] transition hover:text-foreground hover:decoration-foreground"
              >
                historie-siden
              </Link>
              .
            </p>
          </div>
          <div className="relative min-h-[280px] w-full border-t-2 border-moss bg-cream-deep sm:min-h-[300px] md:min-h-[320px] lg:min-h-0 lg:h-full lg:border-l-2 lg:border-t-0">
            <Image
              src="/images/emblem.jpg"
              alt="Emblem for Natlandsmyren"
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

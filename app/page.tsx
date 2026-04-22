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
const DEFAULT_HERO_SRC = "/images/gardsommer.jpg";
const DEFAULT_HERO_ALT = "Natlandsmyren om sommeren";

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
    href: "/hoensehold",
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
  return "#";
}

function finnAktivitetForForside(
  aktiviteter: AktivitetDoc[],
  slugKandidater: readonly string[],
): AktivitetDoc | null {
  const kandidatSett = new Set(slugKandidater.map((s) => s.toLowerCase()));
  return (
    aktiviteter.find((a) => {
      const slug = a.slug?.current?.trim().toLowerCase();
      return slug ? kandidatSett.has(slug) : false;
    }) ?? null
  );
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
    return urlFor(a.ikon).quality(90).auto("format").url();
  } catch {
    return null;
  }
}

export default async function Home() {
  const { landing, aktiviteter: aktiviteterRaw } = await getHomePageData();
  const biroktData = finnAktivitetForForside(aktiviteterRaw, ["birokt"]);
  const honseholdData = finnAktivitetForForside(aktiviteterRaw, [
    "hoensehold",
    "honsehold",
  ]);
  const saueholdData = finnAktivitetForForside(aktiviteterRaw, ["sau"]);

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

  const aktivitetRader: AktivitetRad[] = [
    biroktData
      ? {
          _id: biroktData._id,
          tittel: biroktData.tittel,
          beskrivelse: biroktData.beskrivelse,
          href: aktivitetHref(biroktData),
          aksentfarge: biroktData.aksentfarge?.trim() || "#D48420",
          sanityIkonUrl: ikonUrl(biroktData),
          ikonAlt: biroktData.ikon?.alt?.trim() || "",
        }
      : {
          _id: FALLBACK_AKTIVITETER[0]._id,
          tittel: FALLBACK_AKTIVITETER[0].tittel,
          beskrivelse: FALLBACK_AKTIVITETER[0].beskrivelse,
          href: FALLBACK_AKTIVITETER[0].href,
          aksentfarge: FALLBACK_AKTIVITETER[0].aksentfarge,
          sanityIkonUrl: null,
          figur: FALLBACK_AKTIVITETER[0].figur,
          ikonAlt: "",
        },
    honseholdData
      ? {
          _id: honseholdData._id,
          tittel: honseholdData.tittel,
          beskrivelse: honseholdData.beskrivelse,
          href: aktivitetHref(honseholdData),
          aksentfarge: honseholdData.aksentfarge?.trim() || "#A64B2A",
          sanityIkonUrl: ikonUrl(honseholdData),
          ikonAlt: honseholdData.ikon?.alt?.trim() || "",
        }
      : {
          _id: FALLBACK_AKTIVITETER[1]._id,
          tittel: FALLBACK_AKTIVITETER[1].tittel,
          beskrivelse: FALLBACK_AKTIVITETER[1].beskrivelse,
          href: FALLBACK_AKTIVITETER[1].href,
          aksentfarge: FALLBACK_AKTIVITETER[1].aksentfarge,
          sanityIkonUrl: null,
          figur: FALLBACK_AKTIVITETER[1].figur,
          ikonAlt: "",
        },
    saueholdData
      ? {
          _id: saueholdData._id,
          tittel: saueholdData.tittel,
          beskrivelse: saueholdData.beskrivelse,
          href: aktivitetHref(saueholdData),
          aksentfarge: saueholdData.aksentfarge?.trim() || "#3E4A3E",
          sanityIkonUrl: ikonUrl(saueholdData),
          ikonAlt: saueholdData.ikon?.alt?.trim() || "",
        }
      : {
          _id: FALLBACK_AKTIVITETER[2]._id,
          tittel: FALLBACK_AKTIVITETER[2].tittel,
          beskrivelse: FALLBACK_AKTIVITETER[2].beskrivelse,
          href: FALLBACK_AKTIVITETER[2].href,
          aksentfarge: FALLBACK_AKTIVITETER[2].aksentfarge,
          sanityIkonUrl: null,
          figur: FALLBACK_AKTIVITETER[2].figur,
          ikonAlt: "",
        },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              className="max-w-5xl text-center font-display text-[clamp(2.25rem,6vw+0.8rem,3.9rem)] font-black leading-[1.02] tracking-tight text-white antialiased drop-shadow-[0_7px_42px_rgba(0,0,0,0.9)] sm:text-[clamp(2.6rem,5.7vw+1rem,4.4rem)] md:text-[clamp(3.2rem,4.6vw+1.2rem,5.2rem)] lg:text-8xl lg:leading-[1.01]"
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
            {aktivitetRader.map((rad, index) => {
              const bakgrunnBilde = rad.sanityIkonUrl ?? rad.figur ?? null;
              return (
                <li key={rad._id}>
                  <Link
                    href={rad.href}
                    className="group relative flex min-h-[18rem] overflow-hidden rounded-3xl border-2 border-black/5 bg-card text-center shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:shadow-[8px_8px_0pt_0pt_rgba(0,0,0,0.14)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-moss sm:min-h-[19rem]"
                    style={
                      {
                        "--flis-aksent": rad.aksentfarge,
                      } as CSSProperties
                    }
                  >
                    <div className="absolute inset-0" aria-hidden>
                      {bakgrunnBilde ? (
                        <Image
                          src={bakgrunnBilde}
                          alt=""
                          fill
                          className="object-cover object-center"
                          priority={index < 3}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="h-full w-full bg-[var(--flis-aksent)]/30" />
                      )}
                    </div>
                    <div
                      className="absolute inset-0 z-[1] bg-[#FFFBF2]/88 transition-all duration-500 ease-in-out group-hover:opacity-0"
                      aria-hidden
                    />
                    <div className="relative z-[2] flex w-full flex-col items-center justify-center px-6 py-10 sm:px-8 sm:py-11">
                      <span
                        className="text-3xl font-bold tracking-tight text-[#2D3A27] sm:text-4xl"
                        style={{
                          textShadow:
                            "0 0 10px rgba(255,255,255,0.9), 0 0 5px rgba(255,255,255,0.9)",
                        }}
                      >
                        {rad.tittel}
                      </span>
                      <span
                        className="mt-3 text-base font-bold leading-relaxed text-[#2D3A27] sm:text-lg"
                        style={{
                          textShadow:
                            "0 0 10px rgba(255,255,255,0.9), 0 0 5px rgba(255,255,255,0.9)",
                        }}
                      >
                        {rad.beskrivelse}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          className="mt-16 overflow-hidden rounded-3xl border-2 border-black/10 bg-card shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.1)] sm:mt-20 md:mt-24 lg:grid lg:grid-cols-2 lg:items-stretch"
          aria-labelledby="historie-heading"
        >
          <div className="flex flex-col justify-center p-8 text-center sm:p-10 md:p-12 lg:p-14 lg:text-left">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-moss">
              Historie
            </p>
            <h2
              id="historie-heading"
              className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
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
          <div className="relative min-h-[280px] w-full border-t-2 border-black/10 bg-cream-deep sm:min-h-[300px] md:min-h-[320px] lg:min-h-0 lg:h-full lg:border-l-2 lg:border-t-0">
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

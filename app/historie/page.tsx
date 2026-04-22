import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { GARD_NAVN } from "../lib/gard";
import {
  type HistorieFortellingBlokk,
  getHistorieData,
  type HistorieTidslinjePunkt,
} from "../../src/sanity/lib/home-data";
import { urlFor } from "../../src/sanity/lib/image";
import { FadeInOnScroll } from "../components/FadeInOnScroll";

export const metadata: Metadata = {
  title: `Historie – ${GARD_NAVN}`,
  description: `Historien til ${GARD_NAVN}.`,
};

const FALLBACK_TITTEL = "Historien om Natlandsmyren";
const FALLBACK_INTRO =
  "Historien om Natlandsmyren er en fortelling om jord, arbeid og familier som har satt spor over generasjoner.";

const FALLBACK_TIDSLINJE: HistorieTidslinjePunkt[] = [
  {
    _key: "fallback-1750",
    aarstall: "ca. 1750",
    hendelseTittel: "Husmannsplassen blir til",
    beskrivelse:
      "Gården Natlandsmyr var opprinnelig en husmannsplass under gården Nedre Natland, og ble opprettet i ca. 1750.",
  },
  {
    _key: "fallback-1751",
    aarstall: "1751",
    hendelseTittel: "Plassen omtales som Dalen",
    beskrivelse:
      "I 1751 ble plassen kalt Dalen. Navnet Myren har også vært benyttet. Det fortelles at husmannsplassene i området ble anlagt for å tydeliggjøre eiendomsgrensen mot Sandalen.",
  },
  {
    _key: "fallback-1842",
    aarstall: "1842",
    hendelseTittel: "Familiegården tar form",
    beskrivelse:
      "Natlandsmyr ble utskilt som eget bruk i 1841, og året etter kjøpt av Ole Monsen Skåldal, tipp-tipp-oldefar til dagens eier.",
  },
];

const FALLBACK_FORTELLING: HistorieFortellingBlokk[] = [
  {
    _key: "fallback-story-1",
    layout: "left",
    bilde: {
      alt: "Natlandsmyren i sommerlys",
      caption: "Tunet i kveldssol",
    },
    tekst: [
      {
        _type: "block",
        _key: "f1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "f1a",
            text: "På Natlandsmyren følger hverdagen årstidene. Arbeidet på gården går i rytme med naturen, og små hendelser blir til minner som bærer historien videre.",
            marks: [],
          },
        ],
      },
    ] as PortableTextBlock[],
  },
  {
    _key: "fallback-story-2",
    layout: "right",
    bilde: {
      alt: "Historisk utsnitt fra Natlandsmyren",
      caption: "Spor av arbeid og tradisjon",
    },
    tekst: [
      {
        _type: "block",
        _key: "f2",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "f2a",
            text: "Menneskene som har levd her har formet landskapet med omtanke. Historien handler ikke bare om årstall, men om valg, fellesskap og tilhørighet.",
            marks: [],
          },
        ],
      },
    ] as PortableTextBlock[],
  },
];

function timelineImageUrl(
  bilde: HistorieTidslinjePunkt["bilde"],
): string | null {
  if (!bilde?.asset?._ref) return null;
  try {
    return urlFor(bilde).width(1200).quality(90).auto("format").url();
  } catch {
    return null;
  }
}

function fortellingImageUrl(
  bilde: HistorieFortellingBlokk["bilde"],
): string | null {
  if (!bilde?.asset?._ref) return null;
  try {
    return urlFor(bilde).width(1800).quality(90).auto("format").url();
  } catch {
    return null;
  }
}

function blocksToPlainText(blocks?: PortableTextBlock[] | null): string {
  if (!blocks || blocks.length === 0) return "";
  const block = blocks.find((b) => b?._type === "block");
  if (!block || !Array.isArray(block.children)) return "";
  return block.children
    .map((child) => (typeof child.text === "string" ? child.text : ""))
    .join("")
    .trim();
}

const fortellingPortableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 font-display text-lg leading-relaxed text-[#2D3A27] first:mt-0 sm:text-xl">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-black text-[#8B4513]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-[#2D3A27]">{children}</em>,
  },
};

export default async function HistoriePage() {
  const historie = await getHistorieData();
  const tittel = historie?.tittel?.trim() || FALLBACK_TITTEL;
  const fortellingRaw =
    historie?.fortelling?.filter(
      (blokk) =>
        !!blokk &&
        !!blokk.layout &&
        !!blokk.bilde &&
        !!blokk.tekst &&
        blokk.tekst.length > 0,
    ) ?? [];
  const fortelling =
    fortellingRaw.length > 0 ? fortellingRaw : FALLBACK_FORTELLING;
  const tidslinjeRaw =
    historie?.tidslinje?.filter(
      (punkt) =>
        !!punkt &&
        !!punkt.aarstall?.trim() &&
        !!punkt.hendelseTittel?.trim() &&
        !!punkt.beskrivelse?.trim(),
    ) ?? [];
  const tidslinje = tidslinjeRaw.length > 0 ? tidslinjeRaw : FALLBACK_TIDSLINJE;
  const intro =
    blocksToPlainText(fortelling[0]?.tekst) ||
    tidslinje[0]?.beskrivelse?.trim() ||
    FALLBACK_INTRO;

  const heroUrl = (() => {
    if (!historie?.heroBilde?.asset?._ref) return "/images/gardsommer.jpg";
    try {
      return urlFor(historie.heroBilde).width(2200).quality(92).auto("format").url();
    } catch {
      return "/images/gardsommer.jpg";
    }
  })();
  const heroAlt = historie?.heroBilde?.alt?.trim() || `${tittel} på ${GARD_NAVN}`;

  return (
    <div className="bg-[#F4F1EA]">
      <section className="relative w-full border-b border-black/10">
        <div className="absolute left-4 top-4 z-[3] sm:left-6 sm:top-6 md:left-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFBF2]/85 px-4 py-2 text-sm font-semibold text-[#2D3A27] shadow-[0_2px_12px_rgba(0,0,0,0.14)] backdrop-blur-sm transition hover:bg-[#FFFBF2]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Hjem
          </Link>
        </div>
        <div className="relative mx-auto max-w-6xl p-4 pt-20 sm:px-6 sm:pt-24 md:px-8 md:pt-28">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border-2 border-black/10 bg-[#e6decf] shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.1)]">
            <Image
              src={heroUrl}
              alt={heroAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-black/28" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
              <h1 className="max-w-3xl font-display text-4xl font-black leading-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] sm:text-5xl md:text-6xl">
                {tittel}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14 md:px-8">
        <article className="rounded-3xl border-2 border-black/10 bg-[#F4F1EA] px-6 py-7 shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.1)] sm:px-8 sm:py-9 md:px-10">
          <p className="font-display text-lg leading-relaxed text-[#2D3A27] sm:text-xl">
            <span className="float-left mr-3 mt-0.5 font-display text-5xl font-semibold leading-none text-[#2D3A27] sm:text-6xl">
              {intro.charAt(0) || "H"}
            </span>
            {intro.slice(1) ||
              "er forteller vi historien om mennesker, dyr og landskap på Natlandsmyren."}
          </p>
        </article>

        <div className="mt-14 space-y-10 sm:space-y-14">
          {fortelling.map((blokk, index) => {
            const layout = blokk.layout || "left";
            const bildeUrl = fortellingImageUrl(blokk.bilde);
            const bildeAlt = blokk.bilde?.alt?.trim() || `${tittel} – bilde`;
            const caption = blokk.bilde?.caption?.trim();
            const tekst = blokk.tekst ?? [];

            const imagePanel = (
              <div className="relative overflow-hidden rounded-3xl border-2 border-white bg-[#ede3cf] p-2 shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={bildeUrl || "/images/gardsommer.jpg"}
                    alt={bildeAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {caption ? (
                  <p className="px-2 pb-1 pt-3 text-sm font-medium text-[#6d5b44]">
                    {caption}
                  </p>
                ) : null}
              </div>
            );

            const textPanel = (
              <div className="rounded-3xl border-2 border-black/10 bg-[#FFFBF2] px-6 py-6 shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.1)] sm:px-7 sm:py-7">
                <PortableText
                  value={tekst}
                  components={fortellingPortableComponents}
                />
              </div>
            );

            const content =
              layout === "full" ? (
                <div className="space-y-5">
                  {imagePanel}
                  {textPanel}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                  <div className={layout === "right" ? "md:order-2" : ""}>
                    {imagePanel}
                  </div>
                  <div className={layout === "right" ? "md:order-1" : ""}>
                    {textPanel}
                  </div>
                </div>
              );

            return (
              <FadeInOnScroll
                key={blokk._key ?? `fortelling-${index}`}
                delayMs={Math.min(index * 80, 320)}
              >
                {content}
              </FadeInOnScroll>
            );
          })}
        </div>

        <div className="my-14 flex items-center gap-4" aria-hidden>
          <span className="h-px flex-1 bg-[#4B5B30]/45" />
          <span className="inline-block h-3 w-3 rounded-full bg-[#4B5B30]/65" />
          <span className="h-px flex-1 bg-[#4B5B30]/45" />
        </div>

        <div className="relative mt-12 pl-10 sm:pl-14">
          <h2 className="mb-6 font-display text-3xl font-black text-[#8B4513] sm:text-4xl">
            Viktige milepæler
          </h2>
          <div
            className="absolute bottom-0 left-[0.9rem] top-0 w-px bg-[#8B4513]/35 sm:left-[1.65rem]"
            aria-hidden
          />
          <div className="space-y-10 sm:space-y-12">
            {tidslinje.map((punkt) => {
              const bildeUrl = timelineImageUrl(punkt.bilde);
              const aarstall = punkt.aarstall?.trim() || "Ukjent år";
              const hendelseTittel = punkt.hendelseTittel?.trim() || "Hendelse";
              const beskrivelse = punkt.beskrivelse?.trim() || "";

              return (
                <FadeInOnScroll
                  key={punkt._key ?? `${aarstall}-${hendelseTittel}`}
                  className="relative"
                >
                  <span
                    className="absolute left-[-2.1rem] top-2 h-4 w-4 rounded-full border-2 border-[#8B4513]/70 bg-[#F4F1EA] sm:left-[-2.73rem]"
                    aria-hidden
                  />
                  <div className="rounded-3xl border-2 border-black/10 bg-[#FFFBF2] p-5 shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.1)] sm:p-6">
                    <p className="font-sans text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#8B4513] sm:text-xs">
                      {aarstall}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-black leading-tight text-[#8B4513] sm:text-2xl">
                      {hendelseTittel}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-[#2D3A27] sm:text-base">
                      {beskrivelse}
                    </p>
                    {bildeUrl ? (
                      <div className="relative mt-6 overflow-hidden rounded-3xl border-2 border-white bg-[#ede3cf] p-2 shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                          <Image
                            src={bildeUrl}
                            alt={punkt.bilde?.alt?.trim() || hendelseTittel}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 720px"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

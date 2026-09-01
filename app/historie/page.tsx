import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { GARD_NAVN } from "../lib/gard";
import {
  getHistorieData,
  type HistorieTidslinjePunkt,
} from "../../src/sanity/lib/home-data";
import { urlFor } from "../../src/sanity/lib/image";
import { historieProsePortableComponents } from "../components/prosePortableText";

export const metadata: Metadata = {
  title: `Historie – ${GARD_NAVN}`,
  description: `Historien til ${GARD_NAVN}.`,
};

const FALLBACK_TITTEL = "Historien om Natlandsmyren";

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

const FALLBACK_TEKST: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "fallback-story-1",
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
  {
    _type: "block",
    _key: "fallback-story-2",
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

export default async function HistoriePage() {
  const historie = await getHistorieData();
  const tittel = historie?.tittel?.trim() || FALLBACK_TITTEL;
  const tekst =
    historie?.tekst && historie.tekst.length > 0
      ? historie.tekst
      : FALLBACK_TEKST;
  const tidslinjeRaw =
    historie?.tidslinje?.filter(
      (punkt) =>
        !!punkt &&
        !!punkt.aarstall?.trim() &&
        !!punkt.hendelseTittel?.trim() &&
        !!punkt.beskrivelse?.trim(),
    ) ?? [];
  const tidslinje = tidslinjeRaw.length > 0 ? tidslinjeRaw : FALLBACK_TIDSLINJE;

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
    <div className="bg-background">
      <section className="relative w-full border-b border-[var(--farm-border)]">
        <div className="absolute left-4 top-4 z-[3] sm:left-6 sm:top-6 md:left-8">
          <Link href="/" className="btn-secondary px-3 py-1.5 text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Hjem
          </Link>
        </div>
        <div className="relative aspect-[16/8] w-full min-h-[220px] sm:min-h-[280px]">
          <Image
            src={heroUrl}
            alt={heroAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8">
            <h1 className="max-w-2xl font-display text-hero font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              {tittel}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-[var(--space-4)] sm:px-6 md:px-8">
        <article className="farm-panel prose-farm px-6 py-7 sm:px-8 sm:py-8">
          <PortableText
            value={tekst}
            components={historieProsePortableComponents}
          />
        </article>

        <div className="my-[var(--space-4)] flex items-center gap-4" aria-hidden>
          <span className="h-px flex-1 bg-[var(--farm-border)]" />
          <span className="inline-block h-2 w-2 rounded-full bg-moss/50" />
          <span className="h-px flex-1 bg-[var(--farm-border)]" />
        </div>

        <div className="relative pl-8 sm:pl-10">
          <h2 className="mb-5 font-display text-section font-semibold text-[var(--farm-history-accent)]">
            Viktige milepæler
          </h2>
          <div
            className="absolute bottom-0 left-[0.55rem] top-0 w-px bg-[var(--farm-history-accent)]/25 sm:left-[0.85rem]"
            aria-hidden
          />
          <div className="space-y-6 sm:space-y-8">
            {tidslinje.map((punkt) => {
              const bildeUrl = timelineImageUrl(punkt.bilde);
              const aarstall = punkt.aarstall?.trim() || "Ukjent år";
              const hendelseTittel = punkt.hendelseTittel?.trim() || "Hendelse";
              const beskrivelse = punkt.beskrivelse?.trim() || "";

              return (
                <div
                  key={punkt._key ?? `${aarstall}-${hendelseTittel}`}
                  className="relative"
                >
                  <span
                    className="absolute left-[-1.65rem] top-2 h-3 w-3 rounded-full border-2 border-[var(--farm-history-accent)]/60 bg-background sm:left-[-2rem]"
                    aria-hidden
                  />
                  <div className="flex flex-col gap-4 border-b border-[var(--farm-border)] pb-6 last:border-b-0 md:flex-row md:items-start md:gap-6 lg:gap-8">
                    <div className="min-w-0 flex-1">
                      <p className="text-small font-medium text-[var(--farm-history-accent)]">
                        {aarstall}
                      </p>
                      <h3 className="mt-1 font-display text-card-title font-semibold text-[var(--farm-history-accent)]">
                        {hendelseTittel}
                      </h3>
                      <p className="mt-2 max-w-prose text-base leading-relaxed text-foreground/85">
                        {beskrivelse}
                      </p>
                    </div>
                    {bildeUrl ? (
                      <div className="farm-img relative w-full shrink-0 overflow-hidden sm:max-w-xs md:w-44 md:max-w-none lg:w-52">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={bildeUrl}
                            alt={punkt.bilde?.alt?.trim() || hendelseTittel}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 767px) 100vw, 208px"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";

import type { ProduktDoc } from "../../src/sanity/lib/home-data";
import { urlFor } from "../../src/sanity/lib/image";

function produktBildeUrl(bilde: ProduktDoc["bilde"]): string | null {
  if (!bilde?.asset?._ref) return null;
  try {
    return urlFor(bilde).width(900).height(680).fit("crop").quality(88).url();
  } catch {
    return null;
  }
}

const prisFormatter = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
  maximumFractionDigits: 0,
});

type ProduktKortProps = {
  produkt: ProduktDoc;
  /** Ytre wrapper, f.eks. margin i Portable Text */
  className?: string;
  /** Bildestørrelse i tekst (smalere kolonne) */
  sizes?: string;
};

/**
 * Kort for gårdsutsalg – samme uttrykk på forsiden og inne i aktivitetstekst.
 */
export function ProduktKort({
  produkt,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: ProduktKortProps) {
  const p = produkt;
  const imgSrc = produktBildeUrl(p.bilde);
  const alt = p.bilde?.alt?.trim() || p.tittel;
  const utsolgt = (p.lagerstatus ?? 0) <= 0;
  const pris = p.pris ?? 0;
  const beskrivelse = p.beskrivelse ?? "";
  const lager = p.lagerstatus ?? 0;

  return (
    <div className={className}>
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-black/10 bg-card shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[8px_8px_0pt_0pt_rgba(0,0,0,0.14)]">
        <div className="relative aspect-[4/3] w-full bg-cream-deep">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={alt}
              fill
              className="object-cover object-center"
              sizes={sizes}
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center sm:px-6 sm:pb-7 sm:pt-6">
          <h3 className="font-display text-xl font-bold tracking-tight text-moss sm:text-2xl">
            {p.tittel}
          </h3>
          {beskrivelse ? (
            <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-foreground sm:text-base">
              {beskrivelse}
            </p>
          ) : (
            <div className="flex-1" />
          )}
          <p className="mt-4 font-sans text-2xl font-black tabular-nums text-foreground sm:text-3xl">
            {prisFormatter.format(pris)}
          </p>
          <p
            className={
              utsolgt
                ? "mt-2 text-xs font-semibold uppercase tracking-wide text-moss/60"
                : "mt-2 text-xs font-semibold text-moss/80"
            }
          >
            {utsolgt ? "Utsolgt" : `${lager} på lager`}
          </p>
          <button
            type="button"
            className={
              utsolgt
                ? "mt-5 w-full cursor-not-allowed rounded-3xl border-2 border-moss/25 bg-moss/10 px-4 py-3 text-center text-sm font-bold text-moss/50"
                : "mt-5 w-full rounded-3xl border-2 border-[#c78912] bg-[#E9A825] px-4 py-3 text-center text-sm font-bold text-[#302208] shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.16)] transition hover:border-[#a86f0e] hover:bg-[#C88416] hover:text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
            }
            disabled={utsolgt}
            aria-disabled={utsolgt}
          >
            Kjøp med Vipps
          </button>
        </div>
      </article>
    </div>
  );
}

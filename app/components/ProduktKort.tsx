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
  className?: string;
  sizes?: string;
};

export function ProduktKort({
  produkt,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: ProduktKortProps) {
  const p = produkt;
  const imgSrc = produktBildeUrl(p.bilde);
  const alt = p.bilde?.alt?.trim() || p.tittel;
  const utsolgt = p.lagerstatus === 0;
  const pris = p.pris ?? 0;
  const beskrivelse = p.beskrivelse ?? "";
  const lager = p.lagerstatus;

  return (
    <div className={className}>
      <article className="farm-card flex h-full flex-col overflow-hidden">
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
        <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center">
          <h3 className="font-display text-card-title font-semibold text-foreground">
            {p.tittel}
          </h3>
          {beskrivelse ? (
            <p className="mt-2 flex-1 text-base leading-relaxed text-foreground/85">
              {beskrivelse}
            </p>
          ) : (
            <div className="flex-1" />
          )}
          <p className="mt-3 font-sans text-2xl font-semibold tabular-nums text-foreground">
            {prisFormatter.format(pris)}
          </p>
          <p
            className={
              utsolgt
                ? "mt-1 text-small font-medium text-moss/60"
                : "mt-1 text-small font-medium text-moss/80"
            }
          >
            {utsolgt
              ? "Utsolgt"
              : typeof lager === "number" && lager > 0
                ? `${lager} på lager`
                : "På lager"}
          </p>
          <button
            type="button"
            className={`btn-primary mt-4 w-full px-4 py-2.5 text-sm ${
              utsolgt ? "cursor-not-allowed opacity-50" : ""
            }`}
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

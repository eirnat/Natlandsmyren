import Image from "next/image";

import type { ProduktDoc } from "../../src/sanity/lib/home-data";
import { getGardsutsalgProdukter } from "../../src/sanity/lib/home-data";
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

export async function ProductSection() {
  const produkter = await getGardsutsalgProdukter();
  if (produkter.length === 0) return null;

  return (
    <section
      className="mt-16 sm:mt-20 md:mt-24"
      aria-labelledby="gardsutsalg-heading"
    >
      <h2
        id="gardsutsalg-heading"
        className="mb-10 text-center font-sans text-3xl font-black leading-tight tracking-tight text-white antialiased drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)] sm:mb-12 sm:text-4xl md:text-5xl"
      >
        Fra Gårdsutsalget
      </h2>
      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
        {produkter.map((p) => {
          const imgSrc = produktBildeUrl(p.bilde);
          const alt = p.bilde?.alt?.trim() || p.tittel;
          const utsolgt = p.lagerstatus <= 0;

          return (
            <li key={p._id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-moss bg-[#FAF8F2] shadow-[0_12px_40px_rgba(0,0,0,0.22)] transition-shadow duration-300 hover:shadow-[0_18px_48px_rgba(0,0,0,0.3)]">
                <div className="relative aspect-[4/3] w-full bg-cream-deep">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center sm:px-6 sm:pb-7 sm:pt-6">
                  <h3 className="font-display text-xl font-bold tracking-tight text-moss sm:text-2xl">
                    {p.tittel}
                  </h3>
                  <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-foreground sm:text-base">
                    {p.beskrivelse}
                  </p>
                  <p className="mt-4 font-sans text-2xl font-black tabular-nums text-foreground sm:text-3xl">
                    {prisFormatter.format(p.pris)}
                  </p>
                  <p
                    className={
                      utsolgt
                        ? "mt-2 text-xs font-semibold uppercase tracking-wide text-moss/60"
                        : "mt-2 text-xs font-semibold text-moss/80"
                    }
                  >
                    {utsolgt ? "Utsolgt" : `${p.lagerstatus} på lager`}
                  </p>
                  <button
                    type="button"
                    className={
                      utsolgt
                        ? "mt-5 w-full cursor-not-allowed rounded-xl border-2 border-moss/25 bg-moss/10 px-4 py-3 text-center text-sm font-bold text-moss/50"
                        : "mt-5 w-full rounded-xl border-2 border-[#c45c2a] bg-[#E85D2D] px-4 py-3 text-center text-sm font-bold text-white shadow-[0_6px_20px_rgba(232,93,45,0.35)] transition hover:border-[#a34a22] hover:bg-[#d45228] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
                    }
                    disabled={utsolgt}
                    aria-disabled={utsolgt}
                  >
                    Kjøp med Vipps
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

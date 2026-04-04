import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GARD_NAVN } from "../lib/gard";

export const metadata: Metadata = {
  title: `Historie – ${GARD_NAVN}`,
  description: `Historien til ${GARD_NAVN}.`,
};

export default function HistoriePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12 lg:py-14">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-sage-dark transition hover:text-ink md:mb-8"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Hjem
      </Link>

      <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-sage-soft/50 bg-cream-muted/30 shadow-sm md:min-h-[min(70vh,520px)] md:flex-row md:rounded-[1.35rem]">
        <div className="relative aspect-[4/5] w-full shrink-0 border-b border-sage-soft/40 bg-cream-muted/50 md:w-[42%] md:border-b-0 md:border-r md:aspect-auto md:min-h-full">
          <Image
            src="/images/emblem.jpg"
            alt="Emblem for Natlandsmyren"
            fill
            className="object-contain p-6 md:p-10 lg:p-12"
            sizes="(max-width: 768px) 100vw, 42vw"
            priority
          />
        </div>
        <article className="flex flex-1 flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl lg:text-4xl">
            Historie
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base md:leading-relaxed">
            Her kan du fortelle hvordan {GARD_NAVN} ble til – familie,
            bygninger og årstall. Korte avsnitt gjør teksten lett å lese.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base md:leading-relaxed">
            Bytt ut denne teksten med egne notater. Bildet til venstre er det
            samme emblemet som på forsiden; du kan senere bytte til et annet
            motiv om du ønsker.
          </p>
        </article>
      </div>
    </div>
  );
}

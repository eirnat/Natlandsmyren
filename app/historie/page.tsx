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
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cream/90 transition hover:text-cream md:mb-8"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Hjem
      </Link>

      <div className="overflow-hidden rounded-2xl border-2 border-moss bg-card shadow-[0_16px_48px_rgba(0,0,0,0.2)] md:min-h-[min(70vh,520px)] md:grid md:grid-cols-2 md:items-stretch">
        <article className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-moss">
            Historie
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            Historie
          </h1>
          <p className="mt-4 text-sm font-medium leading-relaxed text-foreground md:text-base md:leading-relaxed">
            Her kan du fortelle hvordan {GARD_NAVN} ble til – familie,
            bygninger og årstall. Korte avsnitt gjør teksten lett å lese.
          </p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-foreground md:text-base md:leading-relaxed">
            Bytt ut denne teksten med egne notater. Bildet til høyre er det
            samme emblemet som på forsiden; du kan senere bytte til et annet
            motiv om du ønsker.
          </p>
        </article>
        <div className="relative min-h-[240px] w-full border-t-2 border-moss bg-cream-deep md:min-h-0 md:h-full md:border-l-2 md:border-t-0">
          <Image
            src="/images/emblem.jpg"
            alt="Emblem for Natlandsmyren"
            fill
            className="object-cover object-center"
            sizes="(max-width: 767px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}

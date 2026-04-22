import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GARD_NAVN } from "../lib/gard";

export const metadata: Metadata = {
  title: `Historie – ${GARD_NAVN}`,
  description: `Historien til ${GARD_NAVN}.`,
};

function HistorieDivider() {
  return (
    <div className="my-6 flex justify-center" aria-hidden>
      <svg
        viewBox="0 0 320 26"
        className="h-5 w-56 text-[#8B4513]/70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 13H128C136 13 141 8 148 8C155 8 160 13 160 13C160 13 165 18 172 18C179 18 184 13 192 13H312"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="160" cy="13" r="4.25" fill="currentColor" />
      </svg>
    </div>
  );
}

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

      <div className="overflow-hidden rounded-3xl border-2 border-black/10 bg-card shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.1)] md:min-h-[min(70vh,520px)] md:grid md:grid-cols-2 md:items-stretch">
        <article className="flex flex-col justify-center bg-[#F4F1EA] px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#8B4513]">
            Historie
          </p>
          <h1 className="mt-3 font-display text-3xl font-black text-[#8B4513] md:text-4xl lg:text-5xl">
            Historie
          </h1>
          <p className="mt-4 text-sm font-medium leading-relaxed text-foreground md:text-base md:leading-relaxed">
            <span className="float-left mr-2 mt-1 font-display text-5xl font-black leading-[0.82] text-[#8B4513] md:text-6xl">
              H
            </span>
            er kan du fortelle hvordan {GARD_NAVN} ble til – familie, bygninger
            og årstall. Korte avsnitt gjør teksten lett å lese.
          </p>
          <HistorieDivider />
          <p className="mt-4 text-sm font-medium leading-relaxed text-foreground md:text-base md:leading-relaxed">
            Bytt ut denne teksten med egne notater. Bildet til høyre er det
            samme emblemet som på forsiden; du kan senere bytte til et annet
            motiv om du ønsker.
          </p>
        </article>
        <div className="relative min-h-[240px] w-full border-t-2 border-black/10 bg-cream-deep p-3 md:min-h-0 md:h-full md:border-l-2 md:border-t-0 md:p-4">
          <Image
            src="/images/emblem.jpg"
            alt="Emblem for Natlandsmyren"
            fill
            className="rounded-3xl border border-white/80 object-cover object-center shadow-[0_0_0_1px_rgba(255,255,255,0.55)]"
            sizes="(max-width: 767px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}

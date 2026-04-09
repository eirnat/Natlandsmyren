import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GARD_NAVN } from "../lib/gard";

export const metadata: Metadata = {
  title: `Sauehold – ${GARD_NAVN}`,
  description: `Sauehold på ${GARD_NAVN}.`,
};

export default function SaueholdPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-5 md:px-6 md:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cream/90 transition hover:text-cream md:mb-8"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Hjem
      </Link>
      <article className="farm-panel p-6 sm:p-8 md:p-10">
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Sauehold
        </h1>
        <p className="mt-4 text-sm font-medium leading-relaxed text-foreground sm:text-base">
          Her kan du skrive om sau på beite og det som hører til.
        </p>
      </article>
    </div>
  );
}

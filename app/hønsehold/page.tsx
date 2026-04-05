import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GARD_NAVN } from "../lib/gard";

export const metadata: Metadata = {
  title: `Hønsehold – ${GARD_NAVN}`,
  description: `Hønsehold på ${GARD_NAVN}.`,
};

export default function HonseholdPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-foreground sm:px-5 md:px-6 md:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-moss-muted transition hover:text-moss md:mb-8"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Hjem
      </Link>
      <article className="rounded-2xl border border-moss/12 bg-card p-6 shadow-sm sm:p-8 md:p-10">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-moss sm:text-3xl md:text-4xl">
          Hønsehold
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
          Her kan du skrive om hønene, hagen og egg til huset.
        </p>
      </article>
    </div>
  );
}

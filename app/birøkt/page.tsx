import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GARD_NAVN } from "../lib/gard";

export const metadata: Metadata = {
  title: `Birøkt – ${GARD_NAVN}`,
  description: `Birøkt på ${GARD_NAVN}.`,
};

export default function BiroktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-5 md:px-6 md:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 link-farm text-sm font-medium md:mb-8"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Hjem
      </Link>
      <article className="farm-panel p-6 sm:p-8 md:p-10">
        <h1 className="font-display text-section font-semibold text-foreground sm:text-hero">
          Birøkt
        </h1>
        <p className="mt-4 text-base font-medium leading-relaxed text-foreground sm:text-lg">
          Her kan du skrive om bikuber, honning og sesongen på gården.
        </p>
      </article>
    </div>
  );
}

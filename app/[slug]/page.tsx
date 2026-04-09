import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import type { CSSProperties } from "react";
import type { TypedObject } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

import { aktivitetStoryPortableComponents } from "../components/aktivitetStoryPortableText";
import { GARD_NAVN } from "../lib/gard";
import {
  aktivitetBySlugQuery,
  aktivitetSlugsQuery,
} from "../../src/sanity/queries";
import { sanityClient } from "../../src/sanity/lib/client";
import { urlFor } from "../../src/sanity/lib/image";

export const revalidate = 60;

type AktivitetPageData = {
  _id: string;
  tittel: string;
  beskrivelse: string;
  slug: { current?: string | null } | null;
  ikon?: { asset?: { _ref?: string }; alt?: string | null } | null;
  aksentfarge?: string | null;
  body?: unknown[] | null;
};

const getAktivitetBySlug = cache(async (slug: string) => {
  try {
    return await sanityClient.fetch<AktivitetPageData | null>(
      aktivitetBySlugQuery,
      { slug },
    );
  } catch {
    return null;
  }
});

function heroImageUrl(ikon: AktivitetPageData["ikon"]): string | null {
  if (!ikon?.asset?._ref) return null;
  try {
    return urlFor(ikon).width(2400).quality(88).url();
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<string[]>(aktivitetSlugsQuery);
    return (slugs ?? []).filter(Boolean).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getAktivitetBySlug(slug);
  if (!doc) {
    return { title: `Aktivitet – ${GARD_NAVN}` };
  }
  return {
    title: `${doc.tittel} – ${GARD_NAVN}`,
    description: doc.beskrivelse?.slice(0, 160),
  };
}

export default async function AktivitetStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getAktivitetBySlug(slug);
  if (!doc) notFound();

  const heroSrc = heroImageUrl(doc.ikon);
  const heroAlt = doc.ikon?.alt?.trim() || doc.tittel;
  const bodyBlocks = Array.isArray(doc.body) ? doc.body : [];
  const hasBody = bodyBlocks.length > 0;
  const aksentStyle = doc.aksentfarge
    ? ({ "--aktivitet-aksent": doc.aksentfarge } as CSSProperties)
    : undefined;

  return (
    <div className="min-h-screen bg-[#9B7039] text-foreground">
      <section
        className="w-full"
        aria-labelledby="aktivitet-story-hero-heading"
      >
        <div className="relative aspect-[5/3] w-full min-h-[220px] sm:aspect-[2.2/1] sm:min-h-[260px] md:aspect-[2.6/1] md:min-h-[300px] lg:min-h-[340px]">
          {heroSrc ? (
            <Image
              src={heroSrc}
              alt={heroAlt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-cream-deep" aria-hidden />
          )}
          <div
            className="absolute inset-0 z-[1] bg-black/60 sm:bg-black/58"
            aria-hidden
          />
          <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-5 px-5 sm:gap-6 sm:px-8 md:px-12 lg:px-16">
            <Link
              href="/"
              className="rounded-md text-sm font-semibold text-white/90 underline decoration-white/50 underline-offset-2 transition hover:text-white hover:decoration-white"
            >
              Til forsiden
            </Link>
            <h1
              id="aktivitet-story-hero-heading"
              className="max-w-4xl text-center font-sans text-[clamp(1.875rem,5.5vw+0.5rem,3rem)] font-black leading-[1.08] tracking-tight text-white antialiased drop-shadow-[0_4px_32px_rgba(0,0,0,0.75)] sm:text-[clamp(2.125rem,5vw+0.75rem,3.5rem)] md:text-[clamp(2.5rem,4vw+1rem,4rem)] lg:text-6xl lg:leading-[1.06] xl:text-7xl"
            >
              {doc.tittel}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-4xl px-4 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-16 md:px-8 md:pb-32 md:pt-20">
        <article
          className="rounded-2xl border-2 border-moss bg-[#FAF8F2] px-7 py-10 shadow-[0_20px_56px_rgba(0,0,0,0.22)] sm:px-10 sm:py-12 md:px-14 md:py-14"
          style={aksentStyle}
        >
          <p
            className="border-l-4 pl-5 text-lg font-medium leading-relaxed text-foreground sm:text-xl sm:leading-relaxed md:pl-6"
            style={{
              borderColor: "var(--aktivitet-aksent, #2d362d)",
            }}
          >
            {doc.beskrivelse}
          </p>
          {hasBody ? (
            <div className="mt-10 border-t border-moss/20 pt-10 flow-root">
              <PortableText
                value={bodyBlocks as TypedObject[]}
                components={aktivitetStoryPortableComponents}
              />
            </div>
          ) : null}
          <p className="mt-14 border-t border-moss/20 pt-10 text-center">
            <Link
              href="/"
              className="font-bold text-moss underline decoration-moss decoration-4 underline-offset-[5px] transition hover:text-foreground hover:decoration-foreground"
            >
              Tilbake til forsiden
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}

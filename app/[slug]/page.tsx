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
    <div className="min-h-screen bg-background text-foreground">
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
            className="absolute inset-0 z-[1] bg-black/50"
            aria-hidden
          />
          <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-5 px-5 sm:gap-6 sm:px-8 md:px-12 lg:px-16">
            <Link
              href="/"
              className="text-sm font-medium text-white/90 underline decoration-white/50 underline-offset-2 transition hover:text-white hover:decoration-white"
            >
              Til forsiden
            </Link>
            <h1
              id="aktivitet-story-hero-heading"
              className="max-w-3xl text-center font-display text-hero font-semibold tracking-tight text-white antialiased drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
            >
              {doc.tittel}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-4xl px-4 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-16 md:px-8 md:pb-32 md:pt-20">
        <article
          className="farm-panel prose-farm px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12"
          style={aksentStyle}
        >
          <p
            className="max-w-prose border-l-[3px] pl-4 text-[length:var(--text-body)] leading-relaxed text-foreground sm:pl-5"
            style={{
              borderColor: "var(--aktivitet-aksent, var(--color-mosegronn))",
            }}
          >
            {doc.beskrivelse}
          </p>
          {hasBody ? (
            <div className="mt-10 max-w-prose border-t border-[var(--farm-border)] pt-10 flow-root">
              <PortableText
                value={bodyBlocks as TypedObject[]}
                components={aktivitetStoryPortableComponents}
              />
            </div>
          ) : null}
          <p className="mt-14 border-t border-[var(--farm-border)] pt-10 text-center">
            <Link href="/" className="link-farm font-medium">
              Tilbake til forsiden
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}

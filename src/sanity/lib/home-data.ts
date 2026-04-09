import { unstable_cache } from "next/cache";
import type { PortableTextBlock } from "@portabletext/types";
import {
  aktiviteterQuery,
  landingssideFallbackQuery,
  landingssideQuery,
} from "../queries";
import { dataset, projectId } from "../env";
import { sanityClient } from "./client";

export type LandingDoc = {
  heroTittel?: string | null;
  heroBilde?: { asset?: { _ref?: string }; alt?: string | null } | null;
  historieOverskrift?: string | null;
  historieTekst?: PortableTextBlock[] | null;
} | null;

export type AktivitetDoc = {
  _id: string;
  tittel: string;
  beskrivelse: string;
  slug?: { current?: string | null } | null;
  internLenke?: string | null;
  ikon?: { asset?: { _ref?: string }; alt?: string | null } | null;
  aksentfarge?: string | null;
};

/**
 * Henter landingsside + aktiviteter. Cache invalideres maks hvert 60. sekund (ISR),
 * slik at endringer i Sanity (f.eks. Spælsau-tekst) vises på natlandsmyren.no etter kort tid.
 */
async function fetchHomePageUncached(): Promise<{
  landing: LandingDoc;
  aktiviteter: AktivitetDoc[];
}> {
  let landing: LandingDoc = null;
  let aktiviteter: AktivitetDoc[] = [];

  try {
    landing =
      (await sanityClient.fetch(landingssideQuery)) ??
      (await sanityClient.fetch(landingssideFallbackQuery));
    aktiviteter = await sanityClient.fetch(aktiviteterQuery);
  } catch {
    landing = null;
    aktiviteter = [];
  }

  return { landing, aktiviteter };
}

export const getHomePageData = unstable_cache(
  fetchHomePageUncached,
  ["home-sanity", projectId, dataset],
  { revalidate: 60, tags: ["sanity:home"] },
);

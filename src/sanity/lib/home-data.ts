import { unstable_cache } from "next/cache";
import type { PortableTextBlock } from "@portabletext/types";
import {
  aktiviteterQuery,
  historieFallbackQuery,
  historieQuery,
  landingssideFallbackQuery,
  landingssideQuery,
  produkterHomeQuery,
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

export type ProduktDoc = {
  _id: string;
  tittel: string;
  beskrivelse: string;
  pris: number;
  lagerstatus?: number | null;
  bilde?: { asset?: { _ref?: string }; alt?: string | null } | null;
};

export type HistorieTidslinjePunkt = {
  _key?: string;
  aarstall?: string | null;
  hendelseTittel?: string | null;
  beskrivelse?: string | null;
  bilde?: { asset?: { _ref?: string }; alt?: string | null } | null;
};

export type HistorieFortellingBlokk = {
  _key?: string;
  layout?: "left" | "right" | "full" | null;
  bilde?: {
    asset?: { _ref?: string };
    alt?: string | null;
    caption?: string | null;
  } | null;
  tekst?: PortableTextBlock[] | null;
};

export type HistorieDoc = {
  tittel?: string | null;
  heroBilde?: { asset?: { _ref?: string }; alt?: string | null } | null;
  fortelling?: HistorieFortellingBlokk[] | null;
  tidslinje?: HistorieTidslinjePunkt[] | null;
} | null;

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

async function fetchProdukterHomeUncached(): Promise<ProduktDoc[]> {
  try {
    return await sanityClient.fetch<ProduktDoc[]>(produkterHomeQuery);
  } catch {
    return [];
  }
}

export const getGardsutsalgProdukter = unstable_cache(
  fetchProdukterHomeUncached,
  ["sanity-produkter", projectId, dataset],
  { revalidate: 60, tags: ["sanity:produkter"] },
);

async function fetchHistorieUncached(): Promise<HistorieDoc> {
  try {
    return (
      (await sanityClient.fetch<HistorieDoc>(historieQuery)) ??
      (await sanityClient.fetch<HistorieDoc>(historieFallbackQuery))
    );
  } catch {
    return null;
  }
}

export const getHistorieData = unstable_cache(
  fetchHistorieUncached,
  ["sanity-historie", projectId, dataset],
  { revalidate: 60, tags: ["sanity:historie"] },
);

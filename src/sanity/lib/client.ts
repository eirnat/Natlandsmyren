import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Leseklient for GROQ (forsiden m.m.). Bruker `src/sanity/env.ts`
 * (NEXT_PUBLIC_SANITY_* med fallback smjuww1p / production).
 * Oppdateringsfrekvens for forsiden styres av `getHomePageData` (revalidate 60s).
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  /** API-read-only mot CDN – raskt for statisk/ISR-innhold */
  useCdn: true,
  perspective: "published",
});

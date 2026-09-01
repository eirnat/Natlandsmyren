/**
 * Engangsmigrering: historie.fortelling[] → historie.tekst
 *
 * Kjør med skrivetoken:
 *   SANITY_API_WRITE_TOKEN=<token> npx tsx scripts/migrate-historie-fortelling.ts
 *
 * Krever token med skriverettigheter til Sanity-prosjektet.
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "smjuww1p";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!token) {
  console.error(
    "Mangler SANITY_API_WRITE_TOKEN. Opprett token i sanity.io/manage og kjør på nytt.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type FortellingBlokk = {
  _key?: string;
  layout?: string;
  bilde?: {
    _type?: string;
    asset?: { _ref?: string; _type?: string };
    alt?: string | null;
    caption?: string | null;
  } | null;
  tekst?: Array<{
    _type?: string;
    _key?: string;
    style?: string;
    markDefs?: unknown[];
    children?: unknown[];
  }> | null;
};

type HistorieDoc = {
  _id: string;
  fortelling?: FortellingBlokk[] | null;
  tekst?: unknown[] | null;
};

function migrateFortellingToTekst(
  fortelling: FortellingBlokk[] | null | undefined,
): unknown[] {
  if (!fortelling || fortelling.length === 0) return [];

  const result: unknown[] = [];

  for (const blokk of fortelling) {
    if (blokk.tekst && blokk.tekst.length > 0) {
      for (const block of blokk.tekst) {
        result.push(block);
      }
    }

    if (blokk.bilde?.asset?._ref) {
      const imageBlock: Record<string, unknown> = {
        _type: "image",
        _key: `migrated-img-${blokk._key ?? result.length}`,
        asset: blokk.bilde.asset,
      };
      if (blokk.bilde.alt) imageBlock.alt = blokk.bilde.alt;
      if (blokk.bilde.caption) imageBlock.caption = blokk.bilde.caption;
      result.push(imageBlock);
    }
  }

  return result;
}

async function main() {
  const doc = await client.fetch<HistorieDoc | null>(
    `*[_type == "historie" && _id == "historie"][0]{ _id, fortelling, tekst }`,
  );

  if (!doc) {
    console.log("Ingen historie-dokument funnet. Ingenting å migrere.");
    return;
  }

  if (doc.tekst && doc.tekst.length > 0) {
    console.log(
      `historie.tekst har allerede ${doc.tekst.length} blokker. Hopper over migrering.`,
    );
    return;
  }

  const fortelling = doc.fortelling;
  if (!fortelling || fortelling.length === 0) {
    console.log("Ingen fortelling-blokker å migrere.");
    return;
  }

  const tekst = migrateFortellingToTekst(fortelling);
  if (tekst.length === 0) {
    console.log("Migrering ga ingen innhold. Avbryter.");
    return;
  }

  await client
    .patch(doc._id)
    .set({ tekst })
    .unset(["fortelling"])
    .commit();

  console.log(
    `Migrert ${fortelling.length} fortellingsblokker til ${tekst.length} tekstblokker.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

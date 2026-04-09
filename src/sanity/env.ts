/**
 * Standardverdier = produksjonsprosjektet natlandsmyren.no.
 * Overstyr med NEXT_PUBLIC_SANITY_* i Vercel/hosting.
 */
const trimOr = (value: string | undefined, fallback: string) => {
  const v = value?.trim();
  return v && v.length > 0 ? v : fallback;
};

export const projectId = trimOr(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "smjuww1p",
);

export const dataset = trimOr(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "production",
);

export const apiVersion = trimOr(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  "2024-01-01",
);

import { defineQuery } from "next-sanity";

export const landingssideQuery = defineQuery(`
  *[_type == "landingsside" && _id == "landingsside"][0]{
    heroTittel,
    heroBilde {
      asset,
      alt
    },
    historieOverskrift,
    historieTekst
  }
`);

/** Også første landingsside-dokument hvis ikke fast id (fallback). */
export const landingssideFallbackQuery = defineQuery(`
  *[_type == "landingsside"][0]{
    heroTittel,
    heroBilde {
      asset,
      alt
    },
    historieOverskrift,
    historieTekst
  }
`);

export const aktiviteterQuery = defineQuery(`
  *[_type == "aktivitet"] | order(rekkefolge asc, tittel asc) {
    _id,
    tittel,
    beskrivelse,
    slug,
    internLenke,
    ikon {
      asset,
      alt
    },
    aksentfarge
  }
`);

export const aktivitetSlugsQuery = defineQuery(`
  *[_type == "aktivitet" && defined(slug.current)].slug.current
`);

export const aktivitetBySlugQuery = defineQuery(`
  *[_type == "aktivitet" && slug.current == $slug][0]{
    _id,
    tittel,
    beskrivelse,
    slug,
    ikon {
      asset,
      alt
    },
    aksentfarge,
    body[]{
      ...,
      _type == "aktivitetStoryVideo" => {
        ...,
        videoFile {
          asset->{
            url,
            mimeType,
            originalFilename
          }
        }
      }
    }
  }
`);

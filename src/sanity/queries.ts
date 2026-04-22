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

/** De tre siste produktene (gårdsutsalg) til forsiden. */
export const produkterHomeQuery = defineQuery(`
  *[_type == "produkt"] | order(_createdAt desc) [0...3] {
    _id,
    tittel,
    beskrivelse,
    pris,
    lagerstatus,
    bilde {
      asset,
      alt
    }
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
      },
      _type == "productReference" => {
        _key,
        _type,
        product->{
          _id,
          tittel,
          beskrivelse,
          pris,
          lagerstatus,
          bilde {
            asset,
            alt
          }
        }
      }
    }
  }
`);

export const historieQuery = defineQuery(`
  *[_type == "historie" && _id == "historie"][0]{
    tittel,
    heroBilde {
      asset,
      alt
    },
    fortelling[]{
      _key,
      layout,
      bilde {
        asset,
        alt,
        caption
      },
      tekst
    },
    tidslinje[]{
      _key,
      aarstall,
      hendelseTittel,
      beskrivelse,
      bilde {
        asset,
        alt
      }
    }
  }
`);

export const historieFallbackQuery = defineQuery(`
  *[_type == "historie"][0]{
    tittel,
    heroBilde {
      asset,
      alt
    },
    fortelling[]{
      _key,
      layout,
      bilde {
        asset,
        alt,
        caption
      },
      tekst
    },
    tidslinje[]{
      _key,
      aarstall,
      hendelseTittel,
      beskrivelse,
      bilde {
        asset,
        alt
      }
    }
  }
`);

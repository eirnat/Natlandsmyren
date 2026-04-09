import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

type ImageSource = Parameters<typeof builder.image>[0];

/** Bygg CDN-URL for Sanity-bilder (brukes med next/image eller <img>). */
export function urlFor(source: ImageSource) {
  return builder.image(source);
}

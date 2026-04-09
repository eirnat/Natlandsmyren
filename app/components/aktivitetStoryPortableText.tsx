import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";

import { resolveStoryVideoSrc } from "../lib/parse-video-embed";
import { urlFor } from "../../src/sanity/lib/image";

type StoryImageValue = {
  asset?: unknown;
  alt?: string | null;
  caption?: string | null;
};

type AktivitetStoryImageValue = {
  image?: StoryImageValue | null;
  caption?: string | null;
  layout?: "full" | "inline" | null;
};

type AktivitetStoryVideoValue = {
  /** Sanity file-felt (etter GROQ asset->) */
  videoFile?: {
    asset?: {
      url?: string | null;
      mimeType?: string | null;
      originalFilename?: string | null;
    } | null;
  } | null;
  /** Eldre innhold – erstatt med opplasting i Studio */
  url?: string | null;
  caption?: string | null;
};

function StoryFigureImage({
  src,
  alt,
  caption,
  layout,
}: {
  src: string;
  alt: string;
  caption?: string | null;
  layout: "full" | "inline";
}) {
  const isInline = layout === "inline";
  return (
    <figure
      className={
        isInline
          ? "my-8 md:float-left md:mr-8 md:mb-6 md:mt-1 md:w-[min(100%,26rem)] md:max-w-[47%]"
          : "my-10 w-full"
      }
    >
      <Image
        src={src}
        alt={alt}
        width={isInline ? 800 : 1400}
        height={isInline ? 600 : 900}
        className="w-full rounded-xl border-2 border-moss object-cover shadow-[0_10px_36px_rgba(45,54,45,0.18)]"
        sizes={
          isInline
            ? "(min-width: 768px) 47vw, 100vw"
            : "(max-width: 896px) 100vw, 896px"
        }
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-sm font-medium text-moss/90 md:text-left">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function VideoBlock({ value }: { value: AktivitetStoryVideoValue }) {
  const caption =
    typeof value.caption === "string" && value.caption.trim()
      ? value.caption.trim()
      : null;

  const fromSanity =
    typeof value.videoFile?.asset?.url === "string"
      ? value.videoFile.asset.url.trim()
      : "";
  const legacyUrl =
    typeof value.url === "string" ? value.url.trim() : "";
  const src = fromSanity || (legacyUrl ? resolveStoryVideoSrc(legacyUrl) : "");
  if (!src) return null;

  const label =
    caption || "Kort video som spilles automatisk i loop (uten lyd)";

  return (
    <figure className="my-10 w-full">
      {caption ? (
        <figcaption className="mb-3 font-display text-lg font-semibold text-moss">
          {caption}
        </figcaption>
      ) : null}
      <div className="aspect-video overflow-hidden rounded-xl border-2 border-moss bg-black shadow-[0_12px_40px_rgba(45,54,45,0.2)]">
        <video
          className="h-full w-full object-cover"
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label={label}
        />
      </div>
    </figure>
  );
}

/** Portable Text-komponenter for aktivitetshistorier (gårdens farger og typografi). */
export const aktivitetStoryPortableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-base font-medium leading-relaxed text-foreground first:mt-0 sm:text-lg sm:leading-relaxed">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-2xl font-bold tracking-tight text-moss first:mt-0 sm:text-3xl md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-display text-xl font-bold tracking-tight text-moss first:mt-0 sm:text-2xl">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 list-disc space-y-2 pl-6 text-base font-medium text-foreground sm:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 list-decimal space-y-2 pl-6 text-base font-medium text-foreground sm:text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground">{children}</em>
    ),
  },
  types: {
    image: ({ value }) => {
      const v = value as StoryImageValue & { _type?: string };
      if (!v?.asset) return null;
      let src: string;
      try {
        src = urlFor(v).width(1600).quality(88).url();
      } catch {
        return null;
      }
      const alt = typeof v.alt === "string" ? v.alt : "";
      const caption =
        typeof v.caption === "string" && v.caption.trim()
          ? v.caption.trim()
          : null;
      return (
        <StoryFigureImage
          src={src}
          alt={alt}
          caption={caption}
          layout="full"
        />
      );
    },
    aktivitetStoryImage: ({ value }) => {
      const v = value as AktivitetStoryImageValue;
      const img = v?.image;
      if (!img?.asset) return null;
      let src: string;
      try {
        src = urlFor(img).width(1600).quality(88).url();
      } catch {
        return null;
      }
      const alt = typeof img.alt === "string" ? img.alt : "";
      const caption =
        typeof v.caption === "string" && v.caption.trim()
          ? v.caption.trim()
          : null;
      const layout = v.layout === "inline" ? "inline" : "full";
      return (
        <StoryFigureImage
          src={src}
          alt={alt}
          caption={caption}
          layout={layout}
        />
      );
    },
    aktivitetStoryVideo: ({ value }) => (
      <VideoBlock value={value as AktivitetStoryVideoValue} />
    ),
  },
};

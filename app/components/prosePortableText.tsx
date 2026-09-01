import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";

import { urlFor } from "../../src/sanity/lib/image";

type ProseImageValue = {
  asset?: unknown;
  alt?: string | null;
  caption?: string | null;
};

export const prosePortableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-foreground first:mt-0">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }: { value?: ProseImageValue }) => {
      if (!value?.asset) return null;
      let src: string;
      try {
        src = urlFor(value).width(1200).quality(88).auto("format").url();
      } catch {
        return null;
      }
      const alt = value.alt?.trim() || "";
      const caption = value.caption?.trim();
      return (
        <figure className="my-8">
          <div className="farm-img relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {caption ? (
            <figcaption className="mt-2 text-small text-muted-foreground">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export const historieProsePortableComponents: PortableTextComponents = {
  ...prosePortableComponents,
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--farm-history-accent)]">
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

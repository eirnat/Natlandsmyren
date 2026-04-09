import { defineField, defineType } from "sanity";

/** Bilde i aktivitetshistorie med bildetekst og valg av layout. */
export const aktivitetStoryImage = defineType({
  name: "aktivitetStoryImage",
  title: "Bilde (historie)",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternativ tekst",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Bildetekst",
      type: "string",
      description: "Valgfri tekst under bildet.",
    }),
    defineField({
      name: "layout",
      title: "Plassering",
      type: "string",
      options: {
        list: [
          { title: "Full bredde", value: "full" },
          { title: "Ved siden av tekst", value: "inline" },
        ],
        layout: "radio",
      },
      initialValue: "full",
    }),
  ],
  preview: {
    select: {
      media: "image",
      caption: "caption",
      layout: "layout",
    },
    prepare({ media, caption, layout }) {
      return {
        title: caption || "Bilde",
        subtitle:
          layout === "inline" ? "Ved siden av tekst" : "Full bredde",
        media,
      };
    },
  },
});

/** Kort videosnutt hostet i Sanity (autoplay + loop på nettsiden). */
export const aktivitetStoryVideo = defineType({
  name: "aktivitetStoryVideo",
  title: "Kort videosnutt",
  type: "object",
  fields: [
    defineField({
      name: "videoFile",
      title: "Videofil",
      type: "file",
      description:
        "Last opp en kort snutt (anbefalt maks ca. 10 sek), f.eks. MP4 eller WebM. Filen lagres i Sanity og spilles automatisk i loop uten lyd på nettsiden.",
      options: {
        accept: "video/mp4,video/webm,video/quicktime",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Tittel / bildetekst",
      type: "string",
      description: "Valgfri tekst ved siden av videoen (synlig for alle; bra for tilgjengelighet).",
    }),
  ],
  preview: {
    select: {
      caption: "caption",
      fileName: "videoFile.asset.originalFilename",
    },
    prepare({ caption, fileName }) {
      return {
        title: caption || "Kort videosnutt",
        subtitle: fileName || "Last opp videofil",
      };
    },
  },
});

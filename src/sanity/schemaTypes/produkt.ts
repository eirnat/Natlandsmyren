import { defineField, defineType } from "sanity";

export const produkt = defineType({
  name: "produkt",
  title: "Produkt",
  type: "document",
  description: "Varer i gårdsutsalget (vises på forsiden).",
  fields: [
    defineField({
      name: "tittel",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "beskrivelse",
      title: "Beskrivelse",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pris",
      title: "Pris (kr)",
      type: "number",
      description: "Pris i kroner, uten «kr» i feltet (f.eks. 89).",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "bilde",
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
      name: "lagerstatus",
      title: "Lagerstatus (antall)",
      type: "number",
      description: "Antall på lager. Bruk 0 hvis utsolgt.",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Nyeste først",
      name: "nyeste",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Tittel A–Å",
      name: "tittel",
      by: [{ field: "tittel", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "tittel",
      media: "bilde",
      pris: "pris",
      lager: "lagerstatus",
    },
    prepare({ title, media, pris, lager }) {
      return {
        title: title || "Uten tittel",
        subtitle:
          pris != null
            ? `${pris} kr · lager: ${lager ?? 0}`
            : undefined,
        media,
      };
    },
  },
});

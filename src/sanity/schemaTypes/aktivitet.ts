import { defineField, defineType } from "sanity";

export const aktivitet = defineType({
  name: "aktivitet",
  title: "Aktivitet",
  type: "document",
  fields: [
    defineField({
      name: "tittel",
      title: "Navn",
      type: "string",
      description: "F.eks. Birøkt, Hønsehold, Sauehold",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "beskrivelse",
      title: "Beskrivelse",
      type: "text",
      rows: 4,
      description: "Kort tekst om aktiviteten (f.eks. lynghonning, gårdsegg, sau).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ikon",
      title: "Ikon / bilde",
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
      name: "aksentfarge",
      title: "Aksentfarge",
      type: "string",
      description:
        "Hex-farge for oker, mose, rav osv. (f.eks. #D48420, #3E4A3E). Brukes på flisen.",
      initialValue: "#D48420",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || value === "") return true;
          return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
            ? true
            : "Må være gyldig hex, f.eks. #D48420";
        }),
    }),
    defineField({
      name: "internLenke",
      title: "Intern lenke",
      type: "string",
      description: "F.eks. /birøkt eller /hønsehold",
      placeholder: "/birøkt",
    }),
    defineField({
      name: "slug",
      title: "Slug (valgfri reserve for lenke)",
      type: "slug",
      options: {
        source: "tittel",
        maxLength: 96,
      },
    }),
    defineField({
      name: "rekkefolge",
      title: "Rekkefølge",
      type: "number",
      description: "Lavere tall vises først.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Rekkefølge, deretter navn",
      name: "rekkefolge",
      by: [
        { field: "rekkefolge", direction: "asc" },
        { field: "tittel", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "tittel", media: "ikon" },
  },
});

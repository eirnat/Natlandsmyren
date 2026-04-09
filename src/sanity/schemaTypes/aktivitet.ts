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
      name: "slug",
      title: "URL-adresse (slug)",
      type: "slug",
      description:
        "Adressen på nettsiden, f.eks. «sau» gir natlandsmyren.no/aktivitet/sau. Genereres fra navn eller skrives inn.",
      options: {
        source: "tittel",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[æÆ]/g, "ae")
            .replace(/[øØ]/g, "o")
            .replace(/[åÅ]/g, "a")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, ""),
      },
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
      title: "Intern lenke (valgfri)",
      type: "string",
      description:
        "Kun hvis du trenger en annen lenke enn /aktivitet/[slug] (f.eks. ekstern side). Tom = bruk slug.",
      placeholder: "/birøkt",
    }),
    defineField({
      name: "body",
      title: "Brødtekst",
      type: "array",
      description: "Lang tekst til aktivitetssiden – avsnitt og bilder.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Overskrift 2", value: "h2" },
            { title: "Overskrift 3", value: "h3" },
          ],
          lists: [
            { title: "Punktliste", value: "bullet" },
            { title: "Nummerert liste", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Fet", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
            annotations: [],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternativ tekst",
            }),
          ],
        },
      ],
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

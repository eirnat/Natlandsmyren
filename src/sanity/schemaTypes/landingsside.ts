import { defineField, defineType } from "sanity";

export const landingsside = defineType({
  name: "landingsside",
  title: "Hjemmeside",
  type: "document",
  fields: [
    defineField({
      name: "heroTittel",
      title: "Overskrift på bilde",
      type: "string",
      description: "Tom = standardtekst fra nettsiden.",
    }),
    defineField({
      name: "heroBilde",
      title: "Bakgrunnsbilde (Hero)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternativ tekst",
        }),
      ],
      description: "Tom = standardbilde (gardvinter) fra nettsiden.",
    }),
    defineField({
      name: "historieOverskrift",
      title: "Historie-overskrift",
      type: "string",
      initialValue: "Historien om Natlandsmyr",
    }),
    defineField({
      name: "historieTekst",
      title: "Historietekst",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Fet", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
            annotations: [],
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Hjemmeside" }),
  },
});

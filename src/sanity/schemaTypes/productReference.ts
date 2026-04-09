import { defineField, defineType } from "sanity";

/** Innbygging av gårdsutsalg-produkt i aktivitetens Portable Text. */
export const productReference = defineType({
  name: "productReference",
  title: "Produkt fra gårdsutsalget",
  type: "object",
  fields: [
    defineField({
      name: "product",
      title: "Produkt",
      type: "reference",
      to: [{ type: "produkt" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      tittel: "product.tittel",
      media: "product.bilde",
    },
    prepare({ tittel, media }) {
      return {
        title: tittel || "Velg produkt",
        subtitle: "Gårdsutsalg",
        media,
      };
    },
  },
});

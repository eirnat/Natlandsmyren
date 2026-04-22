import { defineField, defineType } from "sanity";

export const historie = defineType({
  name: "historie",
  title: "Historie",
  type: "document",
  fields: [
    defineField({
      name: "tittel",
      title: "Tittel",
      type: "string",
      initialValue: "Historien om Natlandsmyren",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroBilde",
      title: "Hero-bilde",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternativ tekst",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "fortelling",
      title: "Fortelling (bilde + tekstblokker)",
      type: "array",
      of: [
        defineType({
          name: "historieFortellingBlokk",
          title: "Fortellingsblokk",
          type: "object",
          fields: [
            defineField({
              name: "bilde",
              title: "Bilde",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alternativ tekst",
                  type: "string",
                }),
                defineField({
                  name: "caption",
                  title: "Bildetekst",
                  type: "string",
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "tekst",
              title: "Tekst",
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
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "layout",
              title: "Layout",
              type: "string",
              options: {
                list: [
                  { title: "Bilde til venstre", value: "left" },
                  { title: "Bilde til høyre", value: "right" },
                  { title: "Fullbredde bilde", value: "full" },
                ],
                layout: "dropdown",
              },
              initialValue: "left",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "bilde.caption",
              subtitle: "layout",
              media: "bilde",
            },
            prepare: ({ title, subtitle, media }) => ({
              title: title || "Fortellingsblokk",
              subtitle:
                subtitle === "left"
                  ? "Bilde til venstre"
                  : subtitle === "right"
                    ? "Bilde til høyre"
                    : "Fullbredde bilde",
              media,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "tidslinje",
      title: "Tidslinje",
      type: "array",
      of: [
        defineType({
          name: "historieTidslinjePunkt",
          title: "Tidslinjepunkt",
          type: "object",
          fields: [
            defineField({
              name: "aarstall",
              title: "Årstall",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "hendelseTittel",
              title: "Hendelsestittel",
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
              name: "bilde",
              title: "Bilde",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alternativ tekst",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "hendelseTittel",
              subtitle: "aarstall",
              media: "bilde",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Historie" }),
  },
});

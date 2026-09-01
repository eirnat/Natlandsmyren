import { defineArrayMember, defineField, defineType } from "sanity";

export const historie = defineType({
  name: "historie",
  title: "Historie",
  type: "document",
  fieldsets: [
    {
      name: "topp",
      title: "Topp",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "fortelling",
      title: "Fortelling",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "tidslinje",
      title: "Tidslinje",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "tittel",
      title: "Tittel",
      type: "string",
      fieldset: "topp",
      initialValue: "Historien om Natlandsmyren",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroBilde",
      title: "Toppbilde",
      type: "image",
      fieldset: "topp",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternativ tekst",
          type: "string",
          description: "Kort beskrivelse av bildet for blinde og svaksynte.",
        }),
      ],
      description: "Bildet øverst på historie-siden.",
    }),
    defineField({
      name: "tekst",
      title: "Fortelling",
      type: "array",
      fieldset: "fortelling",
      description:
        "Skriv historien her. Bruk +-knappen for å sette inn bilder mellom avsnittene.",
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
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternativ tekst",
              type: "string",
              description: "Kort beskrivelse av bildet for blinde og svaksynte.",
            }),
            defineField({
              name: "caption",
              title: "Bildetekst",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "tidslinje",
      title: "Tidslinje",
      type: "array",
      fieldset: "tidslinje",
      description:
        "Viktige milepæler i gårdens historie. Legg til ett punkt om gangen.",
      of: [
        defineArrayMember({
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
              title: "Bilde (valgfritt)",
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

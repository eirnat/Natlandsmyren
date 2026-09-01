import { defineField, defineType } from "sanity";

export const landingsside = defineType({
  name: "landingsside",
  title: "Hjemmeside",
  type: "document",
  fieldsets: [
    {
      name: "toppbilde",
      title: "Toppbilde",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "historie",
      title: "Historie på forsiden",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "heroTittel",
      title: "Overskrift på bilde",
      type: "string",
      fieldset: "toppbilde",
      description:
        "Teksten som vises over toppbildet. La feltet stå tomt for standardtekst.",
    }),
    defineField({
      name: "heroBilde",
      title: "Toppbilde",
      type: "image",
      fieldset: "toppbilde",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternativ tekst",
          description: "Kort beskrivelse av bildet for blinde og svaksynte.",
        }),
      ],
      description:
        "Bakgrunnsbildet øverst på forsiden. La feltet stå tomt for standardbilde.",
    }),
    defineField({
      name: "historieOverskrift",
      title: "Historie-overskrift",
      type: "string",
      fieldset: "historie",
      initialValue: "Historien om Natlandsmyr",
      description: "Overskriften over historieteksten på forsiden.",
    }),
    defineField({
      name: "historieTekst",
      title: "Historietekst",
      type: "array",
      fieldset: "historie",
      description:
        "Skriv tekst her. Bruk fet eller kursiv der det passer. For å sette inn bilde, bruk +-knappen.",
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
    defineField({
      name: "historieBilde",
      title: "Historiebilde",
      type: "image",
      fieldset: "historie",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternativ tekst",
          description: "Kort beskrivelse av bildet for blinde og svaksynte.",
        }),
      ],
      description:
        "Bildet som vises ved siden av historieteksten på forsiden. La feltet stå tomt for standardbilde.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Hjemmeside" }),
  },
});

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

/**
 * I Sanity v3 er skrivebords-/innholdsstrukturen `structureTool()`.
 * (Eldre dokumentasjon omtalte dette som «desk tool».)
 */
const deskTool = structureTool;

export default defineConfig({
  name: "natlandsmyren",
  title: "Natlandsmyren",
  /** Må samsvare med NEXT_PUBLIC_SANITY_PROJECT_ID (standard: smjuww1p) */
  projectId: "smjuww1p",
  /** Må samsvare med NEXT_PUBLIC_SANITY_DATASET (standard: production) */
  dataset: "production",
  /** Innebygd Studio på natlandsmyren.no/studio */
  basePath: "/studio",
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Innhold")
          .items([
            S.listItem()
              .title("Hjemmeside")
              .id("landingsside-entry")
              .child(
                S.document()
                  .schemaType("landingsside")
                  .documentId("landingsside"),
              ),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "landingsside",
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});

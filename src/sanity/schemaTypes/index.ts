import type { SchemaTypeDefinition } from "sanity";
import { aktivitet } from "./aktivitet";
import { landingsside } from "./landingsside";

export const schemaTypes: SchemaTypeDefinition[] = [
  landingsside,
  aktivitet,
];

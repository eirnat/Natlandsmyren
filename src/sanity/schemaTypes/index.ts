import type { SchemaTypeDefinition } from "sanity";
import { aktivitet } from "./aktivitet";
import { historie } from "./historie";
import { landingsside } from "./landingsside";
import { produkt } from "./produkt";
import { productReference } from "./productReference";
import {
  aktivitetStoryImage,
  aktivitetStoryVideo,
} from "./aktivitetStoryBlocks";

export const schemaTypes: SchemaTypeDefinition[] = [
  landingsside,
  historie,
  aktivitetStoryImage,
  aktivitetStoryVideo,
  produkt,
  productReference,
  aktivitet,
];

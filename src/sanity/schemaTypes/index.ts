import type { SchemaTypeDefinition } from "sanity";
import { aktivitet } from "./aktivitet";
import { landingsside } from "./landingsside";
import { produkt } from "./produkt";
import { productReference } from "./productReference";
import {
  aktivitetStoryImage,
  aktivitetStoryVideo,
} from "./aktivitetStoryBlocks";

export const schemaTypes: SchemaTypeDefinition[] = [
  landingsside,
  aktivitetStoryImage,
  aktivitetStoryVideo,
  produkt,
  productReference,
  aktivitet,
];

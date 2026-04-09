import type { SchemaTypeDefinition } from "sanity";
import { aktivitet } from "./aktivitet";
import { landingsside } from "./landingsside";
import {
  aktivitetStoryImage,
  aktivitetStoryVideo,
} from "./aktivitetStoryBlocks";

export const schemaTypes: SchemaTypeDefinition[] = [
  landingsside,
  aktivitetStoryImage,
  aktivitetStoryVideo,
  aktivitet,
];

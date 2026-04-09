import type { Metadata, Viewport } from "next";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import { StudioRouteChrome } from "./StudioRouteChrome";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Sanity Studio – Natlandsmyren",
};

export const viewport: Viewport = studioViewport;

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudioRouteChrome>{children}</StudioRouteChrome>;
}

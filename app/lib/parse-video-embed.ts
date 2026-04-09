/**
 * Aktivitetsvideoer skal være korte, selvhostede filer – ikke YouTube/Vimeo.
 * Returnerer en gyldig http(s)-URL til <video src>, eller null.
 */
export function resolveStoryVideoSrc(raw: string): string | null {
  const url = raw?.trim();
  if (!url) return null;

  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    const host = u.hostname.toLowerCase();
    if (
      host === "youtu.be" ||
      host.endsWith(".youtube.com") ||
      host === "youtube.com" ||
      host.endsWith(".vimeo.com") ||
      host === "vimeo.com"
    ) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

"use client";

import { useEffect } from "react";

/**
 * Denne layouten brukes kun under /studio. Nullstiller body/html til nøytralt tema
 * slik at global oker-CSS ikke gjør Studioet uleselig.
 */
export function StudioRouteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.setAttribute("data-sanity-studio", "");
    document.body.setAttribute("data-sanity-studio", "");
    return () => {
      document.documentElement.removeAttribute("data-sanity-studio");
      document.body.removeAttribute("data-sanity-studio");
    };
  }, []);

  return <>{children}</>;
}

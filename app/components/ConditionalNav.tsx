"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "./SiteNav";

export function ConditionalNav() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  if (pathname === "/under-utvikling") return null;
  return <SiteNav />;
}

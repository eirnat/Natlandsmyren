"use client";

import { usePathname } from "next/navigation";
import { FarmFooter } from "./FarmFooter";

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <FarmFooter />;
}

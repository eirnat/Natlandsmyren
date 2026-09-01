"use client";

import { useEffect } from "react";

export default function PreviewPage() {
  useEffect(() => {
    document.cookie = "site_access=true; Path=/; Max-Age=2592000; SameSite=Lax";
    window.location.replace("/");
  }, []);

  return (
    <section className="flex min-h-[70svh] items-center justify-center bg-background px-6 py-14">
      <div className="farm-panel max-w-xl p-8 text-center sm:p-10">
        <p className="font-display text-section font-semibold text-foreground">
          Tilgang innvilget. Sender deg videre...
        </p>
      </div>
    </section>
  );
}

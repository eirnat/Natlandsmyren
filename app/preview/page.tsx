"use client";

import { useEffect } from "react";

export default function PreviewPage() {
  useEffect(() => {
    document.cookie = "site_access=true; Path=/; Max-Age=2592000; SameSite=Lax";
    window.location.replace("/");
  }, []);

  return (
    <section className="flex min-h-[70svh] items-center justify-center bg-[#F4F1EA] px-6 py-14">
      <div className="max-w-xl rounded-3xl border-2 border-black/10 bg-[#FFFBF2] p-8 text-center shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.1)] sm:p-10">
        <p className="font-display text-3xl font-black text-[#2D3A27] sm:text-4xl">
          Tilgang innvilget. Sender deg videre...
        </p>
      </div>
    </section>
  );
}

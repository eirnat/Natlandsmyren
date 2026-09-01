import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Under utvikling - Natlandsmyren",
  description: "Nettsiden til Natlandsmyren er under utvikling.",
};

export default function UnderUtviklingPage() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-background">
      <Image
        src="/images/gardsommer.jpg"
        alt="Natlandsmyren om sommeren"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-foreground/45" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-foreground/30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-4xl items-center px-6 py-14 sm:px-8">
        <div className="farm-panel w-full bg-background/92 p-7 backdrop-blur-[2px] sm:p-10">
          <h1 className="font-display text-hero font-semibold leading-tight text-foreground">
            Velkommen til Natlandsmyren
          </h1>
          <p className="mt-5 text-lg font-normal leading-relaxed text-foreground sm:text-xl">
            Vi bygger nettsiden vår — historien om Natlandsmyren kommer snart.
          </p>
        </div>
      </div>
    </section>
  );
}

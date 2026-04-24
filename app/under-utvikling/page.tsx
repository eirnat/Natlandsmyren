import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Under utvikling - Natlandsmyren",
  description: "Nettsiden til Natlandsmyren er under utvikling.",
};

export default function UnderUtviklingPage() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#F4F1EA]">
      <Image
        src="/images/gardsommer.jpg"
        alt="Natlandsmyren om sommeren"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#1A2419]/45" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#FFFBF2]/35 via-transparent to-[#1A2419]/30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-4xl items-center px-6 py-14 sm:px-8">
        <div className="w-full rounded-3xl border-2 border-black/10 bg-[#FFFBF2]/92 p-7 shadow-[6px_6px_0pt_0pt_rgba(0,0,0,0.12)] backdrop-blur-[2px] sm:p-10">
          <h1 className="font-display text-4xl font-black leading-tight text-[#2D3A27] sm:text-5xl">
            Velkommen til Natlandsmyren
          </h1>
          <p className="mt-5 text-lg font-medium leading-relaxed text-[#2D3A27] sm:text-xl">
            Nettsiden vår er for tiden under utvikling.
          </p>
        </div>
      </div>
    </section>
  );
}

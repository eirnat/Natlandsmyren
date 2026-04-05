import Image from "next/image";
import Link from "next/link";
import { AktivitetFliser } from "./components/AktivitetFliser";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2d362d]">
      {/* Hero – full bredde */}
      <section className="w-full" aria-label="Natlandsmyren om vinteren">
        <div className="relative aspect-[5/3] w-full min-h-[220px] sm:aspect-[2.2/1] sm:min-h-[260px] md:aspect-[2.6/1] md:min-h-[300px] lg:min-h-[340px]">
          <Image
            src="/images/gardvinter.jpg"
            alt="Natlandsmyren om vinteren"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-5 sm:pb-20 sm:pt-10 md:px-6 md:pt-12">
        <AktivitetFliser />

        {/* Historie – to kolonner på stor skjerm; emblem fyller hele høyre rute */}
        <section
          className="mt-12 overflow-hidden rounded-2xl border border-[#2d362d]/10 bg-[#faf7f1] shadow-sm sm:mt-14 md:mt-16 lg:grid lg:grid-cols-2 lg:items-stretch"
          aria-labelledby="historie-heading"
        >
          <div className="p-6 text-center sm:p-8 md:p-10 lg:p-12 lg:text-left">
            <h2
              id="historie-heading"
              className="font-display text-xl font-semibold tracking-tight text-[#2d362d] sm:text-2xl md:text-3xl"
            >
              Historien om Natlandsmyren
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#586056] sm:text-base sm:leading-relaxed">
              Gården ligger ved myren og har vært i bruk over lang tid. Her kan
              du kort fortelle om slekt, bygninger og årstall – teksten er en
              mal du kan bytte ut med egne fakta.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#586056] sm:text-base sm:leading-relaxed">
              Les mer på{" "}
              <Link
                href="/historie"
                className="font-medium text-[#6b5344] underline decoration-[#6b5344]/35 underline-offset-2 transition hover:decoration-[#6b5344]"
              >
                historie-siden
              </Link>
              .
            </p>
          </div>
          <div className="relative min-h-[220px] w-full sm:min-h-[260px] lg:h-full lg:min-h-0">
            <Image
              src="/images/emblem.jpg"
              alt="Emblem for Natlandsmyren"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

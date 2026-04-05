import Image from "next/image";
import Link from "next/link";
import { Bird, Bug, Cloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Lucide har ikke eget Bee-ikon; Bug gir samme stroke-stil og fungerer som birøkt-symbol. */
const BirøktIkon = Bug;

const fliser: {
  tittel: string;
  beskrivelse: string;
  ikon: LucideIcon;
  href: string;
}[] = [
  {
    tittel: "Birøkt",
    beskrivelse: "Honning og bikuber.",
    ikon: BirøktIkon,
    href: "/birøkt",
  },
  {
    tittel: "Hønsehold",
    beskrivelse: "Høner og egg.",
    ikon: Bird,
    href: "/hønsehold",
  },
  {
    tittel: "Sauehold",
    beskrivelse: "Sau på beite.",
    ikon: Cloud,
    href: "/sauehold",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5E9D3] text-[#2D332A]">
      {/* Hero */}
      <section className="w-full" aria-labelledby="hero-heading">
        <div className="relative aspect-[5/3] w-full min-h-[220px] sm:aspect-[2.2/1] sm:min-h-[260px] md:aspect-[2.6/1] md:min-h-[300px] lg:min-h-[340px]">
          <Image
            src="/images/gardvinter.jpg"
            alt="Natlandsmyren om vinteren"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 z-[1] bg-black/30" aria-hidden />
          <div className="absolute inset-x-0 top-0 z-[2] px-5 pt-6 sm:px-8 sm:pt-8 md:px-12 md:pt-10 lg:px-16 lg:pt-12 xl:pt-14">
            <h1
              id="hero-heading"
              className="mx-auto max-w-6xl text-center font-sans text-[clamp(1.5rem,5vw+0.75rem,2.5rem)] font-semibold leading-[1.12] tracking-[0.02em] text-white/95 sm:text-[clamp(1.75rem,4.5vw+1rem,3rem)] md:text-[clamp(2rem,3.5vw+1.25rem,3.75rem)] lg:text-6xl lg:leading-[1.08] xl:text-7xl"
            >
              Velkommen til Natlandsmyren
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 md:px-8 md:pb-28 md:pt-20 lg:pt-24">
        {/* Aktivitetsfliser */}
        <section aria-labelledby="aktivitet-heading">
          <h2 id="aktivitet-heading" className="sr-only">
            Birøkt, hønsehold og sauehold
          </h2>
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 md:gap-8">
            {fliser.map(({ tittel, beskrivelse, ikon: Ikon, href }) => (
              <li key={tittel}>
                <Link
                  href={href}
                  className="group flex min-h-[9.5rem] flex-col items-center justify-center rounded-2xl border border-[#3A4D3A]/22 bg-[#FAF8F5] px-6 py-8 text-center shadow-sm transition-all duration-300 ease-out hover:border-[#3A4D3A] hover:bg-[#3A4D3A] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A4D3A] sm:min-h-[10rem]"
                >
                  <Ikon
                    className="h-9 w-9 shrink-0 text-[#3A4D3A] transition-colors duration-300 group-hover:text-white sm:h-10 sm:w-10"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="mt-4 text-base font-semibold tracking-tight text-[#3A4D3A] transition-colors duration-300 group-hover:text-white sm:text-lg">
                    {tittel}
                  </span>
                  <span className="mt-1.5 text-sm text-[#2D332A]/88 transition-colors duration-300 group-hover:text-white/95">
                    {beskrivelse}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Historie */}
        <section
          className="mt-16 overflow-hidden rounded-2xl border border-[#3A4D3A]/18 bg-[#FAF8F5] shadow-sm sm:mt-20 md:mt-24 lg:grid lg:grid-cols-2 lg:items-stretch"
          aria-labelledby="historie-heading"
        >
          <div className="p-7 text-center sm:p-9 md:p-11 lg:p-12 lg:text-left">
            <h2
              id="historie-heading"
              className="font-display text-xl font-semibold tracking-tight text-[#3A4D3A] sm:text-2xl md:text-3xl"
            >
              Historien om Natlandsmyr
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#2D332A]/92 sm:text-base sm:leading-relaxed">
              Gården ligger ved myren. Brukshistorien strekker seg over mange
              år – bygninger, generasjoner og hverdagen på tunet kan du kort
              beskrive her.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[#2D332A]/92 sm:text-base sm:leading-relaxed">
              Mer detaljer finner du på{" "}
              <Link
                href="/historie"
                className="font-semibold text-[#3A4D3A] underline decoration-[#EADDC4] decoration-2 underline-offset-[3px] transition hover:text-[#2d3d2d] hover:decoration-[#3A4D3A]/50"
              >
                historie-siden
              </Link>
              .
            </p>
          </div>
          <div className="relative min-h-[240px] w-full border-t border-[#3A4D3A]/12 sm:min-h-[280px] lg:h-full lg:min-h-0 lg:border-l lg:border-t-0">
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

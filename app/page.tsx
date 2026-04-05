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
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A2724]">
      {/* Hero med overlay og topptekst */}
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
          <div
            className="absolute inset-0 z-[1] bg-black/30"
            aria-hidden
          />
          <div className="absolute inset-x-0 top-0 z-[2] px-5 pt-6 sm:px-7 sm:pt-8 md:px-10 md:pt-10 lg:px-14 lg:pt-12 xl:pt-14">
            <h1
              id="hero-heading"
              className="mx-auto max-w-6xl text-center font-sans text-[clamp(1.5rem,5vw+0.75rem,2.5rem)] font-extralight italic leading-[1.12] tracking-[0.03em] text-white/95 sm:text-[clamp(1.75rem,4.5vw+1rem,3rem)] md:text-[clamp(2rem,3.5vw+1.25rem,3.75rem)] lg:text-6xl lg:leading-[1.1] xl:text-7xl"
            >
              Velkommen til Natlandsmyren
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-5 sm:pb-20 sm:pt-10 md:px-6 md:pt-12">
        {/* Aktivitetsfliser */}
        <section aria-labelledby="aktivitet-heading">
          <h2 id="aktivitet-heading" className="sr-only">
            Birøkt, hønsehold og sauehold
          </h2>
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 md:gap-6">
            {fliser.map(({ tittel, beskrivelse, ikon: Ikon, href }) => (
              <li key={tittel}>
                <Link
                  href={href}
                  className="group flex min-h-[9rem] flex-col items-center justify-center rounded-2xl border border-[#2A2724]/10 bg-[#EDE8DF] px-5 py-7 text-center shadow-sm transition-all duration-300 ease-out hover:border-[#C98B3E] hover:bg-[#C98B3E] hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98B3E] sm:min-h-[9.5rem]"
                >
                  <Ikon
                    className="h-9 w-9 shrink-0 text-[#C98B3E] transition-colors duration-300 group-hover:text-white sm:h-10 sm:w-10"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="mt-4 text-base font-semibold tracking-tight text-[#4B5335] transition-colors duration-300 group-hover:text-white sm:text-lg">
                    {tittel}
                  </span>
                  <span className="mt-1.5 text-sm text-[#2A2724]/85 transition-colors duration-300 group-hover:text-white/95">
                    {beskrivelse}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Historie */}
        <section
          className="mt-12 overflow-hidden rounded-2xl border border-[#2A2724]/10 bg-[#f5f1ea] shadow-sm sm:mt-14 md:mt-16 lg:grid lg:grid-cols-2 lg:items-stretch"
          aria-labelledby="historie-heading"
        >
          <div className="p-6 text-center sm:p-8 md:p-10 lg:p-12 lg:text-left">
            <h2
              id="historie-heading"
              className="font-display text-xl font-semibold tracking-tight text-[#4B5335] sm:text-2xl md:text-3xl"
            >
              Historien om Natlandsmyr
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#2A2724]/90 sm:text-base sm:leading-relaxed">
              Gården ligger ved myren. Brukshistorien strekker seg over mange
              år – bygninger, generasjoner og hverdagen på tunet kan du kort
              beskrive her.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#2A2724]/90 sm:text-base sm:leading-relaxed">
              Mer detaljer finner du på{" "}
              <Link
                href="/historie"
                className="font-medium text-[#C98B3E] underline decoration-[#C98B3E]/40 underline-offset-[3px] transition hover:decoration-[#C98B3E]"
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

import Image from "next/image";
import Link from "next/link";
import { GiBee, GiChicken, GiSheep } from "react-icons/gi";
import type { IconType } from "react-icons";

const aktiviteter: {
  tittel: string;
  beskrivelse: string;
  ikon: IconType;
  href: string;
}[] = [
  {
    tittel: "Birøkt",
    beskrivelse: "Honning og bikuber.",
    ikon: GiBee,
    href: "/dyrene",
  },
  {
    tittel: "Hønsehold",
    beskrivelse: "Høner og egg.",
    ikon: GiChicken,
    href: "/dyrene",
  },
  {
    tittel: "Sauehold",
    beskrivelse: "Sau på beite.",
    ikon: GiSheep,
    href: "/dyrene",
  },
];

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
        {/* Tre fliser */}
        <section aria-labelledby="aktivitet-heading">
          <h2 id="aktivitet-heading" className="sr-only">
            Birøkt, hønsehold og sauehold
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {aktiviteter.map(({ tittel, beskrivelse, ikon: Ikon, href }) => (
              <li key={tittel}>
                <Link
                  href={href}
                  className="flex min-h-[8.5rem] flex-col items-center justify-center rounded-2xl border border-[#2d362d]/12 bg-[#f8f5ef] px-5 py-6 text-center shadow-sm transition-colors duration-300 ease-out hover:bg-[#ebe4d6] hover:border-[#2d362d]/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c6b5c] sm:min-h-[9.5rem]"
                >
                  <Ikon
                    className="h-9 w-9 shrink-0 text-[#6b5c4a] sm:h-10 sm:w-10"
                    aria-hidden
                  />
                  <span className="mt-3 text-base font-semibold tracking-tight text-[#2d362d] sm:text-lg">
                    {tittel}
                  </span>
                  <span className="mt-1 text-sm text-[#586056]">
                    {beskrivelse}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Historie – to kolonner på stor skjerm */}
        <section
          className="mt-12 rounded-2xl border border-[#2d362d]/10 bg-[#faf7f1] p-6 shadow-sm sm:mt-14 sm:p-8 md:mt-16 md:p-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:p-12"
          aria-labelledby="historie-heading"
        >
          <div className="text-center lg:text-left">
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
          <div className="relative mx-auto mt-8 aspect-square w-full max-w-sm lg:mx-0 lg:mt-0 lg:max-w-none">
            <div className="relative h-full min-h-[240px] w-full overflow-hidden rounded-xl border border-[#2d362d]/10 bg-[#fdfbf7] sm:min-h-[280px] lg:min-h-[min(100%,320px)]">
              <Image
                src="/images/emblem.jpg"
                alt="Emblem for Natlandsmyren"
                fill
                className="object-contain p-4 sm:p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

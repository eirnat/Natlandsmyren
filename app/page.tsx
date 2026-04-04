import Image from "next/image";
import Link from "next/link";
import { IconBie, IconHone, IconSau } from "./components/GardDyrIkoner";

const fliser = [
  {
    tittel: "Birøktning",
    beskrivelse: "Noen kuber. Honning når året holder.",
    ikon: IconBie,
    href: "/dyrene",
  },
  {
    tittel: "Sauehold",
    beskrivelse: "Sau på beite mot myren.",
    ikon: IconSau,
    href: "/dyrene",
  },
  {
    tittel: "Hønsehold",
    beskrivelse: "Høner i hagen. Egg til huset.",
    ikon: IconHone,
    href: "/dyrene",
  },
] as const;

const flisLinkClass =
  "group flex h-full min-h-[11.5rem] flex-col rounded-2xl border border-moss/14 bg-oatmeal-muted/45 p-5 text-center shadow-sm ring-0 transition-all duration-200 ease-out " +
  "hover:-translate-y-0.5 hover:border-sage/45 hover:bg-gradient-to-br hover:from-ochre-soft/35 hover:via-oatmeal-muted/90 hover:to-sage-soft/25 hover:shadow-[0_14px_32px_-10px_rgba(45,54,45,0.2)] " +
  "active:translate-y-0 active:scale-[0.99] active:shadow-sm active:brightness-[0.98] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage " +
  "sm:min-h-[12rem] sm:p-6 md:p-7";

export default function Home() {
  return (
    <div className="bg-oatmeal text-moss">
      {/* Toppbilde */}
      <section
        className="px-4 pb-2 pt-4 sm:px-5 sm:pt-6 md:px-6 md:pb-3 md:pt-8"
        aria-label="Illustrasjon fra gården"
      >
        <div className="mx-auto w-full max-w-4xl">
          <figure className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-md ring-1 ring-moss/10 sm:aspect-[2/1] sm:rounded-[1.65rem] md:aspect-[2.15/1] md:rounded-[2rem]">
            <Image
              src="/images/gardvinter.jpg"
              alt="Natlandsmyren om vinteren"
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 896px) 95vw, 896px"
              priority
            />
          </figure>
        </div>
      </section>

      {/* Tittel & intro */}
      <header className="mx-auto max-w-xl px-4 pb-12 pt-8 text-center sm:px-5 sm:pb-14 sm:pt-10 md:max-w-2xl md:px-6 md:pb-16 md:pt-11">
        <h1 className="font-sans text-[clamp(1.75rem,4.5vw,2.5rem)] font-light tracking-[0.03em] text-moss">
          Natlandsmyren
        </h1>
        <div className="mx-auto mt-6 h-px w-10 bg-gradient-to-r from-transparent via-ochre/60 to-transparent sm:mt-7" aria-hidden />
        <p className="mt-6 text-sm leading-relaxed text-moss-muted sm:mt-7 sm:text-base sm:leading-relaxed">
          Hobbygård ved myren. Sau, bier og høner.
        </p>
      </header>

      {/* Tre klikkbare fliser */}
      <section
        className="border-t border-moss/10 px-4 py-12 sm:px-5 md:px-6 md:py-14"
        aria-labelledby="drift-tittel"
      >
        <h2 id="drift-tittel" className="sr-only">
          Birøktning, sauehold og hønsehold
        </h2>
        <ul className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {fliser.map(({ tittel, beskrivelse, ikon: Ikon, href }) => (
            <li key={tittel} className="flex min-h-0">
              <Link href={href} className={flisLinkClass}>
                <div className="mx-auto flex text-terra transition duration-200 group-hover:scale-110 group-hover:text-ochre group-active:scale-105">
                  <Ikon
                    className="h-8 w-8 sm:h-9 sm:w-9"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <span className="mt-4 font-display text-base font-medium tracking-tight text-moss group-hover:text-sage-dark sm:mt-5 sm:text-lg">
                  {tittel}
                </span>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-moss-muted sm:text-sm">
                  {beskrivelse}
                </p>
                <span className="mt-4 inline-flex items-center justify-center rounded-full bg-sage-soft/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-sage-dark transition group-hover:bg-ochre-soft/80 group-hover:text-moss">
                  Les mer
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Historie */}
      <section
        className="border-t border-moss/10 px-4 py-14 sm:px-5 md:px-6 md:py-20"
        aria-labelledby="historie-tittel"
      >
        <div className="mx-auto w-fit rounded-2xl border border-sage/25 bg-gradient-to-b from-oatmeal-muted/90 to-sage-soft/20 p-5 shadow-sm ring-1 ring-moss/5 sm:p-7 md:p-9">
          <div className="relative mx-auto h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48">
            <Image
              src="/images/emblem.jpg"
              alt="Emblem for Natlandsmyren"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 144px, 192px"
            />
          </div>
        </div>
        <h2
          id="historie-tittel"
          className="mt-8 font-display text-lg font-medium tracking-tight text-moss sm:mt-10 sm:text-xl md:text-2xl"
        >
          Historien
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-moss-muted sm:max-w-md sm:text-base">
          Årstall og minner samlet på egen side.
        </p>
        <Link
          href="/historie"
          className="mt-6 inline-flex min-h-11 min-w-[8.5rem] items-center justify-center rounded-full border-2 border-terra/35 bg-oatmeal px-5 py-2.5 text-sm font-medium text-terra shadow-sm transition-all duration-200 hover:border-ochre/50 hover:bg-gradient-to-b hover:from-ochre-soft/40 hover:to-oatmeal-muted/80 hover:shadow-md active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage sm:mt-7"
        >
          Historie
        </Link>
      </section>

      {/* Kontakt */}
      <section
        className="border-t border-moss/10 px-4 py-12 text-center sm:px-5 md:px-6 md:py-16"
        aria-labelledby="kontakt-tittel"
      >
        <h2
          id="kontakt-tittel"
          className="font-display text-base font-medium text-moss sm:text-lg md:text-xl"
        >
          Kontakt
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-moss-muted sm:max-w-sm sm:text-base">
          Spørsmål? Send en melding.
        </p>
        <Link
          href="/kontakt"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-b from-terra to-sage-dark px-8 py-2.5 text-sm font-medium text-oatmeal shadow-md transition-all duration-200 hover:from-terra-light hover:to-sage hover:shadow-lg active:scale-[0.98] active:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
        >
          Kontakt
        </Link>
      </section>
    </div>
  );
}

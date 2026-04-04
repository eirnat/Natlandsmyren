import Image from "next/image";
import Link from "next/link";
import { IconBie, IconHone, IconSau } from "./components/GardDyrIkoner";

export default function Home() {
  return (
    <div className="bg-oatmeal text-moss">
      {/* Toppbilde */}
      <section className="px-4 pb-2 pt-6 md:px-6 md:pb-4 md:pt-8" aria-label="Illustrasjon fra gården">
        <div className="mx-auto max-w-4xl">
          <figure className="relative aspect-[2/1] w-full overflow-hidden rounded-[1.75rem] shadow-sm ring-1 ring-moss/8 sm:aspect-[2.1/1] md:rounded-[2rem] md:aspect-[2.2/1]">
            <Image
              src="/images/gardvinter.jpg"
              alt="Natlandsmyren om vinteren"
              fill
              className="object-cover object-center"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </figure>
        </div>
      </section>

      {/* Tittel & intro */}
      <header className="px-4 pb-16 pt-10 text-center md:px-6 md:pb-20 md:pt-12">
        <h1 className="font-sans text-[clamp(2rem,5vw,2.75rem)] font-light tracking-[0.04em] text-moss">
          natlandsmyren
        </h1>
        <div
          className="mx-auto mt-8 h-px w-12 bg-ochre/45"
          aria-hidden
        />
        <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-moss-muted md:max-w-lg md:text-lg md:leading-relaxed">
          Gården ligger på myra. Det er ikke bare et stedsnavn – myr og våtmark
          preger både beite, planter og humøret i hverdagen. Vi driver smått,
          men med omtanke for det landskapet vi er en del av.
        </p>
      </header>

      {/* Sauene */}
      <section
        className="border-t border-moss/8 px-4 py-14 text-center md:px-6 md:py-20"
        aria-labelledby="sau-tittel"
      >
        <div className="mx-auto flex justify-center text-terra">
          <IconSau className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.5} aria-hidden />
        </div>
        <h2
          id="sau-tittel"
          className="mt-6 font-display text-xl font-medium tracking-tight text-moss md:text-2xl"
        >
          Sauene
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-moss-muted md:max-w-lg md:text-base md:leading-relaxed">
          Sau på beite rundt gården og ut mot myrkanten. Vi legger vekt på rolig
          gang, nok beite og tilsyn – landskapet rundt får være med å bestemme
          tempoet.
        </p>
      </section>

      {/* Biene */}
      <section
        className="border-t border-moss/8 px-4 py-14 text-center md:px-6 md:py-20"
        aria-labelledby="bie-tittel"
      >
        <div className="mx-auto flex justify-center text-terra">
          <IconBie className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.5} aria-hidden />
        </div>
        <h2
          id="bie-tittel"
          className="mt-6 font-display text-xl font-medium tracking-tight text-moss md:text-2xl"
        >
          Biene
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-moss-muted md:max-w-lg md:text-base md:leading-relaxed">
          Bikuber på tunet gir honning når året tillater det. Pollinering henger
          naturlig sammen med alt som gror i hagkanten og langs myra – vi prøver
          ikke å presse mer ut enn naturen rekker.
        </p>
      </section>

      {/* Hønene */}
      <section
        className="border-t border-moss/8 px-4 py-14 text-center md:px-6 md:py-20"
        aria-labelledby="hone-tittel"
      >
        <div className="mx-auto flex justify-center text-terra">
          <IconHone className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.5} aria-hidden />
        </div>
        <h2
          id="hone-tittel"
          className="mt-6 font-display text-xl font-medium tracking-tight text-moss md:text-2xl"
        >
          Hønene
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-moss-muted md:max-w-lg md:text-base md:leading-relaxed">
          Høner som får gå løst i hagen. Egg til huset, litt rot i bedene og
          liv i tunet. En enkel ordning som passer oss – ikke mer styr enn vi
          orker å følge opp.
        </p>
      </section>

      {/* Historie */}
      <section
        className="border-t border-moss/8 px-4 py-16 text-center md:px-6 md:py-24"
        aria-labelledby="historie-tittel"
      >
        <div className="mx-auto w-fit rounded-[1.35rem] border border-terra/25 bg-oatmeal-muted/80 p-6 shadow-sm ring-1 ring-moss/5 md:p-10">
          <div className="relative mx-auto h-44 w-44 sm:h-52 sm:w-52 md:h-56 md:w-56">
            <Image
              src="/images/emblem.jpg"
              alt="Emblem for Natlandsmyren"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 176px, 224px"
            />
          </div>
        </div>
        <h2
          id="historie-tittel"
          className="mt-10 font-display text-xl font-medium tracking-tight text-moss md:mt-12 md:text-2xl"
        >
          Historien
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-moss-muted md:max-w-lg md:text-base md:leading-relaxed">
          Gården har vært i bruk lenge. Vi har samlet det vi vet – årstall,
          bygninger og minner – på en egen side, så du kan lese i ro og mak.
        </p>
        <Link
          href="/historie"
          className="mt-8 inline-block text-sm font-medium text-terra underline decoration-terra/35 underline-offset-4 transition hover:decoration-terra"
        >
          Les mer om historien
        </Link>
      </section>

      {/* Kontakt */}
      <section
        className="border-t border-moss/8 px-4 py-14 text-center md:px-6 md:py-20"
        aria-labelledby="kontakt-tittel"
      >
        <h2
          id="kontakt-tittel"
          className="font-display text-lg font-medium text-moss md:text-xl"
        >
          Kontakt
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-moss-muted md:max-w-md md:text-base">
          Har du spørsmål om gården, dyra eller historien, er det bare å ta
          kontakt.
        </p>
        <Link
          href="/kontakt"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-terra px-7 py-2.5 text-sm font-medium text-oatmeal transition hover:bg-terra-light"
        >
          Til kontaktsiden
        </Link>
      </section>
    </div>
  );
}

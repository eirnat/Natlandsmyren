import Image from "next/image";
import Link from "next/link";

const fliser: {
  tittel: string;
  beskrivelse: string;
  href: string;
  figur: string;
}[] = [
  {
    tittel: "Birøkt",
    beskrivelse:
      "Honning med karakter, hentet hjem fra kubene på Natlandsmyren.",
    figur: "/images/bie.svg",
    href: "/birøkt",
  },
  {
    tittel: "Hønsehold",
    beskrivelse:
      "Ferske gårdsegg fra hønene på tunet – hver dag, rett fra huset. Frittgående høner som trives ute.",
    figur: "/images/høne.svg",
    href: "/hønsehold",
  },
  {
    tittel: "Sauehold",
    beskrivelse:
      "Gammelnorsk spælsau – robuste sauer som kjenner myra og holder landskapet i form, beite for beite.",
    figur: "/images/sau.svg",
    href: "/sauehold",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
          <div
            className="absolute inset-0 z-[1] bg-black/60 sm:bg-black/58"
            aria-hidden
          />
          <div className="absolute inset-0 z-[2] flex items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16">
            <h1
              id="hero-heading"
              className="max-w-5xl text-center font-sans text-[clamp(1.875rem,5.5vw+0.5rem,3rem)] font-black leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.75)] sm:text-[clamp(2.125rem,5vw+0.75rem,3.5rem)] md:text-[clamp(2.5rem,4vw+1rem,4rem)] lg:text-6xl lg:leading-[1.06] xl:text-7xl"
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
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-6 md:gap-8">
            {fliser.map(({ tittel, beskrivelse, href, figur }) => (
              <li key={tittel}>
                <Link
                  href={href}
                  className="group flex min-h-[18rem] flex-col items-center rounded-2xl border-2 border-moss bg-card px-5 py-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out hover:border-moss hover:bg-moss hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-moss sm:min-h-[19rem] sm:px-6 sm:py-9"
                >
                  <Image
                    src={figur}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 object-contain"
                    aria-hidden
                  />
                  <span className="mt-5 text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-white">
                    {tittel}
                  </span>
                  <span className="mt-3 max-w-[22rem] text-sm font-medium leading-relaxed text-foreground transition-colors duration-300 group-hover:text-white sm:max-w-none">
                    {beskrivelse}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Historie – statement */}
        <section
          className="mt-16 overflow-hidden rounded-2xl border-2 border-moss bg-card shadow-[0_16px_48px_rgba(0,0,0,0.2)] sm:mt-20 md:mt-24 lg:grid lg:grid-cols-2 lg:items-stretch"
          aria-labelledby="historie-heading"
        >
          <div className="flex flex-col justify-center p-8 text-center sm:p-10 md:p-12 lg:p-14 lg:text-left">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-moss">
              Historie
            </p>
            <h2
              id="historie-heading"
              className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Historien om Natlandsmyr
            </h2>
            <p className="mt-8 text-base font-medium leading-relaxed text-foreground sm:text-lg sm:leading-relaxed">
              Gården Natlandsmyr var opprinnelig en husmannsplass under gården
              Nedre Natland, og ble opprettet i ca. 1750.
            </p>
            <p className="mt-5 text-base font-medium leading-relaxed text-foreground sm:text-lg sm:leading-relaxed">
              I 1751 ble plassen kalt Dalen. Navnet Myren har også vært benyttet
              på plassen. Det sies at eierne av Nedre Natland anla bl.a.
              husmannsplassene Natlandsmyr, Tøshaugen, Fagerbakken og Roligheten
              i søre del av eiendommen for å hevde eiendomsgrensen mot Sandalen,
              da her tidligere hadde vært uenighet om denne grensen.
            </p>
            <p className="mt-5 text-base font-medium leading-relaxed text-foreground sm:text-lg sm:leading-relaxed">
              Natlandsmyr ble utskilt som eget bruk i 1841, og året etter, i 1842
              ble gården kjøpt av Ole Monsen Skåldal, som er tipp, tipp oldefar
              til dagens eier.
            </p>
            <p className="mt-6 text-base font-medium leading-relaxed text-foreground sm:text-lg">
              Les mer på{" "}
              <Link
                href="/historie"
                className="font-bold text-moss underline decoration-moss decoration-4 underline-offset-[5px] transition hover:text-foreground hover:decoration-foreground"
              >
                historie-siden
              </Link>
              .
            </p>
          </div>
          <div className="relative min-h-[280px] w-full border-t-2 border-moss bg-cream-deep sm:min-h-[300px] md:min-h-[320px] lg:min-h-0 lg:h-full lg:border-l-2 lg:border-t-0">
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

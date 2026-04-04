import Link from "next/link";
import { GARD_NAVN } from "./lib/gard";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
      {/* Hero */}
      <section
        className="rounded-[2rem] border border-sage-soft/70 bg-gradient-to-br from-cream-muted via-cream to-honey-soft/25 p-10 shadow-sm shadow-sage/10 md:p-14 lg:p-20"
        aria-labelledby="hero-title"
      >
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-sage-dark/80">
          Hobbygård
        </p>
        <h1
          id="hero-title"
          className="font-display text-center text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl lg:text-[2.75rem] lg:leading-snug"
        >
          Velkommen til {GARD_NAVN}
          <span className="mt-3 block text-2xl font-medium text-sage-dark md:text-3xl lg:text-[2.1rem]">
            – et sted for tradisjon og glede
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-ink-muted md:text-xl">
          Her dyrker vi smått med stor omtanke – dyr, historie og fellesskap i
          et rolig tempo.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/dyrene"
            className="rounded-full bg-sage px-6 py-3 text-sm font-semibold text-cream shadow-sm transition hover:bg-sage-dark"
          >
            Møt dyrene
          </Link>
          <Link
            href="/kontakt"
            className="rounded-full border-2 border-honey/60 bg-cream/80 px-6 py-3 text-sm font-semibold text-honey transition hover:border-honey hover:bg-honey-soft/40"
          >
            Ta kontakt
          </Link>
        </div>
      </section>

      {/* Innhold med bilde + tekst – luftig */}
      <section className="mt-16 md:mt-24" aria-labelledby="intro-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div
            className="farm-img relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-sage-soft/50 bg-gradient-to-br from-sage-soft via-cream-muted to-honey-soft/40 shadow-inner"
            role="img"
            aria-label="Plassholder for bilde fra gården"
          >
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <p className="font-display text-lg text-sage-dark/70 md:text-xl">
                Bilde fra gården kommer her
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-cream-deep bg-cream-muted/40 p-8 md:p-10">
            <h2
              id="intro-heading"
              className="font-display text-2xl font-semibold text-sage-dark md:text-3xl"
            >
              Liv på landet
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
              Vi ønsker å dele litt av hverdagen vår – fra beite og stall til
              årstider som skifter. Nettsiden er en enkel vindu inn, med plass
              til både fakta og fortellinger.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              Utforsk{" "}
              <Link href="/historie" className="font-medium text-sage underline-offset-2 hover:underline">
                historien
              </Link>{" "}
              vår, eller{" "}
              <Link href="/dyrene" className="font-medium text-sage underline-offset-2 hover:underline">
                dyrene
              </Link>{" "}
              som gjør gården levende.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

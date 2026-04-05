"use client";

import Link from "next/link";
import { Bird, BugBeetle, Cloud } from "phosphor-react";
import type { Icon } from "phosphor-react";

const aktiviteter: {
  tittel: string;
  beskrivelse: string;
  ikon: Icon;
  href: string;
}[] = [
  {
    tittel: "Birøkt",
    beskrivelse: "Honning og bikuber.",
    ikon: BugBeetle,
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

export function AktivitetFliser() {
  return (
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
                className="shrink-0 text-[#6b5c4a]"
                size={40}
                weight="duotone"
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
  );
}

import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { FarmFooter } from "./components/FarmFooter";
import { FarmHeader } from "./components/FarmHeader";
import { GARD_NAVN } from "./lib/gard";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: `${GARD_NAVN} – hobbygård`,
  description: `Velkommen til ${GARD_NAVN} – et sted for tradisjon og glede.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col font-sans text-ink antialiased">
        <FarmHeader />
        <main className="flex-1">{children}</main>
        <FarmFooter />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { FarmFooter } from "./components/FarmFooter";
import { SiteTopBar } from "./components/SiteTopBar";
import { GARD_NAVN } from "./lib/gard";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["200", "300", "400", "500", "600", "700"],
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
      <body className="flex min-h-screen flex-col bg-oatmeal font-sans text-moss antialiased">
        <SiteTopBar />
        <main className="flex-1">{children}</main>
        <FarmFooter />
      </body>
    </html>
  );
}

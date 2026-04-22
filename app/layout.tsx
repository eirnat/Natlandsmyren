import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ConditionalFooter } from "./components/ConditionalFooter";
import { GARD_NAVN } from "./lib/gard";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700", "800", "900"],
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
    <html lang="no" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <main className="flex-1">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}

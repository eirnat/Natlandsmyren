import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import { ConditionalFooter } from "./components/ConditionalFooter";
import { ConditionalNav } from "./components/ConditionalNav";
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: ["400", "500"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Velkommen til Natlandsmyren",
  description:
    "Opplev livet på Natlandsmyren – birøkt, sauehold og lokalproduserte varer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className={`${karla.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <ConditionalNav />
        <main className="flex-1">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}

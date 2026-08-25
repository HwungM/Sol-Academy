import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sol Academy — Memecoin Market Literacy",
  description:
    "An evidence-first academy for Solana memecoin mechanics, wallet forensics, risk, execution, and VOD study.",
  openGraph: {
    title: "Sol Academy — Memecoin Market Literacy",
    description:
      "Read the market. Then build the machine. An evidence-first path to Solana memecoin literacy.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sol Academy — Read the market. Then build the machine.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sol Academy — Memecoin Market Literacy",
    description: "Read the market. Then build the machine.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${instrumentSans.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

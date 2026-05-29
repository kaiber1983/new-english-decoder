import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Logic English Decoder",
    template: "%s | Logic English Decoder",
  },
  description:
    "Turn elite English into people's English with transparent word logic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#fffdf7] text-stone-950">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FamilyFlow — Less scrolling. More living together.",
  description:
    "Family adventures on the living-room screen and Alexa, with every sensitive step approved by a parent. Parents only see FamilyFlow activity.",
  openGraph: {
    title: "FamilyFlow",
    description: "Less scrolling. More living together.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#25402a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

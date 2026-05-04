import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OMXAI — Ship production AI in 90 days, keep the code.",
  description:
    "Builder-focused AI venture studio. Fixed timelines, weekly demos, full code transfer at handover. No vendor lock-in.",
  metadataBase: new URL("https://omxai.com"),
  openGraph: {
    title: "OMXAI — Ship production AI in 90 days, keep the code.",
    description:
      "Builder-focused AI venture studio. Fixed timelines, weekly demos, full code transfer at handover.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeSwitcher from "./components/ThemeSwitcher";

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

// Inline script: read theme from localStorage and apply BEFORE first paint
// to avoid flash of unstyled / wrong theme. Whitelist keeps this safe.
const themeBootstrap = `
(function(){try{
  var t=localStorage.getItem('omxai-theme');
  var ok=['dark','light','midnight','obsidian','ember','paper'];
  if(t&&ok.indexOf(t)>-1){document.documentElement.setAttribute('data-theme',t);}
  else{document.documentElement.setAttribute('data-theme','dark');}
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        <ThemeSwitcher />
      </body>
    </html>
  );
}

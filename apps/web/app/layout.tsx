import type { Metadata } from "next";
import { Fredoka, Geist_Mono, Plus_Jakarta_Sans, Readex_Pro } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AppChrome } from "@/components/layout/app-chrome";

const readex = Readex_Pro({
  variable: "--font-readex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adoptme.example.com"),
  title: {
    default: "AdoptMe — Global Pet & Animal Marketplace",
    template: "%s · AdoptMe",
  },
  description:
    "Buy, sell, exchange, and adopt animals responsibly. Donations, escrow-protected checkout, and enterprise-grade trust tooling.",
  openGraph: {
    title: "AdoptMe — Global Pet & Animal Marketplace",
    description: "Premium marketplace with escrow, adoption workflows, and welfare donations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${readex.variable} ${fredoka.variable} ${geistMono.variable} ${plusJakarta.variable} min-h-screen bg-background antialiased`}
      >
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}

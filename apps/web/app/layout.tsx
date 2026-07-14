import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AppChrome } from "@/components/layout/app-chrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} min-h-screen bg-background antialiased`}>
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}

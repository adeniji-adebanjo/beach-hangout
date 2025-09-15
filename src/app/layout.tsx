import type { Metadata } from "next";
import { Courgette, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ScrollButton from "@/components/ScrollToTop";

const courgette = Courgette({
  variable: "--font-courgette",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NLWC Ikorodu Beach Hangout",
  description: "Beach hangout is here again...",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head />
      <body className={`${courgette.variable} ${inter.variable} antialiased`}>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3BBYKTF461"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3BBYKTF461');
          `}
        </Script>

        {children}
        <ScrollButton />
      </body>
    </html>
  );
}

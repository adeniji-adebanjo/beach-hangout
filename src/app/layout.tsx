import type { Metadata } from "next";
import { Courgette, Inter } from "next/font/google";
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
      <body className={`${courgette.variable} ${inter.variable} antialiased`}>
        {children}
        <ScrollButton />
      </body>
    </html>
  );
}

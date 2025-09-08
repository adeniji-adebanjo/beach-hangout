import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NLWC Ikorodu Beach Hangout",
  description:
    "That time of the year for this beautiful family of God is drawing near. The time to relax, unwind and have fun with each other. The time to create memories that will last a lifetime. The time to connect with nature and enjoy the beauty of God's creation. The time to bond with friends and family over good food, music, and laughter. Yes, it's that time of the year again for NLWC Ikorodu Beach Hangout 2024! Join us for an unforgettable experience filled with joy, love, and fellowship. Let's make this year's beach hangout the best one yet!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

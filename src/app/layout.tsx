import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Prithvi Resorts & Hotels",
  description: "Located between Phillaur and Goraya in Jalandhar district of Punjab, Prithvi Resorts & Hotels is the top choice for a luxurious marriage palace and hotel experience. Ideal for weddings, events, and comfortable stays with exceptional amenities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-Playfair`}
      >
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}

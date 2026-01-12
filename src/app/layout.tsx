import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/layout/LoadingScreen";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#4A6741",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://annurkarahagung.com'), // Placeholder URL
  title: "An Nur Karah Agung | Travel Umrah & Haji Surabaya",
  description: "Biro perjalanan umrah dan haji resmi Kemenag (PPIU No. U.300 Th 2021) di Surabaya. Amanah, profesional, dan membimbing sesuai sunnah.",
  keywords: ["Umrah Surabaya", "Travel Umrah Amanah", "Haji Plus Surabaya", "KBIH An Nur", "Umrah Sesuai Sunnah", "Travel Umrah Berizin Resmi"],
  authors: [{ name: "An Nur Karah Agung" }],
  openGraph: {
    title: "An Nur Karah Agung | Wujudkan Rindu Ke Baitullah",
    description: "Mitra perjalanan ibadah Umrah & Haji yang Amanah, Nyaman, dan Sesuai Sunnah.",
    siteName: "An Nur Karah Agung",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${outfit.variable} ${inter.variable} font-sans antialiased`}>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/pages/components/Footer";
import Header from "@/pages/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FoodSide | Highway Food Delivery Platform by Bollineni Ventures",
  description:
    "FoodSide helps travelers order fresh food from trusted highway restaurants across India. Pre-order meals and enjoy seamless highway dining experience.",

  keywords: [
    "FoodSide",
    "Bollineni Ventures",
    "highway food delivery",
    "travel food India",
    "road trip food",
    "highway restaurants",
  ],

  metadataBase: new URL("https://foodside.co.in"),
  // ✅ CANONICAL URL
  alternates: {
    canonical: "https://foodside.co.in",
  },
  openGraph: {
    title: "FoodSide | Highway Food Delivery Platform",
    description:
      "Order fresh highway food online with FoodSide by Bollineni Ventures.",
    url: "https://foodside.co.in",
    siteName: "FoodSide",
    images: [
      {
        url: "https://foodside.co.in/logo_foodeside.png",
        width: 1200,
        height: 630,
        alt: "FoodSide Highway Food Delivery",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FoodSide | Highway Food Delivery Platform",
    description:
      "Order fresh food from trusted highway restaurants across India.",
    images: ["https://foodside.co.in/logo_foodeside.png"],
  },

  icons: {
    icon: "https://foodside.co.in/logo_foodeside.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
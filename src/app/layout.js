import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/pages/components/Header";
import Footer from "@/pages/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />   {/* ✅ Common Header */}
        
        <main className="flex-1">
          {children} {/* ✅ Page content */}
        </main>
        
        <Footer />   {/* ✅ Common Footer */}
      </body>
    </html>
  );
}
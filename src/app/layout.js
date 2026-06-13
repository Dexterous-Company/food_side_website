import "./globals.css";
import ReduxLayoutProviders from "@/views/Mainlayout/ReduxLayoutProviders";
import ClientLayout from "@/views/Mainlayout/ClientLayout";
export const viewport = {
  // themeColor: "#FF581B",
  themeColor: "#f2f2f2",
};
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
        url: "https://foodside.co.in/main_log_fd.png",
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
    images: ["https://foodside.co.in/main_log_fd.png"],
  },
  icons: {
    icon: [{ url: "/logo_foodeside.png", type: "image/png" }],
  },
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ReduxLayoutProviders>
          <ClientLayout>{children}</ClientLayout>
        </ReduxLayoutProviders>
      </body>
    </html>
  );
}

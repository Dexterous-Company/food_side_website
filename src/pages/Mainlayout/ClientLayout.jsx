"use client";

import { usePathname } from "next/navigation";
import Header from "@/pages/components/Header";
import Footer from "@/pages/components/Footer";
import ReduxLayoutProviders from "@/pages/Mainlayout/ReduxLayoutProviders";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Routes where Header/Footer should be hidden
  const hideHeaderRoutes = ["/login", "/sign-up", "/register"];
  const hideFooterRoutes = ["/login", "/sign-up", "/register"];

  const hideHeader = hideHeaderRoutes.includes(pathname);
  const hideFooter = hideFooterRoutes.includes(pathname);

  return (
    <ReduxLayoutProviders>
      {!hideHeader && <Header />}

      <main className="flex-1">{children}</main>

      {!hideFooter && <Footer />}
    </ReduxLayoutProviders>
  );
}

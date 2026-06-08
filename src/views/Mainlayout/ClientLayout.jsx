"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "@/views/components/Header";
import Footer from "@/views/components/Footer";
import FloatingCartBanner from "../cart/FloatingCartBanner";
import { useCart } from "../../context/CartContext";
import MobileFooter from "../home/MobileFooter";
import { useEffect, useState } from "react";

const BANNER_ENABLED_ROUTES = [
  "/",
  "/favorites",
  "/dining",
  "/restaurant",
  "/SearchResult",
  "/product",
];

const BOTTOM_10_ROUTES = ["/restaurant", "/SearchResult", "/product"];

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // useCart now returns safe fallback during SSR
  const { cartSummary, clearCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Desktop control
  const hideHeaderRoutes = ["/login", "/sign-up", "/register"];
  const hideFooterRoutes = ["/login", "/sign-up", "/register"];

  const hideHeader = hideHeaderRoutes.includes(pathname);
  const hideFooter = hideFooterRoutes.includes(pathname);

  // Mobile control
  const hideHeaderMobileRoutes = ["/cart"];
  const hideFooterMobileRoutes = [];

  const hideHeaderMobile = hideHeaderMobileRoutes.includes(pathname);
  const hideFooterMobile = hideFooterMobileRoutes.includes(pathname);

  // Banner
  const shouldShowBanner = BANNER_ENABLED_ROUTES.includes(pathname);
  const useBottom10 = BOTTOM_10_ROUTES.includes(pathname);
  const bottomOffset = useBottom10 ? 10 : undefined;

  // Only show cart banner after mount and when cart has items
  const showCartBanner = isMounted && shouldShowBanner && cartSummary;

  return (
    <>
      {/* Desktop Header */}
      {!hideHeader && (
        <div className="hidden sm:block">
          <Header />
        </div>
      )}

      {/* Mobile Header */}
      {!hideHeaderMobile && (
        <div className="block sm:hidden">
          <Header />
        </div>
      )}

      {/* Main */}
      <main className="flex-1 pt-2 md:pt-15">{children}</main>

      {showCartBanner && (
        <div className="block md:hidden">
          <FloatingCartBanner
            visible={!!cartSummary}
            restaurantName={cartSummary?.restaurant?.title}
            restaurantImage={cartSummary?.restaurant?.products?.[0]?.image}
            totalItems={cartSummary?.totalItems}
            totalPrice={cartSummary?.totalPrice}
            bottomOffset={bottomOffset}
            onPressMenu={() => {
              if (cartSummary?.restaurant) {
                router.push("/restaurant-page");
              }
            }}
            onPressCart={() => router.push("/cart")}
            onPressClear={clearCart}
          />
        </div>
      )}

      {/* Desktop Footer */}
      <div className="hidden sm:block">{!hideFooter && <Footer />}</div>

      {/* Mobile Footer */}
      <div className="block sm:hidden">
        {!hideFooterMobile && <MobileFooter />}
      </div>
    </>
  );
}

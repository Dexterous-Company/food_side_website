"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "@/pages/components/Header";
import Footer from "@/pages/components/Footer";
import FloatingCartBanner from "../cart/FloatingCartBanner";
import { useCart } from "../../context/CartContext";
import MobileFooter from "../home/MobileFooter";

// ✅ Same like RN
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

  // ✅ NOW SAFE
  const { cartSummary, clearCart } = useCart();

  // Header/Footer logic
  const hideHeaderRoutes = ["/login", "/sign-up", "/register"];
  const hideFooterRoutes = ["/login", "/sign-up", "/register"];

  const hideHeader = hideHeaderRoutes.includes(pathname);
  const hideFooter = hideFooterRoutes.includes(pathname);

  // Banner logic
  const shouldShowBanner = BANNER_ENABLED_ROUTES.includes(pathname);
  const useBottom10 = BOTTOM_10_ROUTES.includes(pathname);
  const bottomOffset = useBottom10 ? 10 : undefined;

  return (
    <>
      {!hideHeader && <Header />}

      <main className={`flex-1 ${!hideHeader ? "mt-15" : "mt-0"}`}>
        {children}
      </main>

      {/* ✅ Floating Banner */}
      {shouldShowBanner && (
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
      )}
      <div className="sm:block hidden">{!hideFooter && <Footer />}</div>
      <div className="sm:hidden block">{!hideFooter && <MobileFooter />}</div>
    </>
  );
}

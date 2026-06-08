"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IoHome, IoPersonOutline } from "react-icons/io5";
import { MdRestaurant } from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FiBox } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function MobileFooter() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.Authentication.isUserAuth);
  const isDestinationSet = useSelector((state) => state.delivery.isDestinationSet);
  const isRouteSelected = useSelector((state) => state.delivery.isRouteSelected);
  const isDeliveryPointSelected = useSelector((state) => state.delivery.isDeliveryPointSelected);
  const hasDeliveryData = isDestinationSet || isRouteSelected || isDeliveryPointSelected;
  const orders = useSelector((state) => state.order?.orders || []);
  const hasOrders = orders && orders.length > 0;
  const { cartList } = useCart();
  const cartCount = useMemo(() => {
    if (!cartList || cartList.length === 0) return 0;
    return cartList.reduce((sum, item) => sum + (item.qty || item.quantity || 1), 0);
  }, [cartList]);

  // Menu items with access requirements
  const menuItems = [
    {
      key: "home",
      route: "/",
      label: "Home",
      icon: IoHome,
      requiresAuth: false,
      requiresDeliveryData: false,
    },
    {
      key: "dining",
      route: "/dining",
      label: "Dining",
      icon: MdRestaurant,
      requiresAuth: false,
      requiresDeliveryData: true,
      authMessage: "Please select a delivery route first",
    },
    {
      key: "cart",
      route: "/cart",
      label: "Cart",
      icon: PiShoppingCartSimpleBold,
      requiresAuth: false,
      requiresDeliveryData: true,
      authMessage: "Please select a delivery route first",
    },
    {
      key: "orders",
      route: "/accounts/orders",
      label: "Orders",
      icon: FiBox,
      requiresAuth: true,
      requiresDeliveryData: false,
      authMessage: "Please login to view orders",
    },
    {
      key: "profile",
      route: "/accounts",
      label: "Profile",
      icon: IoPersonOutline,
      requiresAuth: true,
      requiresDeliveryData: false,
      authMessage: "Please login to view profile",
    },
  ];

  // Show toast notification
  const showToast = (message) => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'fixed flex justify-center items-center top-20 w-full left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-[100] text-sm font-medium';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // Handle menu item click
  const handleMenuClick = (item, e) => {
    // For orders - check if there are any orders first
    if (item.key === "orders") {
      if (!hasOrders) {
        e.preventDefault();
        showToast("Please select routes and order to see your orders here.");
        return false;
      }
    }
    
    // Check authentication requirement for profile and orders
    if (item.requiresAuth && !isLoggedIn) {
      e.preventDefault();
      if (item.key === "orders") {
        showToast("Please select routes and order to see your orders here.");
      } else {
        router.push('/login');
      }
      return false;
    }
    
    // Check delivery data requirement
    if (item.requiresDeliveryData && !hasDeliveryData) {
      e.preventDefault();
      showToast(item.authMessage || "Please select a delivery route first");
      return false;
    }
    
    // For cart, also check if there are items
    if (item.key === "cart" && cartCount === 0 && !hasDeliveryData) {
      e.preventDefault();
      showToast("Please add items to cart or select a delivery route");
      return false;
    }
    
    return true;
  };

  const activeIndex = Math.max(
    menuItems.findIndex((item) => item.route === pathname),
    0,
  );

  const svgPath = useMemo(() => {
    const width = 1000;
    const height = 56;

    const itemWidth = width / menuItems.length;
    const center = itemWidth * activeIndex + itemWidth / 2;

    // Smooth C-shaped curve
    const notchWidth = 95;
    const notchDepth = 18;

    return `
      M0 8
      Q0 0 8 0

      L${center - notchWidth} 0

      C${center - 55} 0,
       ${center - 35} ${notchDepth},
       ${center} ${notchDepth}

      C${center + 35} ${notchDepth},
       ${center + 55} 0,
       ${center + notchWidth} 0

      L${width - 8} 0

      Q${width} 0 ${width} 8

      L${width} ${height}
      L0 ${height}
      Z
    `;
  }, [activeIndex, menuItems.length]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="relative h-14">
        {/* SVG Background */}
        <svg
          viewBox="0 0 1000 56"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path d={svgPath} fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
        </svg>

        {/* Active Floating Button */}
        <div
          className="absolute -top-3 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-orange-500 shadow-lg transition-all duration-300"
          style={{
            left: `${(activeIndex + 0.5) * (100 / menuItems.length)}%`,
          }}
        >
          {(() => {
            const ActiveIcon = menuItems[activeIndex].icon;

            return <ActiveIcon size={18} className="text-white" />;
          })()}
        </div>

        {/* Menu */}
        <div className="relative z-10 flex h-full">
          {menuItems.map((item, index) => {
            const isActive = index === activeIndex;
            const Icon = item.icon;

            return (
              <Link
                key={item.key}
                href={item.route}
                onClick={(e) => handleMenuClick(item, e)}
                className="flex flex-1 flex-col items-center justify-center cursor-pointer"
              >
                {isActive ? (
                  <span className="mt-3 text-[10px] font-semibold text-green-700">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Icon size={18} className="text-gray-700" />

                    <span className="mt-0.5 text-[10px] font-medium text-gray-500">
                      {item.label}
                    </span>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

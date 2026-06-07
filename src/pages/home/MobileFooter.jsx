"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IoHome, IoPersonOutline } from "react-icons/io5";
import { MdRestaurant } from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FiBox } from "react-icons/fi";

export default function MobileFooter() {
  const pathname = usePathname();

  const menuItems = [
    {
      key: "home",
      route: "/",
      label: "Home",
      icon: IoHome,
    },
    {
      key: "dining",
      route: "/dining",
      label: "Dining",
      icon: MdRestaurant,
    },
    {
      key: "cart",
      route: "/cart",
      label: "Cart",
      icon: PiShoppingCartSimpleBold,
    },
    {
      key: "orders",
      route: "/orders",
      label: "Orders",
      icon: FiBox,
    },
    {
      key: "profile",
      route: "/profile",
      label: "Profile",
      icon: IoPersonOutline,
    },
  ];

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
                className="flex flex-1 flex-col items-center justify-center"
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

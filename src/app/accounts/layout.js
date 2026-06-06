"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/pages/components/accounts/Sidebar";

export default function Layout({ children }) {
  const pathname = usePathname();

  const isAccountHome = pathname === "/accounts";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:block h-full">
        <Sidebar />
      </div>

      {/* Mobile */}
      {isAccountHome && (
        <div className="lg:hidden w-full">
          <Sidebar />
        </div>
      )}

      {/* Content */}
      <div
        className={`${
          isAccountHome ? "hidden lg:block" : "block"
        } flex-1 overflow-y-auto p-2 md:p-3`}
      >
        {children}
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  RiUserLine,
  RiShoppingBagLine,
  RiNotification3Line,
  RiShieldLine,
  RiFileTextLine,
  RiQuestionLine,
  RiContactsLine,
  RiInformationLine,
  RiArrowRightSLine,
  RiCustomerService2Line,
  RiMessage2Line,
  RiShareForwardLine,
  RiPencilFill,
  RiRefund2Fill,
  RiShoppingCartLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import { FaQ } from "react-icons/fa6";
import { FcAbout, FcContacts, FcPrivacy } from "react-icons/fc";
import { GrReturn } from "react-icons/gr";
import { useSelector } from "react-redux";

const sidebarMenus = [
  {
    title: "Profile",
    href: "/accounts",
    icon: RiUserLine,
  },
  {
    title: "Orders",
    href: "/accounts/orders",
    icon: RiShoppingBagLine,
  },
  {
    title: "Notifications",
    href: "/accounts/notifications",
    icon: RiNotification3Line,
    badge: 6,
  },
  {
    title: "Privacy Policy",
    href: "/privacypolicy",
    icon: RiShieldLine,
  },
  {
    title: "Refund Policy",
    href: "/refundPolicy",
    icon: RiRefund2Fill,
  },
  {
    title: "Terms & Conditions",
    href: "/terms_conditions",
    icon: RiFileTextLine,
  },
  {
    title: "FAQs",
    href: "/accounts/faq",
    icon: RiQuestionLine,
  },
  {
    title: "Contact Us",
    href: "/contact_us",
    icon: RiContactsLine,
  },
  {
    title: "About Us",
    href: "/about_us",
    icon: RiInformationLine,
  },
];

function MobileMenuItem({ icon: Icon, title, href }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between py-3 text-black"
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-black" />
        <span className="text-[15px] font-bold">{title}</span>
      </div>

      <RiArrowRightSLine size={20} className="text-gray-400" />
    </Link>
  );
}

export default function ResponsiveProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { userData } = useSelector((state) => state.Authentication);
  const {
    email = "demo@gmail.com",
    name = "User",
    phone = "",
    profileImage,
  } = userData || {};

  const displayInitial = (name || "User").charAt(0).toUpperCase();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden h-fit lg:flex w-[250px] min-w-[250px] bg-white border-r border-gray-200 flex-col p-3 gap-2">
        <div className="bg-gradient-to-r from-[#F4B400] to-[#FF581B] rounded-xl p-2.5 flex items-center gap-2">
          <div className="w-[38px] h-[38px] rounded-full bg-white text-[#FF581B] flex items-center justify-center font-semibold text-sm">
            {displayInitial}
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold">{name}</h4>

            <p className="text-white/80 text-[10px]">{email}</p>
          </div>
        </div>

        <div className="space-y-1">
          {sidebarMenus.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  active ? "bg-orange-50 text-[#FF581B]" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={17} className="text-black" />
                  <span className="text-[13px] text-black font-bold">
                    {item.title}
                  </span>
                </div>

                {item.badge && (
                  <span className="h-5 w-5 rounded-full bg-[#FF581B] text-white text-[10px] flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-t-gray-300 mx-3" />

        <div className="px-3">
          <h3 className="font-bold text-[#0E8F48] text-sm">Download App</h3>

          <p className="text-[11px] text-gray-500">
            Get the app for a better experience
          </p>

          <div className="flex gap-2 mt-2">
            <Image
              src="/account/paly.png"
              alt=""
              width={85}
              height={28}
              className="rounded-sm"
            />

            <Image
              src="/account/store.png"
              alt=""
              width={85}
              height={28}
              className="rounded-sm"
            />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar - Fixed to work with /accounts/profile */}
      <div className="lg:hidden w-full bg-gray-100 ">
        <div className="bg-[#FF581B] h-24 relative">
          <div className="absolute top-0 left-0 right-0 px-4 pt-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full flex items-center justify-center"
            >
              <RiArrowLeftSLine size={20} className="text-white" />
            </button>

            <h1 className="text-white font-semibold text-base">My Profile</h1>

            <button
              onClick={() => router.push("/cart")}
              className="w-8 h-8 rounded-full flex items-center justify-center relative"
            >
              <RiShoppingCartLine size={18} className="text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 text-black text-[9px] rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </button>
          </div>
        </div>

        <div className="px-3 -mt-10 absolute z-50 w-full">
          <div className="bg-white rounded-3xl p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="relative h-20 w-20">
                  <Image
                    src={profileImage ? profileImage:`https://res.cloudinary.com/dssdvnei1/image/upload/v1779258906/user_profiles/ew3xtccbogfye57wxhj1.jpg`}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[18px]">{name}</h2>
                  <p className="text-gray-500 text-sm">+91 {phone}</p>
                  <p className="text-gray-500 text-xs">{email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 space-y-3 mt-16">
          <div className="bg-white rounded-3xl p-4">
            <h3 className="font-bold text-lg mb-1">My Account</h3>

            <MobileMenuItem
              icon={RiUserLine}
              title="My Profile"
              href="/accounts/profile"
            />

            <MobileMenuItem
              icon={RiShoppingBagLine}
              title="Orders"
              href="/accounts/orders"
            />

            <MobileMenuItem
              icon={FcPrivacy}
              title="Privacy Policy"
              href="/privacypolicy"
            />
            <MobileMenuItem
              icon={GrReturn}
              title="Return Policy"
              href="/refundPolicy"
            />
            <MobileMenuItem
              icon={GrReturn}
              title="Terms & Conditions"
              href="/terms_conditions"
            />
            <MobileMenuItem
              icon={RiNotification3Line}
              title="Notifications"
              href="/accounts/notifications"
            />
            <MobileMenuItem icon={FaQ} title="FAQ's" href="/accounts/faq" />

            <MobileMenuItem icon={FcAbout} title="About US" href="/about_us" />
          </div>

          <div className="bg-white rounded-3xl p-4">
            <h3 className="font-bold text-lg mb-1">Support</h3>

            <MobileMenuItem
              icon={FcContacts}
              title="Contact US"
              href="/contact_us"
            />
            <MobileMenuItem
              icon={RiShareForwardLine}
              title="Share Website"
              href="/accounts/share"
            />
          </div>
        </div>
      </div>
    </>
  );
}


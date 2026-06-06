"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiPackage,
  FiTruck,
  FiTag,
  FiShield,
  FiBell,
  FiFileText,
  FiSettings,
  FiCheckCircle,
  FiX,
  FiClock,
  FiExternalLink,
  FiArrowLeft,
  FiMoreVertical,
} from "react-icons/fi";

const notifications = [
  {
    id: 1,
    title: "Your order #ORD-1001 has been delivered",
    desc: "Great news! Your order has been successfully delivered.",
    time: "10 min ago",
    date: "18 July 2024, 10:30 AM",
    icon: FiPackage,
    color: "bg-orange-100 text-[#FF581B]",
    type: "Order Update",
    orderId: "#ORD-1001",
    orderDate: "18 July 2024",
    totalAmount: "$120.50",
    paymentMethod: "Visa ****4242",
    deliveryAddress: "123 Main Street, Leeds, UK",
  },
  {
    id: 2,
    title: "Your order #ORD-1002 is on the way",
    desc: "Your order is out for delivery and will arrive soon.",
    time: "1 hour ago",
    date: "18 July 2024, 09:15 AM",
    icon: FiTruck,
    color: "bg-green-100 text-green-600",
    type: "Order Update",
    orderId: "#ORD-1002",
    orderDate: "18 July 2024",
    totalAmount: "$45.99",
    paymentMethod: "Mastercard ****5678",
    deliveryAddress: "456 Oak Avenue, Manchester, UK",
  },
  {
    id: 3,
    title: "Special offer just for you!",
    desc: "Get 20% off on your next purchase. Limited time offer.",
    time: "3 hours ago",
    date: "18 July 2024, 07:00 AM",
    icon: FiTag,
    color: "bg-purple-100 text-purple-600",
    type: "Promotion",
  },
  {
    id: 4,
    title: "Password changed successfully",
    desc: "Your account password was changed successfully.",
    time: "Yesterday",
    date: "17 July 2024, 02:30 PM",
    icon: FiShield,
    color: "bg-blue-100 text-blue-600",
    type: "Account",
  },
  {
    id: 5,
    title: "New features are here!",
    desc: "Check out the latest updates and improvements.",
    time: "2 days ago",
    date: "16 July 2024, 11:00 AM",
    icon: FiBell,
    color: "bg-yellow-100 text-yellow-600",
    type: "System",
  },
  {
    id: 6,
    title: "Your invoice for #ORD-0998 is ready",
    desc: "Download your invoice and payment receipt.",
    time: "3 days ago",
    date: "15 July 2024, 04:20 PM",
    icon: FiFileText,
    color: "bg-green-100 text-green-600",
    type: "Order Update",
    orderId: "#ORD-0998",
    orderDate: "15 July 2024",
    totalAmount: "$89.99",
    paymentMethod: "PayPal",
    deliveryAddress: "789 Pine Street, Birmingham, UK",
  },
  {
    id: 7,
    title: "Maintenance scheduled",
    desc: "We will be performing scheduled maintenance.",
    time: "5 days ago",
    date: "13 July 2024, 12:00 PM",
    icon: FiSettings,
    color: "bg-gray-100 text-gray-600",
    type: "System",
  },
];

export default function Notifications() {
  const router = useRouter();
  const [selected, setSelected] = useState(notifications[0]);
  const [activeTab, setActiveTab] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = ["All", "Unread", "Orders", "Promotions", "System", "Account"];

  const getTabCount = (tab) => {
    if (tab === "All") return notifications.length;
    if (tab === "Unread") return 3;
    if (tab === "Orders")
      return notifications.filter((n) => n.type === "Order Update").length;
    if (tab === "Promotions")
      return notifications.filter((n) => n.type === "Promotion").length;
    if (tab === "System")
      return notifications.filter((n) => n.type === "System").length;
    if (tab === "Account")
      return notifications.filter((n) => n.type === "Account").length;
    return 0;
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "All") return true;
    if (activeTab === "Orders") return notification.type === "Order Update";
    if (activeTab === "Promotions") return notification.type === "Promotion";
    if (activeTab === "System") return notification.type === "System";
    if (activeTab === "Account") return notification.type === "Account";
    if (activeTab === "Unread") return notification.id <= 3;
    return true;
  });

  const SelectedIcon = selected.icon;

  return (
    <div className="min-h-screen bg-[#FFF8F2]">
      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-orange-100 shadow-sm md:hidden">
        <div className="px-4">
          <div className="h-14 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors"
            >
              <FiArrowLeft size={18} className="text-[#FF581B]" />
            </button>
            <h1 className="font-semibold text-lg text-[#FF581B]">
              Notifications
            </h1>
            <button className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors">
              <FiMoreVertical size={18} className="text-[#FF581B]" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6">
        {/* Desktop Header */}
        <div className="hidden md:block mb-6">
          <h1 className="text-2xl font-bold text-[#FF581B]">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            Stay updated with important updates and alerts.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.7fr_1fr] gap-4 md:gap-6">
          {/* LEFT SIDE - Notification List */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-orange-100 p-3 md:p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                        activeTab === tab
                          ? "bg-[#FF581B] text-white shadow-sm"
                          : "text-gray-600 hover:bg-orange-50"
                      }`}
                    >
                      {tab}
                      {getTabCount(tab) > 0 && (
                        <span
                          className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] ${
                            activeTab === tab
                              ? "bg-white text-[#FF581B]"
                              : "bg-orange-100 text-[#FF581B]"
                          }`}
                        >
                          {getTabCount(tab)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#FF581B] border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                  <FiCheckCircle size={14} />
                  Mark all as read
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="divide-y divide-orange-50">
              {filteredNotifications.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className={`cursor-pointer p-4 transition-all ${
                      selected.id === item.id
                        ? "bg-orange-50 border-l-4 border-l-[#FF581B]"
                        : "hover:bg-orange-50/50"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}
                      >
                        <Icon size={18} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm text-gray-800 line-clamp-1">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {item.desc}
                        </p>
                        {item.id <= 3 && (
                          <div className="flex items-center gap-1 mt-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF581B]"></span>
                            <span className="text-[9px] text-[#FF581B] font-medium">
                              Unread
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="border-t border-orange-100 p-3 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-gray-500">
                Showing 1 to {filteredNotifications.length} of{" "}
                {notifications.length} notifications
              </span>

              <div className="flex gap-1">
                <button className="w-7 h-7 rounded-lg border border-orange-200 flex items-center justify-center text-xs hover:bg-orange-50 transition-colors">
                  ‹
                </button>
                <button className="w-7 h-7 rounded-lg bg-[#FF581B] text-white text-xs font-semibold">
                  1
                </button>
                <button className="w-7 h-7 rounded-lg border border-orange-200 text-xs hover:bg-orange-50 transition-colors">
                  2
                </button>
                <button className="w-7 h-7 rounded-lg border border-orange-200 text-xs hover:bg-orange-50 transition-colors">
                  3
                </button>
                <button className="w-7 h-7 rounded-lg border border-orange-200 flex items-center justify-center text-xs hover:bg-orange-50 transition-colors">
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Notification Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden sticky top-20">
            <div className="p-4 md:p-5">
              <div className="flex justify-end">
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FiX size={18} />
                </button>
              </div>

              {/* Illustration */}
              <div className="flex justify-center">
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center ${selected.color}`}
                  >
                    <SelectedIcon
                      size={40}
                      className={selected.color.replace("bg-", "text-")}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1">
                    <FiCheckCircle size={12} />
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold ${selected.color}`}
                >
                  {selected.type || "Notification"}
                </span>
                <h3 className="font-bold text-base md:text-lg text-gray-800 mt-3">
                  {selected.title}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-gray-500 text-xs mt-2">
                  <FiClock size={12} className="text-[#F4B400]" />
                  <span>{selected.date || selected.time}</span>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-3 mt-4 text-sm text-gray-700 leading-relaxed">
                {selected.desc}
                {selected.orderId && (
                  <button className="mt-2 text-[#FF581B] font-medium text-xs flex items-center gap-1">
                    View Order Details <FiExternalLink size={10} />
                  </button>
                )}
              </div>

              {/* Order Details (if applicable) */}
              {selected.orderId && (
                <div className="mt-4">
                  <h4 className="font-semibold text-[#FF581B] text-xs mb-2 flex items-center gap-1">
                    <FiPackage size={12} />
                    Order Details
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Order ID</span>
                      <span className="font-medium text-gray-800">
                        {selected.orderId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Order Date</span>
                      <span className="text-gray-700">
                        {selected.orderDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Amount</span>
                      <span className="font-semibold text-[#FF581B]">
                        {selected.totalAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Method</span>
                      <span className="text-gray-700">
                        {selected.paymentMethod}
                      </span>
                    </div>
                    {selected.deliveryAddress && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Delivery Address</span>
                        <span className="text-gray-700 text-right max-w-[180px]">
                          {selected.deliveryAddress}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-3 py-2 bg-[#FF581B] text-white rounded-lg text-sm font-medium hover:bg-[#E04A10] transition-colors">
                  Take Action
                </button>
                <button className="flex-1 px-3 py-2 border border-orange-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

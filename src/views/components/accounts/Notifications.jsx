"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
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
  FiLoader,
  FiRefreshCw,
  FiXCircle,
} from "react-icons/fi";
import { get_order_data } from "@/redux/Order/OrderSlice";

export default function Notifications() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  
  const { orders, isLoading: reduxLoading } = useSelector((state) => state.order);
  const { isUserAuth, userData } = useSelector((state) => state.Authentication);

  // Static notifications (non-order related)
  const staticNotifications = [
    {
      id: "static-3",
      title: "Special offer just for you!",
      desc: "Get 20% off on your next purchase. Limited time offer.",
      time: "3 hours ago",
      date: "18 July 2024, 07:00 AM",
      icon: FiTag,
      color: "bg-purple-100 text-purple-600",
      type: "Promotion",
      isStatic: true,
      read: false,
    },
    // {
    //   id: "static-4",
    //   title: "Password changed successfully",
    //   desc: "Your account password was changed successfully.",
    //   time: "Yesterday",
    //   date: "17 July 2024, 02:30 PM",
    //   icon: FiShield,
    //   color: "bg-blue-100 text-blue-600",
    //   type: "Account",
    //   isStatic: true,
    //   read: true,
    // },
    {
      id: "static-5",
      title: "New features are here!",
      desc: "Check out the latest updates and improvements.",
      time: "2 days ago",
      date: "16 July 2024, 11:00 AM",
      icon: FiBell,
      color: "bg-yellow-100 text-yellow-600",
      type: "System",
      isStatic: true,
      read: true,
    },
    {
      id: "static-7",
      title: "Maintenance scheduled",
      desc: "We will be performing scheduled maintenance.",
      time: "5 days ago",
      date: "13 July 2024, 12:00 PM",
      icon: FiSettings,
      color: "bg-gray-100 text-gray-600",
      type: "System",
      isStatic: true,
      read: true,
    },
  ];

  // Generate order notifications dynamically from actual orders
  const generateOrderNotifications = (ordersList) => {
    const orderNotifications = [];
    
    ordersList.forEach((order, index) => {
      const orderDate = order.createdAt ? new Date(order.createdAt) : new Date();
      const now = new Date();
      const timeDiff = now - orderDate;
      const minutesAgo = Math.floor(timeDiff / 60000);
      const hoursAgo = Math.floor(minutesAgo / 60);
      const daysAgo = Math.floor(hoursAgo / 24);
      
      let timeString;
      if (minutesAgo < 60) {
        timeString = `${minutesAgo} min ago`;
      } else if (hoursAgo < 24) {
        timeString = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
      } else if (daysAgo < 7) {
        timeString = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
      } else {
        timeString = orderDate.toLocaleDateString("en-GB");
      }

      // Only add notifications for orders that have valid status
      if (order.status === "placed" || order.status === "preparing" || 
          order.status === "ready" || order.status === "delivered" || 
          order.status === "cancelled") {
        
        orderNotifications.push({
          id: `${order._id}-${order.status}`,
          title: getNotificationTitle(order.status, order.orderNumber),
          desc: getNotificationDescription(order.status),
          time: timeString,
          date: orderDate.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          icon: getNotificationIcon(order.status),
          color: getNotificationColor(order.status),
          type: "Order Update",
          isStatic: false,
          read: index >= 3, // Mark older orders as read
          orderData: {
            orderId: order.orderNumber || `#ORD-${order._id?.slice(-8)}`,
            actualId: order._id,
            orderDate: orderDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            totalAmount: `₹${order.totalAmount?.toLocaleString() || 0}`,
            paymentMethod: order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod?.toUpperCase() || "Not specified",
            deliveryAddress: order.deliveryAddress || "Address not specified",
            status: order.status,
            items: order.items || [],
          },
          orderStatus: order.status,
        });
      }
    });

    return orderNotifications;
  };

  // Helper functions for notifications
  const getNotificationTitle = (status, orderNumber) => {
    const orderId = orderNumber || "your order";
    switch (status) {
      case "placed": return `Your order ${orderId} has been placed`;
      case "preparing": return `Your order ${orderId} is being prepared`;
      case "ready": return `Your order ${orderId} is ready for pickup`;
      case "delivered": return `Your order ${orderId} has been delivered`;
      case "cancelled": return `Your order ${orderId} has been cancelled`;
      default: return `Update for order ${orderId}`;
    }
  };

  const getNotificationDescription = (status) => {
    switch (status) {
      case "placed": return "Your order has been successfully placed and is being processed.";
      case "preparing": return "Great news! The restaurant has started preparing your order.";
      case "ready": return "Your order is ready! Please collect it from the restaurant.";
      case "delivered": return "Great news! Your order has been successfully delivered.";
      case "cancelled": return "Your order has been cancelled. Please contact support if you have any questions.";
      default: return "Your order status has been updated.";
    }
  };

  const getNotificationIcon = (status) => {
    switch (status) {
      case "placed": return FiPackage;
      case "preparing": return FiRefreshCw;
      case "ready": return FiCheckCircle;
      case "delivered": return FiTruck;
      case "cancelled": return FiXCircle;
      default: return FiPackage;
    }
  };

  const getNotificationColor = (status) => {
    switch (status) {
      case "placed": return "bg-orange-100 text-[#FF581B]";
      case "preparing": return "bg-blue-100 text-blue-600";
      case "ready": return "bg-green-100 text-green-600";
      case "delivered": return "bg-green-100 text-green-600";
      case "cancelled": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Transform orders from Redux
  const transformOrders = (ordersList) => {
    if (!Array.isArray(ordersList)) return [];
    return ordersList.map(order => ({
      _id: order._id,
      orderNumber: order.orderNumber || `ORD-${order._id?.slice(-8)}`,
      createdAt: order.createdAt,
      status: order.status || "placed",
      totalAmount: order.totalAmount || 0,
      paymentMethod: order.paymentMethod || "cod",
      deliveryAddress: order.deliveryAddress || "123 Main Street, Leeds, UK",
      items: order.items || [],
    }));
  };

  // Get all notifications (dynamic + static)
  const allNotifications = () => {
    const transformedOrders = transformOrders(orders);
    const orderNotifications = generateOrderNotifications(transformedOrders);
    // Combine order notifications with static ones and sort by date (newest first)
    const combined = [...orderNotifications, ...staticNotifications];
    return combined.sort((a, b) => {
      // Simple sorting - you might want to implement proper date comparison
      if (a.time.includes("min") && !b.time.includes("min")) return -1;
      if (!a.time.includes("min") && b.time.includes("min")) return 1;
      return 0;
    });
  };

  useEffect(() => {
    if (isUserAuth && userData?._id) {
      loadOrders();
    } else if (!isUserAuth) {
      setIsLoading(false);
    }
  }, [isUserAuth, userData]);

  const loadOrders = async () => {
    setIsLoading(true);
    await dispatch(get_order_data(userData._id));
    setIsLoading(false);
  };

  useEffect(() => {
    const notifications = allNotifications();
    if (notifications.length > 0 && !selected) {
      setSelected(notifications[0]);
    }
  }, [orders]);

  const tabs = ["All", "Unread", "Orders", "Promotions", "System", "Account"];

  const getTabCount = (tab) => {
    const notifications = allNotifications();
    if (tab === "All") return notifications.length;
    if (tab === "Unread") return notifications.filter(n => !n.read).length;
    if (tab === "Orders") return notifications.filter(n => n.type === "Order Update").length;
    if (tab === "Promotions") return notifications.filter(n => n.type === "Promotion").length;
    if (tab === "System") return notifications.filter(n => n.type === "System").length;
    if (tab === "Account") return notifications.filter(n => n.type === "Account").length;
    return 0;
  };

  const filteredNotifications = allNotifications().filter((notification) => {
    if (activeTab === "All") return true;
    if (activeTab === "Orders") return notification.type === "Order Update";
    if (activeTab === "Promotions") return notification.type === "Promotion";
    if (activeTab === "System") return notification.type === "System";
    if (activeTab === "Account") return notification.type === "Account";
    if (activeTab === "Unread") return !notification.read;
    return true;
  });

  // Loading state
  if (isLoading || reduxLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center">
        <div className="text-center">
          <FiLoader size={40} className="animate-spin text-[#FF581B] mx-auto mb-4" />
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!isUserAuth) {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view notifications</p>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 bg-[#FF581B] text-white rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const SelectedIcon = selected?.icon || FiPackage;

  const handleViewOrder = (orderId) => {
    if (orderId) {
      router.push(`/accounts/orders/${orderId}`);
    }
  };

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

                {/* <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#FF581B] border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                  <FiCheckCircle size={14} />
                  Mark all as read
                </button> */}
              </div>
            </div>

            {/* Notification List */}
            <div className="divide-y divide-orange-50 max-h-[600px] overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className={`cursor-pointer p-4 transition-all ${
                        selected?.id === item.id
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
                          {!item.read && (
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
                })
              ) : (
                <div className="text-center py-12">
                  <FiBell size={40} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No notifications found</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Notification Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden sticky top-20">
            {selected ? (
              <div className="p-4 md:p-5">
                <div className="flex justify-end">
                  <button 
                    onClick={() => setSelected(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
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
                    {selected.type === "Order Update" && selected.orderData?.status === "delivered" && (
                      <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1">
                        <FiCheckCircle size={12} />
                      </div>
                    )}
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
                  {selected.orderData && (
                    <button 
                      onClick={() => handleViewOrder(selected.orderData.actualId)}
                      className="mt-2 text-[#FF581B] font-medium text-xs flex items-center gap-1"
                    >
                      View Order Details <FiExternalLink size={10} />
                    </button>
                  )}
                </div>

                {/* Order Details (if applicable) */}
                {selected.orderData && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-[#FF581B] text-xs mb-2 flex items-center gap-1">
                      <FiPackage size={12} />
                      Order Details
                    </h4>
                    <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-medium text-gray-800">
                          {selected.orderData.orderId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Order Date</span>
                        <span className="text-gray-700">
                          {selected.orderData.orderDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Amount</span>
                        <span className="font-semibold text-[#FF581B]">
                          {selected.orderData.totalAmount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="text-gray-700">
                          {selected.orderData.paymentMethod}
                        </span>
                      </div>
                      {selected.orderData.deliveryAddress && selected.orderData.deliveryAddress !== "Address not specified" && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Delivery Address</span>
                          <span className="text-gray-700 text-right max-w-[180px]">
                            {selected.orderData.deliveryAddress}
                          </span>
                        </div>
                      )}
                      {selected.orderData.items && selected.orderData.items.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <span className="text-gray-500 block mb-2">Items:</span>
                          <div className="space-y-1">
                            {selected.orderData.items.slice(0, 3).map((item, idx) => (
                              <div key={idx} className="flex justify-between text-xs">
                                <span>{item.quantity}x {item.name}</span>
                                <span>₹{item.price}</span>
                              </div>
                            ))}
                            {selected.orderData.items.length > 3 && (
                              <div className="text-gray-500 text-xs">
                                +{selected.orderData.items.length - 3} more items
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  {selected.orderData && (
                    <button 
                      onClick={() => handleViewOrder(selected.orderData.actualId)}
                      className="flex-1 px-3 py-2 bg-[#FF581B] text-white rounded-lg text-sm font-medium hover:bg-[#E04A10] transition-colors"
                    >
                      View Order
                    </button>
                  )}
                  <button 
                    onClick={() => setSelected(null)}
                    className="flex-1 px-3 py-2 border border-orange-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <FiBell size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-600 font-medium">Select a notification</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Click on any notification to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
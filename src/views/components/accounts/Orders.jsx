"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiUser,
  FiCalendar,
  FiClock,
  FiEye,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCw,
  FiLoader,
} from "react-icons/fi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { BsCashStack } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { get_order_data } from "@/redux/Order/OrderSlice";

export default function Orders() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  const { orders, isLoading: reduxLoading, error } = useSelector((state) => state.order);
  const { isUserAuth, userData } = useSelector((state) => state.Authentication);

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

  // Transform orders to match your UI format
  const transformOrder = (order) => {
    const journeyDate = order.createdAt ? new Date(order.createdAt) : new Date();
    
    return {
      _id: order._id,
      orderNumber: order.orderNumber || `ORD-${order._id?.slice(-12) || Date.now()}`,
      userName: order.user?.name || userData?.name || "Customer",
      paymentMethod: order.paymentMethod || "cod",
      paymentStatus: order.paymentStatus || "pending",
      status: order.status || "placed",
      totalAmount: order.totalAmount || 0,
      journey: {
        formattedDate: journeyDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        formattedTime: journeyDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      },
      items: order.items?.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || item.productImage || "/placeholder.jpg",
      })) || [],
      estimatedDelivery: order.estimatedDelivery 
        ? new Date(order.estimatedDelivery).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "Not available",
      mainImage: order.items?.[0]?.image || order.items?.[0]?.productImage || "/placeholder.jpg",
    };
  };

  const ordersList = Array.isArray(orders) ? orders.map(transformOrder) : [];

  const tabs = [
    { id: "all", label: "All", count: ordersList.length },
    {
      id: "placed",
      label: "Placed",
      count: ordersList.filter((o) => o.status === "placed").length,
    },
    {
      id: "preparing",
      label: "Preparing",
      count: ordersList.filter((o) => o.status === "preparing").length,
    },
    {
      id: "ready",
      label: "Ready",
      count: ordersList.filter((o) => o.status === "ready").length,
    },
    {
      id: "delivered",
      label: "Delivered",
      count: ordersList.filter((o) => o.status === "delivered").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: ordersList.filter((o) => o.status === "cancelled").length,
    },
  ];

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: FiTruck,
          label: "DELIVERED",
        };
      case "preparing":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: FiRefreshCw,
          label: "PREPARING",
        };
      case "ready":
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          icon: FiCheckCircle,
          label: "READY",
        };
      case "cancelled":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: FiXCircle,
          label: "CANCELLED",
        };
      default:
        return {
          bg: "bg-orange-100",
          text: "text-[#FF581B]",
          icon: FiClock,
          label: "PLACED",
        };
    }
  };

  const getPaymentStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return { bg: "bg-green-100", text: "text-green-700", icon: BiWallet };
      default:
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          icon: BsCashStack,
        };
    }
  };

  const filteredOrders = ordersList.filter((order) => {
    return activeTab === "all" || order.status === activeTab;
  });

  const handleViewDetails = (orderId) => {
    router.push(`/accounts/orders/${orderId}`);
  };

  // Loading state
  if (isLoading || reduxLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center">
        <div className="text-center">
          <FiLoader size={40} className="animate-spin text-[#FF581B] mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!isUserAuth) {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your orders</p>
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load orders</p>
          <button
            onClick={loadOrders}
            className="px-6 py-2 bg-[#FF581B] text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-fit bg-[#FFF8F2]">
      {/* Mobile Header - Only visible on mobile */}
      <div className="sticky top-0 z-20 bg-white border-b border-orange-100 shadow-sm md:hidden">
        <div className="px-3">
          <div className="h-14 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors"
            >
              <FiArrowLeft size={18} className="text-[#FF581B]" />
            </button>

            <h1 className="font-bold text-lg text-[#FF581B]">My Orders</h1>

            <button className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors relative">
              <HiOutlineShoppingCart size={18} className="text-[#FF581B]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F4B400] text-white text-[10px] rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-2">
        {/* Desktop Header - Only visible on desktop */}
        <div className="hidden md:block mb-3">
          <h1 className="text-2xl font-bold text-[#FF581B]">My Orders</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track and manage all your orders
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-2 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#FF581B] text-white shadow-md"
                    : "bg-white text-gray-600 border border-orange-200 hover:bg-orange-50"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-3 pb-24">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusStyle(order.status).icon;
              const statusStyle = getStatusStyle(order.status);
              const PaymentIcon = getPaymentStyle(order.paymentStatus).icon;
              const paymentStyle = getPaymentStyle(order.paymentStatus);

              return (
                <div
                  key={order._id}
                  className="bg-white p-2 flex flex-col gap-2 rounded-xl hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Order Header */}
                  <div className=" border-b border-orange-50">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="font-bold text-sm text-gray-900">
                          {order.orderNumber}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 text-gray-500">
                            <FiUser size={12} className="text-[#FF581B]" />
                            <span className="text-xs">{order.userName}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${statusStyle.bg} px-3 py-1.5 rounded-full flex items-center gap-1.5`}
                      >
                        <StatusIcon size={12} className={statusStyle.text} />
                        <span
                          className={`text-[10px] font-bold ${statusStyle.text}`}
                        >
                          {statusStyle.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items with Images */}
                  <div className=" border-b border-orange-50">
                    {/* Main Product Image and Info Row */}
                    <div className="flex gap-3 mb-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-orange-50 flex-shrink-0">
                        {order.mainImage && order.mainImage !== "/placeholder.jpg" ? (
                          <Image
                            src={order.mainImage}
                            alt={order.items[0]?.name || "Product"}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiPackage size={24} className="text-orange-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <MdOutlineRestaurantMenu
                              size={16}
                              className="text-[#FF581B]"
                            />
                            <span className="text-xs font-semibold text-gray-700">
                              {order.items.length} Item
                              {order.items.length > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BsCashStack size={16} className="text-green-600" />
                            <span className="font-bold text-sm text-[#FF581B]">
                              ₹{order.totalAmount}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-800">
                          {order.items[0]?.name}
                          {order.items.length > 1 &&
                            ` +${order.items.length - 1} more`}
                        </p>
                      </div>
                    </div>

                    {/* All Items with Images */}
                    {order.items.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-orange-50">
                        <p className="text-xs text-gray-500 mb-2">All Items:</p>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 bg-orange-50 px-2 py-1.5 rounded-lg"
                            >
                              <div className="w-6 h-6 rounded overflow-hidden bg-white">
                                {item.image && item.image !== "/placeholder.jpg" ? (
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <FiPackage
                                      size={12}
                                      className="text-orange-400"
                                    />
                                  </div>
                                )}
                              </div>
                              <span className="text-xs text-gray-700">
                                {item.quantity}x {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Footer */}
                  <div className="px-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <FiCalendar size={12} className="text-[#F4B400]" />
                        <span className="text-xs">
                          {order.journey.formattedDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock size={12} className="text-[#FF581B]" />
                        <span className="text-xs font-medium text-[#FF581B]">
                          {order.journey.formattedTime}
                        </span>
                      </div>
                      <div
                        className={`${paymentStyle.bg} px-2 py-1 rounded-full flex items-center gap-1`}
                      >
                        <PaymentIcon size={10} className={paymentStyle.text} />
                        <span
                          className={`text-[9px] font-semibold uppercase ${paymentStyle.text}`}
                        >
                          {order.paymentMethod}{" "}
                          {order.paymentStatus === "paid" ? "(Paid)" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {order.status === "placed" && (
                        <button className="px-3 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-500 text-[11px] font-semibold hover:bg-red-100 transition-colors">
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleViewDetails(order._id)}
                        className="px-3 py-1.5 rounded-full bg-[#FF581B] text-white text-[11px] font-semibold hover:bg-[#E04A10] transition-colors flex items-center gap-1"
                      >
                        <FiEye size={12} />
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* ETA Notice */}
                  {order.status !== "delivered" &&
                    order.status !== "cancelled" &&
                    order.estimatedDelivery !== "Not available" && (
                      <div className="px-4 py-2 bg-orange-50 border-t border-orange-100">
                        <div className="flex items-center gap-2">
                          <FiTruck size={12} className="text-[#FF581B]" />
                          <span className="text-xs text-gray-600">
                            Expected delivery by {order.estimatedDelivery}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <FiPackage size={32} className="text-[#FF581B]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 text-sm">
              You haven't placed any orders yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
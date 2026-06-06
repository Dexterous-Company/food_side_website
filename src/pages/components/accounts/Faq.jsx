"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiSearch,
  FiMapPin,
  FiCreditCard,
  FiRefreshCw,
  FiClock,
  FiShield,
  FiTag,
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiChevronRight,
  FiPackage,
  FiHeadphones,
  FiArrowLeft,
} from "react-icons/fi";

export default function FAQPage() {
  const router = useRouter();
  const [open, setOpen] = useState(0);
  const [activeTab, setActiveTab] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      id: 1,
      icon: <FiMapPin />,
      question: "How can I track my order?",
      answer:
        "You can track your order from the Orders section in your account. You'll receive email updates at every step.",
      link: "/account/orders",
      linkText: "Go to Orders",
      category: "Orders",
    },
    {
      id: 2,
      icon: <FiCreditCard />,
      question: "What payment methods do you accept?",
      answer:
        "We accept Credit Cards, Debit Cards, UPI, Net Banking and Wallet payments.",
      category: "Payments",
    },
    {
      id: 3,
      icon: <FiRefreshCw />,
      question: "How can I return or exchange an item?",
      answer:
        "Returns and exchanges can be initiated directly from your Orders page.",
      link: "/account/orders",
      linkText: "View Orders",
      category: "Orders",
    },
    {
      id: 4,
      icon: <FiClock />,
      question: "What is your delivery time?",
      answer:
        "Most orders are delivered within 3-7 business days depending on your location.",
      category: "Delivery",
    },
    {
      id: 5,
      icon: <FiShield />,
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-leading security and encryption to keep your information safe.",
      category: "General",
    },
    {
      id: 6,
      icon: <FiTag />,
      question: "Do you offer discounts or promotions?",
      answer:
        "Yes, we regularly provide seasonal offers, coupons, and exclusive member discounts.",
      category: "General",
    },
    {
      id: 7,
      icon: <FiUser />,
      question: "How can I update my account information?",
      answer:
        "You can update your account details anytime from the Profile section.",
      link: "/account/profile",
      linkText: "Go to Profile",
      category: "Account",
    },
  ];

  const topics = [
    {
      icon: <FiPackage />,
      title: "Tracking Your Order",
      link: "/account/orders",
    },
    {
      icon: <FiRefreshCw />,
      title: "Returns & Refunds",
      link: "/account/orders",
    },
    {
      icon: <FiCreditCard />,
      title: "Payment Methods",
      link: "/account/payments",
    },
    { icon: <FiUser />, title: "Account Management", link: "/account/profile" },
    {
      icon: <FiClock />,
      title: "Delivery Information",
      link: "/account/orders",
    },
  ];

  const tabs = [
    "All Topics",
    "Orders",
    "Payments",
    "Account",
    "Delivery",
    "General",
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All Topics" || faq.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleContactSupport = () => {
    router.push("/contact_us");
  };

  const handleTopicClick = (link) => {
    if (link) {
      router.push(link);
    }
  };

  const handleFaqLinkClick = (link, e) => {
    e.stopPropagation();
    if (link) {
      router.push(link);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2]">
      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-orange-100 shadow-sm md:hidden">
        <div className="px-3">
          <div className="h-14 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors"
            >
              <FiArrowLeft size={18} className="text-[#FF581B]" />
            </button>
            <h1 className="font-semibold text-lg text-[#FF581B]">FAQs</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4">
        {/* Desktop Header */}
        <div className="hidden md:flex md:items-center md:justify-between md:mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#FF581B]">FAQs</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Find quick answers to common questions.
            </p>
          </div>
          <div className="relative w-72">
            <FiSearch
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 rounded-lg border border-orange-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#FF581B] focus:ring-1 focus:ring-[#FF581B]/20"
            />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden relative mb-3">
          <FiSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 rounded-lg border border-orange-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#FF581B] focus:ring-1 focus:ring-[#FF581B]/20"
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-3">
          {/* Left Section */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-orange-100 p-2 overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                      activeTab === tab
                        ? "bg-[#FF581B] text-white shadow-sm"
                        : "text-gray-600 hover:bg-orange-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            {filteredFaqs.length > 0 ? (
              <div className="divide-y divide-orange-50">
                {filteredFaqs.map((faq, index) => (
                  <div key={faq.id}>
                    <button
                      onClick={() => setOpen(open === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-orange-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF581B] text-sm">
                          {faq.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-800 text-left">
                          {faq.question}
                        </span>
                      </div>
                      {open === faq.id ? (
                        <FiChevronUp size={14} className="text-[#FF581B]" />
                      ) : (
                        <FiChevronDown size={14} className="text-gray-400" />
                      )}
                    </button>
                    {open === faq.id && (
                      <div className="pl-12 pr-3 pb-2.5">
                        <p className="text-xs text-gray-500 leading-relaxed mb-2">
                          {faq.answer}
                        </p>
                        {faq.link && (
                          <button
                            onClick={(e) => handleFaqLinkClick(faq.link, e)}
                            className="text-xs text-[#FF581B] font-medium hover:underline flex items-center gap-1 mt-1"
                          >
                            {faq.linkText || "Learn More"} →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiHelpCircle
                  size={32}
                  className="mx-auto text-gray-300 mb-2"
                />
                <p className="text-sm text-gray-500">No FAQs found</p>
                <p className="text-xs text-gray-400 mt-1">
                  Try searching with different keywords
                </p>
              </div>
            )}

            <div className="border-t border-orange-100 px-3 py-2.5">
              <p className="text-xs text-gray-500">
                Still have questions?{" "}
                <button
                  onClick={handleContactSupport}
                  className="text-[#FF581B] font-medium cursor-pointer hover:underline"
                >
                  Contact support
                </button>
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-3">
            {/* Help Card */}
            <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-3">
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center">
                    <FiHelpCircle size={22} className="text-[#FF581B]" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-[#F4B400] rounded-full" />
                </div>
              </div>
              <h3 className="text-center font-semibold text-sm text-gray-800">
                Need more help?
              </h3>
              <p className="text-center text-xs text-gray-500 mt-1 leading-relaxed">
                Can't find the answer?
                <br />
                We're here to help.
              </p>
              <button
                onClick={handleContactSupport}
                className="w-full h-8 mt-3 rounded-lg bg-[#FF581B] text-white text-xs font-medium hover:bg-[#E04A10] transition flex items-center justify-center gap-1.5"
              >
                <FiHeadphones size={12} />
                Contact Us
              </button>
            </div>

            {/* Popular Topics */}
            <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-3">
              <h3 className="font-semibold text-xs text-[#FF581B] mb-2">
                Popular Topics
              </h3>
              <div className="space-y-1">
                {topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleTopicClick(topic.link)}
                    className="w-full flex items-center justify-between py-1.5 cursor-pointer group hover:bg-orange-50 px-1 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF581B] text-xs">
                        {topic.icon}
                      </div>
                      <span className="text-xs text-gray-700 group-hover:text-[#FF581B]">
                        {topic.title}
                      </span>
                    </div>
                    <FiChevronRight size={12} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Security Card */}
            <Link href="/account/privacy" className="block">
              <div className="bg-orange-50 rounded-xl border border-orange-100 p-3 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <FiShield size={14} className="text-[#FF581B]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-xs">
                      Safe & Secure
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      Your information is protected with industry-leading
                      security.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

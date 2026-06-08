"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  FiShare2,
  FiArrowLeft,
  FiShoppingCart,
  FiCopy,
  FiCheck,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { RiWhatsappLine } from "react-icons/ri";

const Share = () => {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);
  const [siteUrl, setSiteUrl] = React.useState("");

  React.useEffect(() => {
    setSiteUrl(window.location.origin);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "My Website",
      text: "Check out this website!",
      url: siteUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const shareOptions = [
    {
      icon: RiWhatsappLine,
      name: "WhatsApp",
      color: "bg-green-500",
      link: `https://wa.me/?text=${encodeURIComponent(siteUrl)}`,
    },
    {
      icon: FiTwitter,
      name: "Twitter",
      color: "bg-black",
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}`,
    },
    {
      icon: FiFacebook,
      name: "Facebook",
      color: "bg-blue-600",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`,
    },
    {
      icon: FiLinkedin,
      name: "LinkedIn",
      color: "bg-blue-700",
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`,
    },
    {
      icon: FiMail,
      name: "Email",
      color: "bg-gray-600",
      link: `mailto:?subject=Check this out&body=${encodeURIComponent(siteUrl)}`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F2]">
      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-orange-100 shadow-sm md:hidden">
        <div className="px-3">
          <div className="h-14 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors"
            >
              <FiArrowLeft size={18} className="text-[#FF581B]" />
            </button>
            <h1 className="font-semibold text-lg text-[#FF581B]">Share App</h1>
            <button className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors relative">
              <FiShoppingCart size={18} className="text-[#FF581B]" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block bg-white border-b border-orange-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-[#FF581B]">Share App</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Share this app with your friends and family
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6">
        {/* Share Card */}
        <div className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden">
          <div className="p-6 text-center">
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <FiShare2 size={36} className="text-[#FF581B]" />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Share This App
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Invite your friends to join and enjoy amazing offers!
            </p>

            {/* Main Share Button */}
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF581B] text-white rounded-lg font-medium hover:bg-[#E04A10] transition-all mb-4"
            >
              <FiShare2 size={18} />
              {copied ? "Link Copied!" : "Share Now"}
            </button>

            {/* Share Options */}
            <div className="pt-4 border-t border-orange-100">
              <p className="text-xs text-gray-500 mb-3">Or share via</p>
              <div className="flex gap-3 justify-center">
                {shareOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <a
                      key={index}
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full ${option.color} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Copy Link Section */}
            <div className="mt-4 pt-4 border-t border-orange-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={siteUrl}
                  className="flex-1 px-3 py-2 text-xs border border-orange-200 rounded-lg bg-gray-50 text-gray-600"
                />
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(siteUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-4 py-2 bg-orange-50 text-[#FF581B] rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors flex items-center gap-1"
                >
                  {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;

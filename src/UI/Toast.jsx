// components/UI/Toast.jsx
"use client";
import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {type === "error" ? "❌" : "✓"}
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default Toast;
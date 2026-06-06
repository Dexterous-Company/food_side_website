"use client";

import { STEPS } from "./constants";

export default function StepSidebar({ currentStep }) {
  const lineHeight = (currentStep - 1) * 48;

  return (
    <div className="w-56 flex-shrink-0 border-r border-gray-100 p-6 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Process</h2>
      <p className="text-sm text-gray-400 mb-6">Complete all steps to finish</p>

      <div className="relative flex flex-col">
        <div className="absolute left-[13px] top-0 bottom-0 w-[2px] bg-gray-100" />
        <div
          className="absolute left-[13px] top-0 w-[2px] bg-[#ff581b] transition-all duration-300 ease-in-out"
          style={{ height: lineHeight }}
        />

        {STEPS.map((label, index) => {
          const n = index + 1;
          const isDone = currentStep > n;
          const isActive = currentStep === n;
          
          return (
            <div key={n} className="flex items-center gap-3 relative z-10 py-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all duration-200
                  ${isDone || isActive
                    ? "bg-[#ff581b] text-white shadow-sm shadow-orange-200"
                    : "bg-gray-100 text-gray-400 border border-gray-200"
                  }
                  ${isActive ? "ring-2 ring-orange-200" : ""}
                `}
              >
                {isDone ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : n}
              </div>
              <span
                className={`text-sm transition-colors duration-200
                  ${isDone || isActive ? "text-[#ff581b] font-medium" : "text-gray-400"}
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
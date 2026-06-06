"use client";
import { useState } from "react";

export default function SelectionCompletedProcess({ isOpen, onClose }) {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    "Select Towards",
    "Select Route",
    "Select Delivery Point",
    "Complete Details",
  ];

  const nextStep = () => step < 4 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] rounded-2xl shadow-xl flex p-8 gap-10">
        
        {/* LEFT SIDE */}
        <div className="w-1/3 border-r pr-6">
          <h2 className="text-2xl font-bold mb-2">Process</h2>
          <p className="text-gray-500 text-sm mb-6">
            Complete all steps to finish
          </p>

          <div className="relative">
            {/* Base Line */}
            <div className="absolute left-4 top-0 h-full w-[2px] bg-gray-200"></div>

            {/* Active Line */}
            <div
              className="absolute left-4 top-0 w-[2px] bg-[#ff581b] transition-all duration-300"
              style={{ height: `${(step - 1) * 70}px` }}
            ></div>

            <div className="space-y-10">
              {steps.map((label, index) => {
                const item = index + 1;
                return (
                  <div key={item} className="flex items-center gap-4 relative">
                    
                    {/* Circle */}
                    <div
                      className={`z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm
                      ${
                        step === item
                          ? "bg-[#ff581b] text-white"
                          : step > item
                          ? "bg-[#ff581b] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step > item ? "✓" : item}
                    </div>

                    {/* Text */}
                    <p
                      className={`text-sm
                      ${
                        step === item
                          ? "text-[#ff581b] font-semibold"
                          : step > item
                          ? "text-[#ff581b]"
                          : "text-gray-500"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-2/3">
          <h2 className="text-xl font-semibold mb-6">
            {steps[step - 1]}
          </h2>

          {/* STEP 1 */}
          {step === 1 && (
            <input
              className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
              placeholder="Enter Towards"
            />
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <input
              className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
              placeholder="Select Route"
            />
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <input
              className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
              placeholder="Select Delivery Point"
            />
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="grid grid-cols-2 gap-4">
              <input className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none" placeholder="Full Name" />
              <input className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none" placeholder="Phone Number" />
              <input className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none" placeholder="Address" />
              <input className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none" placeholder="City" />
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-5 py-2 border rounded-lg text-gray-600 disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={nextStep}
              className="px-5 py-2 bg-[#ff581b] text-white rounded-lg"
            >
              {step === 4 ? "Finish" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
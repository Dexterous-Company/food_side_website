"use client";

import { useState, useEffect, useCallback } from "react";
import StepSidebar from "./StepSidebar";
import Step1SelectTowards from "./Step1SelectTowards";
import Step2SelectRoute from "./Step2SelectRoute";
import Step3SelectDeliveryPoint from "./Step3SelectDeliveryPoint";
import Step4CompleteDetails from "./Step4CompleteDetails";
import { STEPS, DUMMY_ROUTES, DUMMY_DELIVERY_POINTS } from "./constants";

export default function DeliverySelectionModal({ isOpen, onClose, onFinish }) {
  const [step, setStep] = useState(1);
  const [selDest, setSelDest] = useState(null);
  const [selRoute, setSelRoute] = useState(null);
  const [selDP, setSelDP] = useState(null);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelDest(null);
      setSelRoute(null);
      setSelDP(null);
      setDetails({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        pincode: "",
      });
    }
  }, [isOpen]);

  const canNext = useCallback(() => {
    if (step === 1) return !!selDest;
    if (step === 2) return !!selRoute;
    if (step === 3) return !!selDP;
    return true;
  }, [step, selDest, selRoute, selDP]);

  const handleNext = () => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      onFinish?.({
        towards: selDest,
        route: selRoute,
        deliveryPoint: selDP,
        details,
      });
      onClose?.();
    }
  };

  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  const handleDetailsChange = (key, value) =>
    setDetails((prev) => ({ ...prev, [key]: value }));

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="bg-white w-full max-w-[860px] rounded-2xl shadow-2xl shadow-black/10 flex overflow-hidden"
        style={{ maxHeight: "calc(100vh - 2rem)", minHeight: 560 }}
      >
        <div className="hidden md:flex">
          <StepSidebar currentStep={step} />
        </div>

        <div className="flex-1 flex flex-col p-6 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-base font-semibold text-gray-900">
              {STEPS[step - 1]}
            </h3>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {step === 1 && (
              <Step1SelectTowards selDest={selDest} onSelectDest={setSelDest} />
            )}
            {step === 2 && (
              <Step2SelectRoute
                selDest={selDest}
                selRoute={selRoute}
                onSelectRoute={setSelRoute}
                routes={DUMMY_ROUTES}
              />
            )}
            {step === 3 && (
              <Step3SelectDeliveryPoint
                selRoute={selRoute}
                selDP={selDP}
                onSelectDP={setSelDP}
                deliveryPoints={DUMMY_DELIVERY_POINTS}
              />
            )}
            {step === 4 && (
              <Step4CompleteDetails
                selDest={selDest}
                selRoute={selRoute}
                selDP={selDP}
                details={details}
                onDetailsChange={handleDetailsChange}
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4 flex-shrink-0">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-5 py-2.5 text-sm font-medium border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300
                      ${i + 1 === step ? "w-4 bg-[#ff581b]" : i + 1 < step ? "w-1.5 bg-[#ff581b] opacity-40" : "w-1.5 bg-gray-200"}
                    `}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!canNext()}
                className={`px-6 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-150
                  ${
                    canNext()
                      ? "bg-[#ff581b] hover:bg-[#e04d16] active:scale-95"
                      : "bg-orange-200 cursor-not-allowed"
                  }
                `}
              >
                {step === 4 ? "Finish ✓" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

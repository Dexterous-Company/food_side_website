"use client";

import {
  ArrowRightLeft,
  Route,
  MapPin,
  ClipboardList,
} from "lucide-react";

import { STEPS } from "./constants";

const STEP_ICONS = {
  "Select Towards": ArrowRightLeft,
  "Select Route": Route,
  "Select Delivery Point": MapPin,
  "Complete Details": ClipboardList,
};

export default function StepSidebar({ currentStep, onStepChange }) {
  const tabs = STEPS.map((label, index) => ({
    name: label,
    icon: STEP_ICONS[label],
    active: currentStep === index + 1,
    stepNumber: index + 1,
  }));

  const handleTabClick = (stepNumber) => {
    if (onStepChange) {
      onStepChange(stepNumber);
    }
  };

  return (
    <div className="w-full bg-[#f5f5f5] border-b border-gray-200">
      <div className="flex items-center justify-between h-[58px]">
        {/* Left Tabs */}
        <div className="flex items-center h-full">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;

            return (
              <button
                key={index}
                onClick={() => handleTabClick(tab.stepNumber)}
                className={`relative flex items-center gap-1.5 px-3 md:px-4 h-full transition-all cursor-pointer
                  ${
                    tab.active
                      ? "text-[#0B1F3A] font-semibold"
                      : "text-[#6B7280] hover:text-[#0B1F3A]"
                  }
                `}
              >
                {/* Active Border */}
                {tab.active && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#d84e55]" />
                )}

                <div className="flex items-center justify-center">
                  <Icon
                    size={16}
                    strokeWidth={2}
                    className={
                      tab.active
                        ? "text-[#d84e55]"
                        : "text-[#6B7280]"
                    }
                  />
                </div>

                <span className="text-[13px] md:text-[14px] whitespace-nowrap">
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Text */}
        <div className="hidden lg:flex items-center pr-4">
          <h2 className="text-[14px] xl:text-[15px] font-semibold text-[#0B1F3A]">
            Step {currentStep} of {STEPS.length}
          </h2>
        </div>
      </div>
    </div>
  );
}
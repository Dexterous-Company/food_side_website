"use client";

import { useState } from "react";
import { STEPS } from "./constants";

// Enhanced step data structure
const STEP_DATA = STEPS.map((label, index) => ({
  id: index + 1,
  label,
  description: getStepDescription(index + 1),
  icon: getStepIcon(index + 1),
  estimatedTime: getEstimatedTime(index + 1),
}));

// Helper functions for enriched data
function getStepDescription(stepNum) {
  const descriptions = {
    1: "Choose your pickup location and destination",
    2: "Select the best route for your shipment",
    3: "Pick your preferred delivery point",
    4: "Review and confirm your journey details",
  };
  return descriptions[stepNum] || "Complete this step";
}

function getStepIcon(stepNum) {
  const icons = {
    1: "📝",
    2: "✅",
    3: "⚙️",
    4: "👀",
    5: "🎉",
  };
  return icons[stepNum] || "📌";
}

function getEstimatedTime(stepNum) {
  const times = {
    1: "2 min",
    2: "3 min",
    3: "1 min",
    4: "1 min",
    5: "2 min",
  };
  return times[stepNum] || "2 min";
}

// Progress stats component
function ProgressStats({ currentStep, totalSteps, completedSteps }) {
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Progress</span>
        <span className="font-medium text-[#ff581b]">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#ff581b] to-[#ff8a4f] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{completedSteps} completed</span>
      </div>
    </div>
  );
}

export default function StepSidebar({ currentStep, onStepClick }) {
  const totalSteps = STEP_DATA.length;
  const completedSteps = currentStep - 1;
  const lineHeight = Math.min((currentStep - 1) * 52, (totalSteps - 1) * 52);

  return (
    <div className="w-72 flex-shrink-0 bg-gradient-to-b from-white to-gray-50/50 border-r border-gray-200 shadow-sm">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Process Steps
          </h2>
          <span className="px-2 py-1 text-xs font-medium bg-[#ff581b]/10 text-[#ff581b] rounded-full">
            Active
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Complete all steps to finish your journey
        </p>

        {/* Quick stats */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-orange-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500">Current</div>
            <div className="text-sm font-semibold text-[#ff581b]">
              Step {currentStep}
            </div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500">Remaining</div>
            <div className="text-sm font-semibold text-gray-700">
              {totalSteps - completedSteps}
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="p-6">
        <div className="relative flex flex-col">
          {/* Background Line */}
          <div className="absolute left-[17px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-gray-100 via-gray-100 to-transparent" />

          {/* Progress Line */}
          <div
            className="absolute left-[17px] top-0 w-[2px] bg-gradient-to-b from-[#ff581b] to-[#ff8a4f] transition-all duration-500 ease-out shadow-lg"
            style={{ height: `${lineHeight}px` }}
          />

          {/* Steps */}
          {STEP_DATA.map((step) => {
            const isDone = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div
                key={step.id}
                className={`relative z-10 mb-4 group cursor-pointer transition-all duration-300 ${
                  onStepClick ? "hover:translate-x-1" : ""
                }`}
                onClick={() => onStepClick?.(step.id)}
              >
                <div className="flex gap-4">
                  {/* Step Circle */}
                  <div className="relative">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300
                        ${
                          isDone || isActive
                            ? "bg-gradient-to-br from-[#ff581b] to-[#ff8a4f] text-white shadow-lg shadow-orange-200"
                            : "bg-white text-gray-400 border-2 border-gray-200 group-hover:border-gray-300"
                        }
                        ${isActive ? "ring-4 ring-orange-100 scale-105" : ""}
                        ${!isDone && !isActive ? "group-hover:scale-105" : ""}
                      `}
                    >
                      {isDone ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="flex items-center gap-1">
                          {step.icon}
                        </span>
                      )}
                    </div>

                    {/* Active pulse effect */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl animate-ping bg-[#ff581b]/20" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm font-semibold transition-colors duration-200
                          ${isDone || isActive ? "text-gray-900" : "text-gray-400"}
                        `}
                      >
                        {step.label}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {step.estimatedTime}
                      </span>
                    </div>

                    <p
                      className={`text-xs transition-colors duration-200 ${
                        isActive ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Mini progress for active step */}
                    {isActive && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-0.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-[#ff581b] rounded-full animate-pulse" />
                        </div>
                        <span className="text-[10px] text-[#ff581b] font-medium">
                          In progress
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Stats */}
        <ProgressStats
          currentStep={currentStep}
          totalSteps={totalSteps}
          completedSteps={completedSteps}
        />

        {/* Motivational Message */}
        {completedSteps === totalSteps ? (
          <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
            <div className="text-sm font-semibold text-green-700">
              🎉 All done!
            </div>
            <div className="text-xs text-green-600 mt-1">
              You've completed all steps
            </div>
          </div>
        ) : currentStep === totalSteps ? (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
            <div className="text-sm font-semibold text-blue-700">
              🚀 Almost there!
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Complete this final step
            </div>
          </div>
        ) : (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
            <div className="text-xs text-gray-500">Next up:</div>
            <div className="text-sm font-medium text-gray-700 mt-0.5">
              {STEP_DATA[currentStep]?.label || "Complete"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

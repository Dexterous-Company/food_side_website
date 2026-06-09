"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

// Dynamically import to avoid SSR issues
const ClientDatePicker = dynamic(
  () => import("antd").then((mod) => mod.DatePicker),
  { ssr: false },
);

export default function DateTimePill({
  date,
  time,
  onDateChange,
  onTimeChange,
  onInvalidTime,
  formattedDate,
  formattedTime,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const popupHostRef = useRef(null);
  const timeDropdownRef = useRef(null);

  const openPicker = (type) => {
    if (type === "date") {
      setShowDatePicker(true);
      setShowTimeDropdown(false);
    }
  };

  // Close time dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showTimeDropdown && timeDropdownRef.current && !timeDropdownRef.current.contains(event.target)) {
        setShowTimeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTimeDropdown]);

  const getMinimumAllowedTime = (selectedDate) => {
    const selectedDateObj = selectedDate ? new Date(selectedDate) : new Date();
    const now = new Date();
    const minimumTime = new Date(now.getTime() + 60 * 60 * 1000);

    if (selectedDateObj.toDateString() !== now.toDateString()) {
      const nextDayMinimum = new Date(selectedDateObj);
      nextDayMinimum.setHours(6, 0, 0, 0);
      return nextDayMinimum;
    }

    minimumTime.setSeconds(0, 0);
    return minimumTime;
  };

  const handleAntDateChange = (dateValue) => {
    if (dateValue) {
      const selectedDate = dateValue.toDate();
      onDateChange?.(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleTimeSelect = (timeValue) => {
    const [timeStr, period] = timeValue.split(" ");
    const [hours, minutes] = timeStr.split(":").map(Number);
    let newHour = hours;
    if (period === "PM" && hours !== 12) newHour = hours + 12;
    if (period === "AM" && hours === 12) newHour = 0;
    
    const activeDate = date || new Date();
    const minTime = getMinimumAllowedTime(activeDate);
    
    const selectedTime = new Date(activeDate);
    selectedTime.setHours(newHour, minutes, 0, 0);
    
    if (selectedTime >= minTime) {
      onTimeChange?.(selectedTime);
    } else {
      onInvalidTime?.("Please select a time at least 1 hour from now.");
    }
    setShowTimeDropdown(false);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  // Generate time options (15-minute intervals, 12-hour format)
  const timeOptions = Array.from({ length: 24 }, (_, h) => h)
    .flatMap((hour24) => {
      const hour12 = hour24 % 12 || 12;
      const period = hour24 >= 12 ? "PM" : "AM";
      return ["00", "15", "30", "45"].map((min) => ({
        value: `${hour12.toString().padStart(2, "0")}:${min} ${period}`,
        label: `${hour12}:${min} ${period}`,
        hour24: hour24,
        minutes: parseInt(min),
      }));
    });

  // Filter times that are at least 1 hour from now
  const activeDate = date || new Date();
  const minTime = getMinimumAllowedTime(activeDate);
  const validTimeOptions = timeOptions.filter((opt) => {
    const testTime = new Date(activeDate);
    testTime.setHours(opt.hour24, opt.minutes, 0, 0);
    return testTime >= minTime;
  });

  const items = [
    {
      icon: (
        <svg
          className="w-4 h-4 text-[#ff581b]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            strokeLinecap="round"
          />
          <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
      label: "DATE",
      value: formattedDate || "Select date",
      onClick: () => openPicker("date"),
    },
    {
      icon: (
        <svg
          className="w-4 h-4 text-[#ff581b]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" d="M12 6v6l4 2" />
        </svg>
      ),
      label: "TIME",
      value: formattedTime || "Select time",
      isTimeSelect: true,
      onClick: () => setShowTimeDropdown(!showTimeDropdown),
    },
  ];

  return (
    <div ref={popupHostRef} className="relative">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 flex-1 bg-white hover:border-orange-200 transition-colors"
          >
            {item.icon}
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 tracking-wide">
                {item.label}
              </p>
              {item.isTimeSelect ? (
                <div className="relative" ref={timeDropdownRef}>
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="text-xs font-semibold text-gray-800 flex items-center gap-1 cursor-pointer"
                  >
                    {formattedTime || "Select time"}
                    <svg
                      className={`w-3 h-3 text-gray-500 transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Custom Time Dropdown */}
                  {showTimeDropdown && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto min-w-[120px]">
                      {validTimeOptions.map((opt) => (
                        <div
                          key={opt.value}
                          onClick={() => handleTimeSelect(opt.value)}
                          className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-orange-50 ${
                            formattedTime === opt.label ? 'bg-orange-100 text-[#ff581b] font-semibold' : 'text-gray-700'
                          }`}
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="text-xs font-semibold text-gray-800"
                >
                  {item.value}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>


      {/* Date Picker - rendered inside this component, popup stays inside modal */}
      <div className="pointer-events-none absolute left-0 top-full h-0 w-full overflow-visible">
        <ClientDatePicker
          value={date ? dayjs(date) : null}
          onChange={handleAntDateChange}
          disabledDate={disabledDate}
          format="DD-MM-YYYY"
          placeholder="Select date"
          open={showDatePicker}
          onOpenChange={(open) => {
            if (!open) setShowDatePicker(false);
          }}
          getPopupContainer={() => popupHostRef.current || document.body}
          popupClassName="date-time-picker-popup date-time-picker-popup--inside"
          placement="topLeft"
          style={{
            width: 0,
            height: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
          key="date-picker"
        />
      </div>

      <style jsx global>{`
        .date-time-picker-popup {
          z-index: 999999;
        }
        .date-time-picker-popup--inside {
          max-width: min(92vw, 340px);
        }
        .date-time-picker-popup--inside .ant-picker-panel-container {
          max-width: 100%;
          overflow-x: auto;
        }
        .date-time-picker-popup .ant-picker-today-btn {
          color: #ff581b;
        }
        .date-time-picker-popup
          .ant-picker-cell-in-view.ant-picker-cell-selected
          .ant-picker-cell-inner {
          background: #ff581b;
        }
        .date-time-picker-popup
          .ant-picker-cell-in-view.ant-picker-cell-today
          .ant-picker-cell-inner::before {
          border-color: #ff581b;
        }
        .date-time-picker-popup .ant-picker-header button:hover {
          color: #ff581b;
        }
        .date-time-picker-popup
          .ant-picker-time-panel-column
          > li.ant-picker-time-panel-cell-selected
          .ant-picker-time-panel-cell-inner {
          background: #ff581b;
        }
        .date-time-picker-popup .ant-picker-ok button {
          background: #ff581b;
        }
        .date-time-picker-popup .ant-picker-ok button:hover {
          background: #e04d16;
        }
      `}</style>
    </div>
  );
}

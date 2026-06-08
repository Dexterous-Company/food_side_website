"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

// Dynamically import to avoid SSR issues
const ClientDatePicker = dynamic(
  () => import("antd").then((mod) => mod.DatePicker),
  { ssr: false },
);

const ClientTimePicker = dynamic(
  () => import("antd").then((mod) => mod.TimePicker),
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
  const [showTimePicker, setShowTimePicker] = useState(false);
  const popupHostRef = useRef(null);

  const openPicker = (type) => {
    if (type === "date") {
      setShowDatePicker(true);
      setShowTimePicker(false);
    } else {
      setShowTimePicker(true);
      setShowDatePicker(false);
    }
  };

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

  const handleAntTimeChange = (timeValue) => {
    if (timeValue) {
      const selectedTime = timeValue.toDate();
      const activeDate = date || new Date();
      const minTime = getMinimumAllowedTime(activeDate);

      const timeForDate = new Date(activeDate);
      timeForDate.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0,
        0,
      );

      if (timeForDate >= minTime) {
        onTimeChange?.(selectedTime);
      } else {
        onInvalidTime?.("Please select a time at least 1 hour from now.");
      }
    }
    setShowTimePicker(false);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

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
      onClick: () => openPicker("time"),
    },
  ];

  return (
    <div ref={popupHostRef} className="relative">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 flex-1 bg-white hover:border-orange-200 transition-colors text-left"
          >
            {item.icon}
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wide">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {item.value}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute left-0 top-full h-0 w-full overflow-visible">
        {/* Date Picker - rendered inside this component, popup stays inside modal */}
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

        {/* Time Picker - rendered inside this component, popup stays inside modal */}
        <ClientTimePicker
          value={time ? dayjs(time) : null}
          onChange={handleAntTimeChange}
          format="hh:mm A"
          minuteStep={30}
          placeholder="Select time"
          open={showTimePicker}
          onOpenChange={(open) => {
            if (!open) setShowTimePicker(false);
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
          use12Hours
          key="time-picker"
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

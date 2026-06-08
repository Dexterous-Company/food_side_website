"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { formatDate, formatTime } from "./constants";

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
  onDateChange,
  onTimeChange,
  formattedDate,
  formattedTime,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dateButtonRef = useRef(null);
  const timeButtonRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getMinimumAllowedTime = (selectedDate) => {
    const selectedDateObj = new Date(selectedDate);
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
      const minTime = getMinimumAllowedTime(date);

      const timeForDate = new Date(date);
      timeForDate.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0,
        0,
      );

      if (timeForDate >= minTime) {
        onTimeChange?.(selectedTime);
      }
    }
    setShowTimePicker(false);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disabledTime = () => {
    const minTime = getMinimumAllowedTime(date);
    const minHour = minTime.getHours();
    const minMinute = minTime.getMinutes();

    return {
      disabledHours: () => {
        const hours = [];
        for (let i = 0; i < minHour; i++) {
          hours.push(i);
        }
        return hours;
      },
      disabledMinutes: (selectedHour) => {
        if (selectedHour === minHour) {
          const minutes = [];
          for (let i = 0; i < minMinute; i++) {
            minutes.push(i);
          }
          return minutes;
        }
        return [];
      },
    };
  };

  const items = [
    {
      ref: dateButtonRef,
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
      value: formattedDate || formatDate(date),
      onClick: () => setShowDatePicker(true),
    },
    {
      ref: timeButtonRef,
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
      value: formattedTime || formatTime(getMinimumAllowedTime(date)),
      onClick: () => setShowTimePicker(true),
    },
  ];

  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
        {items.map((item) => (
          <button
            key={item.label}
            ref={item.ref}
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

      {/* Date Picker - rendered but invisible, popup will show */}
      {mounted && (
        <ClientDatePicker
          value={dayjs(date)}
          onChange={handleAntDateChange}
          disabledDate={disabledDate}
          format="DD-MM-YYYY"
          placeholder="Select date"
          open={showDatePicker}
          onOpenChange={(open) => {
            if (!open) setShowDatePicker(false);
          }}
          getPopupContainer={() => document.body}
          popupClassName="date-time-picker-popup"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            opacity: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
          key="date-picker"
        />
      )}

      {/* Time Picker - rendered but invisible, popup will show */}
      {mounted && (
        <ClientTimePicker
          value={dayjs(getMinimumAllowedTime(date))}
          onChange={handleAntTimeChange}
          format="hh:mm A"
          minuteStep={30}
          disabledTime={disabledTime}
          placeholder="Select time"
          open={showTimePicker}
          onOpenChange={(open) => {
            if (!open) setShowTimePicker(false);
          }}
          getPopupContainer={() => document.body}
          popupClassName="date-time-picker-popup"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            opacity: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
          use12Hours
          key="time-picker"
        />
      )}

      <style jsx global>{`
        .date-time-picker-popup {
          z-index: 99999;
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

        /* Ensure pickers don't affect layout */
        .ant-picker {
          position: absolute !important;
          width: 0 !important;
          height: 0 !important;
          opacity: 0 !important;
          pointer-events: none !important;
          overflow: hidden !important;
        }
      `}</style>
    </>
  );
}

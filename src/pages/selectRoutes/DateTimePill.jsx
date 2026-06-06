"use client";

import { useState } from "react";

export default function DateTimePill({ 
  date, 
  onDateChange, 
  onTimeChange,
  formattedDate,
  formattedTime 
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(date);

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

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

  const handleDateSelect = (selectedDate) => {
    setTempDate(selectedDate);
  };

  const handleDateConfirm = () => {
    onDateChange?.(tempDate);
    setShowDatePicker(false);
  };

  const renderDatePicker = () => {
    if (!showDatePicker) return null;
    
    const currentYear = tempDate.getFullYear();
    const currentMonth = tempDate.getMonth();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }
    
    const isDateDisabled = (dateToCheck) => {
      return dateToCheck < minDate;
    };
    
    const isDateSelected = (dateToCheck) => {
      return tempDate && tempDate.toDateString() === dateToCheck.toDateString();
    };
    
    const changeMonth = (increment) => {
      setTempDate(new Date(currentYear, currentMonth + increment, 1));
    };
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDatePicker(false)}>
        <div className="bg-white rounded-2xl max-w-md w-full p-5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h3 className="text-lg font-semibold">
              {tempDate.toLocaleString('default', { month: 'long' })} {currentYear}
            </h3>
            
            <button 
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-3">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div key={index} className="aspect-square p-1">
                {day && (
                  <button
                    onClick={() => !isDateDisabled(day) && handleDateSelect(day)}
                    disabled={isDateDisabled(day)}
                    className={`w-full h-full rounded-full text-sm font-medium transition-colors
                      ${isDateDisabled(day) 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : isDateSelected(day)
                          ? 'bg-[#ff581b] text-white'
                          : 'hover:bg-orange-50 text-gray-700'
                      }
                    `}
                  >
                    {day.getDate()}
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex gap-2 mt-5 pt-3 border-t">
            <button
              onClick={() => setShowDatePicker(false)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDateConfirm}
              className="flex-1 px-4 py-2 bg-[#ff581b] text-white rounded-lg hover:bg-[#e04d16] transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTimePicker = () => {
    if (!showTimePicker) return null;
    
    const times = [];
    const selectedDateObj = new Date(date);
    const minTime = getMinimumAllowedTime(selectedDateObj);
    const startHour = minTime.getHours();
    const startMinute = minTime.getMinutes();
    
    if (startHour <= 23) {
      for (let hour = startHour; hour < 24; hour++) {
        const firstMinute = hour === startHour ? startMinute : 0;
        for (let minute = firstMinute; minute < 60; minute += 30) {
          const time = new Date(selectedDateObj);
          time.setHours(hour, minute, 0, 0);
          times.push(time);
        }
      }
    }
    
    const formatTimeOption = (time) => {
      let hours = time.getHours();
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes} ${ampm}`;
    };
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowTimePicker(false)}>
        <div className="bg-white rounded-2xl max-w-sm w-full p-5" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-lg font-semibold mb-4">Select Time</h3>
          
          {times.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p>No available time slots for today</p>
              <p className="text-sm mt-1">Please select another date</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
              {times.map((time, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onTimeChange?.(time);
                    setShowTimePicker(false);
                  }}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:border-[#ff581b] hover:bg-orange-50 transition-colors"
                >
                  {formatTimeOption(time)}
                </button>
              ))}
            </div>
          )}
          
          <button
            onClick={() => setShowTimePicker(false)}
            className="w-full mt-4 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const items = [
    {
      icon: (
        <svg className="w-4 h-4 text-[#ff581b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round"/>
          <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
      ),
      label: "DATE",
      value: formattedDate || formatDate(date),
      onClick: () => setShowDatePicker(true),
    },
    {
      icon: (
        <svg className="w-4 h-4 text-[#ff581b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path strokeLinecap="round" d="M12 6v6l4 2"/>
        </svg>
      ),
      label: "TIME",
      value: formattedTime || formatTime(getMinimumAllowedTime(date)),
      onClick: () => setShowTimePicker(true),
    },
  ];

  return (
    <>
      <div className="flex gap-2 flex-shrink-0">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 flex-1 bg-white hover:border-orange-200 transition-colors text-left"
          >
            {item.icon}
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wide">{item.label}</p>
              <p className="text-sm font-semibold text-gray-800">{item.value}</p>
            </div>
          </button>
        ))}
      </div>
      
      {renderDatePicker()}
      {renderTimePicker()}
    </>
  );
}
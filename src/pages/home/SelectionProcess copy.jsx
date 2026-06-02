import React from "react";
import {
  FaBus,
  FaPlane,
  FaTrain,
  FaHotel,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdSwapHoriz } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";

const SelectionProcess = () => {
  return (
    <section className="w-full bg-[#f4f6f8] py-4 px-3">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-5 px-4 md:px-6 py-3 border-b border-gray-100">
            <button className="relative flex items-center gap-2">
              <FaBus className="text-[#d84e55] text-[16px]" />
              <span className="font-semibold text-[13px] text-gray-900">
                Buses
              </span>

              <div className="absolute -bottom-[13px] left-0 w-full h-[3px] bg-[#d84e55] rounded-full" />
            </button>

            <button className="flex items-center gap-2">
              <FaPlane className="text-gray-500 text-[16px]" />
              <span className="text-[13px] text-gray-600">Flights</span>
            </button>

            <button className="flex items-center gap-2">
              <FaTrain className="text-gray-500 text-[16px]" />
              <span className="text-[13px] text-gray-600">Trains</span>
            </button>

            <button className="flex items-center gap-2">
              <FaHotel className="text-gray-500 text-[16px]" />
              <span className="text-[13px] text-gray-600">Hotels</span>
            </button>

            <div className="hidden xl:block ml-auto text-[12px] font-medium text-gray-700">
              India's Fastest Bus Ticket Booking Platform
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block p-4">
            <div className="relative flex items-stretch border border-gray-200 rounded-xl overflow-hidden">
              {/* From */}
              <div className="flex-1 bg-[#fafafa] px-4 py-3 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500 text-[14px]" />

                <div className="w-full">
                  {/* <p className="text-[10px] text-gray-500 mb-1">From</p> */}
                  <input
                    placeholder="Leaving From"
                    className="w-full bg-transparent outline-none text-[13px] font-medium"
                  />
                </div>
              </div>

              {/* Swap */}
              <div className="absolute left-[30.4%] top-1/2 -translate-x-1/2 -translate-y-1/2">
                <button className="w-8 h-8 rounded-full bg-white border border-gray-300 shadow flex items-center justify-center">
                  <MdSwapHoriz className="text-[18px] text-gray-600" />
                </button>
              </div>

              {/* To */}
              <div className="flex-1 bg-[#fafafa] border-l border-gray-200 px-4 py-2 flex items-center gap-2 pl-10 ">
                <FaMapMarkerAlt className="text-gray-500 text-[14px]" />
                <div className="w-full">
                  <input
                    placeholder="Going To"
                    className="w-full bg-transparent outline-none text-[13px] font-medium"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="w-[180px] border-l border-gray-200 px-4 py-3 flex items-center gap-2">
                <IoCalendarOutline className="text-[16px] text-gray-600" />

                <div>
                  <p className="text-[10px] text-gray-500">Departure</p>
                  <p className="text-[13px] font-semibold">01 Jun 2026</p>
                </div>
              </div>

              {/* Today */}
              <button className="w-[90px] border-l border-gray-200 text-[12px] font-medium hover:bg-gray-50">
                Today
              </button>

              {/* Tomorrow */}
              <button className="w-[100px] border-l border-gray-200 text-[12px] font-medium hover:bg-gray-50">
                Tomorrow
              </button>

              {/* Search */}
              <button className="w-[140px] bg-[#d84e55] hover:bg-[#c74249] text-white font-semibold text-[14px]">
                Search →
              </button>
            </div>

            <p className="text-[#d84e55] text-[11px] mt-1">
              Please enter your Origin City
            </p>
          </div>

          {/* Mobile */}
          <div className="lg:hidden p-3">
            <div className="space-y-2">
              <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500 text-[13px]" />
                <input
                  placeholder="Leaving From"
                  className="w-full outline-none text-[13px]"
                />
              </div>

              <div className="flex justify-center">
                <button className="w-8 h-8 rounded-full border bg-white shadow">
                  <MdSwapHoriz className="mx-auto text-[18px]" />
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500 text-[13px]" />
                <input
                  placeholder="Going To"
                  className="w-full outline-none text-[13px]"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-2">
                <IoCalendarOutline className="text-[16px]" />

                <div>
                  <p className="text-[10px] text-gray-500">Departure</p>
                  <p className="text-[13px] font-semibold">01 Jun 2026</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="h-10 border rounded-lg text-[12px]">
                  Today
                </button>

                <button className="h-10 border rounded-lg text-[12px]">
                  Tomorrow
                </button>
              </div>

              <button className="w-full h-10 rounded-lg bg-[#d84e55] text-white text-[13px] font-semibold">
                Search →
              </button>

              <p className="text-[#d84e55] text-[10px]">
                Please enter your Origin City
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectionProcess;
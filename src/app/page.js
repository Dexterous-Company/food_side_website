
"use client";
import About from "@/views/home/About";
import HeroSection from "@/views/home/HeroSection";
import RestaurantsMainPage from "@/views/home/RestaurantsMainPage";
import SelectionProcess from "@/views/routes/SelectionProcess";
import DeliverySelectionModal from "@/views/selectRoutes/DeliverySelectionModal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  resetAllDeliveryData, 
  selectCompleteDeliveryData,
  selectIsDeliveryPointSelected,
  selectIsRouteSelected,
  selectIsDestinationSet
} from "@/redux/delivery/deliverySlice";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const isDestinationSet = useSelector(selectIsDestinationSet);
  const isRouteSelected = useSelector(selectIsRouteSelected);
  const isDeliveryPointSelected = useSelector(selectIsDeliveryPointSelected);
  const deliveryData = useSelector(selectCompleteDeliveryData);

  useEffect(() => {
    setIsClient(true);
    
    // Check if modal should open based on saved data
    const hasData = localStorage.getItem('deliveryDataShown');
    const hasCompleteSelection = isDestinationSet || isRouteSelected || isDeliveryPointSelected;
    
    if (!hasData && !hasCompleteSelection) {
      setOpen(true);
      localStorage.setItem('deliveryDataShown', 'true');
    }
  }, [isDestinationSet, isRouteSelected, isDeliveryPointSelected]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinish = (bookingData) => {
    console.log("Booking completed:", bookingData);
    setOpen(false);
    // Save to localStorage for reference
    localStorage.setItem('lastBooking', JSON.stringify(bookingData));
  };

  const handleReset = () => {
    dispatch(resetAllDeliveryData());
    localStorage.removeItem('deliveryDataShown');
    localStorage.removeItem('lastBooking');
    setOpen(true);
  };


  return (
    <div>
      <div className="relative">
        <HeroSection />
      </div>
      

      <DeliverySelectionModal
        isOpen={open}
        onClose={handleClose}
        onFinish={handleFinish}
      />
      
      {/* New Booking button - visible only on mobile */}
      <button 
        onClick={handleReset}
        className="lg:hidden fixed bottom-40 sm:bottom-10 right-5 sm:right-4 bg-[#ff581b] text-white px-4 py-3 rounded-lg shadow-lg z-50 text-sm font-semibold flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New Booking
      </button>
      
      <div className="-mt-30 relative z-[20] lg:z-[20]">
        <SelectionProcess />
      </div>
      <RestaurantsMainPage />
      <About />
    </div>
  );
};

export default Page;
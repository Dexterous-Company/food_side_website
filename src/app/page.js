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

  // Don't render modal until client-side to avoid hydration issues
  if (!isClient) {
    return (
      <div>
        <div className="relative">
          <HeroSection />
        </div>
        <div className="-mt-30 relative" style={{zIndex:99}}>
          <SelectionProcess />
        </div>
        <RestaurantsMainPage />
        <About />
      </div>
    );
  }

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
      
      <button 
        onClick={handleReset}
        className="fixed bottom-4 right-4 bg-[#ff581b] text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm"
      >
        New Booking
      </button>
      
      <div className="-mt-30 relative" style={{zIndex:99}}>
        <SelectionProcess />
      </div>
      <RestaurantsMainPage />
      <About />
    </div>
  );
};

export default Page;
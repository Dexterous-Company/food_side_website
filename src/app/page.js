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
  selectIsDestinationSet,
} from "@/redux/delivery/deliverySlice";
import { Marquee } from "@/views/home/Marquee";

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
    const hasData = localStorage.getItem("deliveryDataShown");
    const hasCompleteSelection =
      isDestinationSet || isRouteSelected || isDeliveryPointSelected;

    if (!hasData && !hasCompleteSelection) {
      setOpen(true);
      localStorage.setItem("deliveryDataShown", "true");
    }
  }, [isDestinationSet, isRouteSelected, isDeliveryPointSelected]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinish = (bookingData) => {
    console.log("Booking completed:", bookingData);
    setOpen(false);
    // Save to localStorage for reference
    localStorage.setItem("lastBooking", JSON.stringify(bookingData));
  };

  const handleReset = () => {
    dispatch(resetAllDeliveryData());
    localStorage.removeItem("deliveryDataShown");
    localStorage.removeItem("lastBooking");
    setOpen(true);
  };

  return (
    <div>
      <div className="relative md:block hidden pt-10">
        <HeroSection />
      </div>

      <div className="sm:hidden block">
        <DeliverySelectionModal
          isOpen={open}
          onClose={handleClose}
          onFinish={handleFinish}
        />
      </div>

      <div className="-mt-120 relative z-[20] lg:z-[20] md:block hidden ">
        <SelectionProcess />
      </div>
      <div className="md:block hidden md:mt-78">
        <RestaurantsMainPage />
        <Marquee />
        <About />
      </div>
    </div>
  );
};

export default Page;

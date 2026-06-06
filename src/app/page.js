"use client";
import About from "@/pages/home/About";
import Chefs from "@/pages/home/Chefs";
import HeroSection from "@/pages/home/HeroSection";
import History from "@/pages/home/History";
import Menu from "@/pages/home/Menu";
import Newsletter from "@/pages/home/Newsletter";
import SelectionCompletedProcess from "@/pages/home/SelectionCompletedProcess";
import Stats from "@/pages/home/Stats";
import Testimonials from "@/pages/home/Testimonials";
import SelectionProcess from "@/pages/routes/SelectionProcess";
import DeliverySelectionModal from "@/pages/selectRoutes/DeliverySelectionModal";
import React, { useState } from "react";

const page = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <HeroSection />
      {/* <SelectionCompletedProcess isOpen={open} onClose={() => setOpen(false)} /> */}
      <DeliverySelectionModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onFinish={(bookingData) => {
          // bookingData = { towards, route, deliveryPoint, details }
          console.log(bookingData);
        }}
      />
      <SelectionProcess />
      <About />
      {/* <History /> */}
      <Menu />
      {/* <Stats /> */}
      {/* <Chefs /> */}
      {/* <Testimonials /> */}
      {/* <Newsletter /> */}
    </div>
  );
};

export default page;

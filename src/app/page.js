import About from "@/pages/home/About";
import Chefs from "@/pages/home/Chefs";
import HeroSection from "@/pages/home/HeroSection";
import History from "@/pages/home/History";
import Menu from "@/pages/home/Menu";
import Newsletter from "@/pages/home/Newsletter";
import Stats from "@/pages/home/Stats";
import Testimonials from "@/pages/home/Testimonials";
import SelectionProcess from "@/pages/routes/SelectionProcess";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroSection />
      <SelectionProcess />
      <Menu />
      <About />
      {/* <History /> */}
      {/* <Stats /> */}
      {/* <Chefs /> */}
      {/* <Testimonials /> */}
      {/* <Newsletter /> */}
    </div>
  );
};

export default page;

import RestaurantsMainPage from "@/views/home/RestaurantsMainPage";
import SelectedRoute from "@/views/mobileHome/SelectedRoute";
import React from "react";

const page = () => {
  return (
    <>
      <div className="md:hidden block ">
        <SelectedRoute />
        <div>
          <div className="mx-2 md:mb-0 mb-20">
            <RestaurantsMainPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

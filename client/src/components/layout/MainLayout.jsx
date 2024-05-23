import React from "react";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading/GlobalLoading";
import Header from "../common/Header/Header";
import { Logo } from "../common/Logo";
import Footer from "../common/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <Header />
      {/* Header */}
      <div className="w-full  mx-auto bg-white">
        {/* global loading */}
        <GlobalLoading />
        {/* global loading */}
        {/* Main */}
        <div className="pt-[76px]">
          {" "}
          <Outlet />
        </div>
        {/* Main */}
      </div>
      {/* Footer */}
      <Footer />
      {/* Footer */}
    </div>
  );
};

export default MainLayout;

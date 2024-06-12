import React from "react";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading/GlobalLoading";
import Header from "../common/Header/Header";
import { Logo } from "../common/Logo";
import Footer from "../common/Footer/Footer";
import Item from "../common/Item";

const MainLayout = () => {
  return (
    <div className="mx-auto">
      {/* Header */}
      <Header />
      {/* Header */}
      <div className="w-full bg-white">
        {/* global loading */}
        <GlobalLoading />
        {/* global loading */}
        {/* Main */}
        <div className="pt-[76px] mx-auto">
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

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading/GlobalLoading";
import Header from "../common/Header/Header";
import { Logo } from "../common/Logo";
import Footer from "../common/Footer/Footer";
import Item from "../common/Item";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";

const MainLayout = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(setGlobalLoading(false))
    }, 1500);
  }, [dispatch])
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

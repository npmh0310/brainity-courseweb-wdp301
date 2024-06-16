import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./GlobalLoading.css";
import logoTest from '../../../assets/images/logoBrain.svg'
import { getGlobalLoading, setGlobalLoading } from "../../../redux/features/globalLoadingSlice";

const GlobalLoading = () => {
  const globalLoading = useSelector((state) => state.globalLoading.globalLoading);
  return (
    <>
      <div
        style={{
          display: globalLoading ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          zIndex: 999,
        }}
      >
        {/* <section className="loading"> */}
        {/* <div className="one"></div> */}
        <section className="loading2">
          <img className="w-[340px]" src={logoTest} alt="" />

        </section>
        {/* </section> */}
      </div>
    </>
  );
};

export default GlobalLoading;

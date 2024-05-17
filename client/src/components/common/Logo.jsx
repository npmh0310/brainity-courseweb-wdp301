import React from "react";
import ImgLogin from "../../assets/images/logo_noBg.png";
export const Logo = () => {
  return (
    <div className="flex w-[100%] justify-center items-center ">
      <img
        src={ImgLogin}
        className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
        alt="Brainity Logo"
      />
      <h1 className="text-2xl text-third font-logoTitle font-semibold">
        Brainity
      </h1>
    </div>
  );
};

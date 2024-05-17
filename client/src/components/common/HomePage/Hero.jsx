import React from "react";
import HaftHero from '../../../assets/images/haftHero.jpg'
const Hero = () => {
  return (
    <section className=" lg:bg-center h-[90vh] flex ">
      <div className="container m-auto">
        <div className="flex items-center flex-col lg:flex-row mt-[-80px] lg:gap-x-[60px]">
          <div className="flex-1 mt-8 lg:min-w-[620px] text-center lg:text-left order-1 lg:-order-1">
            <h1 className="font-secondary font-extrabold text-[36px] lg:text-[56px] lg:leading-tight lg:max-w-[855px] ">
              Unlocking Eternity
            </h1>
            <h1 className=" font-secondary font-extrabold text-[30px] lg:text-[48px] lg:leading-tight lg:max-w-[855px] text-primary">
              Through Knowledge
            </h1>
            <h2 className="my-[20px] text-lg">
              {" "}
              Expand Your Horizons and Transform Your Future with Brainity\'s
              Comprehensive Online Learning Platform
            </h2>
            <button className="bg-[#04ddb2] hover:bg-[#03ecbe] px-[36px] py-[18px] mt-[10px] hover:transform-[scale3d(1.05,1.05,1.05)] text-xl font-semibold text-white rounded-[32px]  backdrop-blur-md transition  transform hover:scale-105">
            Learn Now
            </button>
          </div>
          <div className="flex-1 flex justify-center items-center ">
            <img
              src={HaftHero}
              className="lg:h-[80%] lg:w-[90%] xl:w-[70%] w-[40%] h-[30%] "
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

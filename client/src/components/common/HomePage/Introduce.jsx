import React, { useEffect } from "react";
import imgIntro from "../../../assets/images/homepage/beigeWaves.png";
import imgIntroWhite from "../../../assets/images/homepage/whiteWaves.png";
import imgContent1 from "../../../assets/images/homepage/intro3.jpg";
import imgContent2 from "../../../assets/images/homepage/intro1.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Introduce = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);
  return (
    <section className="section relative">
      {/* notuse */}
      <div className="w-full">
        <img className="w-full" src={imgIntro} alt="" />
      </div>
      {/* notuse */}

      <div className="flex flex-col items-center bg-[#fff4e4] pb-32 lg:pb-64 gap-y-10">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start container items-center gap-y-8 relative">
          <div
            className="w-1/2 flex rounded-xl justify-center lg:justify-end relative"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <img
              className="object-cover rounded-xl  w-[90%] "
              src={imgContent1}
              alt=""
            />
          </div>
          <div className="lg:w-1/2 flex flex-col text-center lg:text-left gap-y-2 lg:gap-y-10 bottom-18 right-10 mx-12 lg:absolute ">
            <h1
              className="lg:text-7xl text-4xl text-primary leading-[62px] font-extrabold"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              Hi, we are Brainity
            </h1>
            <div className="flex flex-col pr-5 lg:ml-32 gap-y-4">
              <h2 className="text-xl font-secondary font-medium text-four">
                Welcome to our online course system - Brainity
              </h2>
              <span className="text-lg">
                "where knowledge meets innovation. We offer a learning platform
                with a various array of courses spanning diverse subjects. From
                technology, business to creative arts and personal development,
                our ambition is to enhance your professional skills and provide
                endless job opportunities. Empower yourself with cutting-edge
                skills through our comprehensive online learning platform !!!"
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row container gap-y-8 items-center">
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1 flex flex-col gap-y-4 bottom-1 right-14 mx-12">
            <div className="flex flex-col px-5 gap-y-4">
              <h2 className="text-xl font-secondary font-medium text-four">
                Unlocking Learning Potential through User-Friendly Navigation!
              </h2>
              <span className="text-lg">
                "With the focus on user experience, Brainity ensures that every
                individual can find our platform intuitive and easy to navigate.
                Our user-friendly interface is designed to simplify the learning
                journey, allowing users to seamlessly explore courses and access
                resources with confidence and ease. Our ultimate target is to
                empower individuals to reach their full potential and achieve
                their goals with confidence."
              </span>
            </div>
          </div>
          <div
            className="w-1/2 order-1 lg:order-2 flex justify-start  relative"
            data-aos="fade-left"      
          >
            <div
              className="absolute w-[90%] rounded-xl  h-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right,rgb(255, 244, 228, 0.8), rgb(255, 250, 228, 0.2))",
              }}
            ></div>
            <img
              className="object-cover rounded-xl w-[90%] "
              src={imgContent2}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <img className="w-full" src={imgIntroWhite} alt="" />
      </div>
    </section>
  );
};
export default Introduce;

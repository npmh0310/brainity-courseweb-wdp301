import React, { useEffect } from "react";
import {
  HiAcademicCap,
  HiAnnotation,
  HiUserGroup,
  HiBriefcase,
} from "react-icons/hi";
import imgIntroWhite from "../../../assets/images/homepage/whiteWaves.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
function Features() {
  const features = {
    items: [
      {
        icon: <HiAcademicCap />,
        title: "1000+",
        subtitle: "Customer",
      },
      {
        icon: <HiAnnotation />,
        title: "Professional",
        subtitle: "Customer Support",
      },
      {
        icon: <HiUserGroup />,
        title: "Connect",
        subtitle: "Create a community",
      },
      {
        icon: <HiBriefcase />,
        title: "Quality",
        subtitle: "Job guarantee",
      },
    ],
  };

  useEffect(() => {
    AOS.init({ duration: 1400, once: true });
    window.addEventListener("load", AOS.refresh);
  }, []);
  return (
    <section className="pb-20 text-center">
      <div className="container mx-auto">
        <div
          className="mb-8 flex flex-col gap-y-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h1 className="block text-center text-7xl uppercase font-bold font-third text-primary ">
            Brainity
          </h1>
          <span className="max-x-[639px] mx-auto mb-[30px] lg:mb-[30px] text-center text-lg">
            "Discover Limitless Learning: Explore Our Brainity Courses Today!"
          </span>
        </div>
        <div className="  grid justify-items-center grid-cols-2 gap-x-8 lg:grid-cols-4 lg:gap-[30px]">
          {features.items.map((item, index) => {
            return (
              <div
                className="container flex flex-col justify-center items-center gap-y-2 bg-slate-50 max-w-[292px] h-[220px] m-3 rounded-xl shadow-md fea-item"
                key={index}
                data-aos="fade-left"
                data-aos-delay={300 + index * 200}
              >
                <div className="title text-6xl">{item.icon}</div>
                <h4 className="font-semibold text-base sm:text-xl text-primary">
                  {item.title}
                </h4>
                <p>{item.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;

import React from "react";
import {
  HiAcademicCap,
  HiAnnotation,
  HiUserGroup,
  HiBriefcase,
} from "react-icons/hi";
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
  return (
    <section className="section text-center bg-gray-100">
      <div className="container mx-auto">
        <div>
          <h1 className="title text-6xl uppercase text-primary mb-6">
            brainity
          </h1>
          <p className="max-x-[639px] mx-auto mb-[50px] lg:mb-[50px] text-lg">
            Discover Limitless Learning: Explore Our Brainity Courses Today!
          </p>
        </div>
        <div className="  grid justify-items-center grid-cols-2 gap-x-8 lg:grid-cols-4 lg:gap-[30px]">
          {features.items.map((item, index) => {
            return (
              <div
                className="container flex flex-col justify-center items-center gap-y-2 bg-slate-50 max-w-[292px] h-[220px] m-3 rounded-xl shadow-lg fea-item "
                key={index}
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

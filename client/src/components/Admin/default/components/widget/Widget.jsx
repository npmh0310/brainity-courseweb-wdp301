import React from "react";

const Card = ({ children, extraClasses }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl flex ${extraClasses}`}>
      {children}
    </div>
  );
};

const Widget = ({ icon, title, subtitle }) => {
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-gray-100 p-3">
          <span className="flex items-center text-primary">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600">{title}</p>
        <h4 className="text-xl font-bold text-navy-700">
          {subtitle}
        </h4>
      </div>
    </Card>
  );
};

export default Widget;

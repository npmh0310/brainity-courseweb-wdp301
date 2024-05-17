import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import menuConfigs from "../../../configs/menu.configs.js";
function HeaderMobile() {
  return (
    <div className=" w-full h-[80%] shadow-2xl flex justify-center items-center flex-col gap-y-12">
      <div className="container">
          <div className="items-center flex w-full ">
            <input
              type="text"
              className="w-full h-[42px] border-2 border-gray-200 px-8  py-3 text-xs rounded-l-full  focus:outline-none"
              placeholder="search anything..."
            />
            <button className="w-12 h-[42px] border-2 border-gray-200 border-l-0 rounded-r-full relative">
              <FontAwesomeIcon
                className="text-third w-4 transition-transform duration-700
                    00 ease-in-out hover:scale-125"
                icon={faSearch}
              />
            </button>
          </div>
      </div>
      <div className="container ">
        <ul className="text-center h-full flex justify-center items-start flex-col gap-y-10">
          {menuConfigs.main.map((item, index) => {
            return (
              <li
                className="capitalize text-[18px] font-medium hover:text-accent"
                key={index}
              >
                <a href={item.path}>{item.display}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="container flex justify-center items-center  ">
        <button className="bg-[#04ddb2] hover:bg-[#03ecbe] w-[95%] py-[12px] hover:transform-[scale3d(1.05,1.05,1.05)] text-md font-semibold text-white rounded-[32px] transition  transform hover:scale-105 capitalize">
          login
        </button>
      </div>
    </div>
  );
}

export default HeaderMobile;

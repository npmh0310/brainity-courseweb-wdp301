import React from "react";
import IconFacebook from "../../assets/svgicon/icons8-facebook.svg";
import IconLinkedin from "../../assets/svgicon/icons8-linkedin.svg";
import IconGithub from "../../assets/svgicon/iconmonstr-github-1.svg";

const InformationProfile = () => {
  return (
    <div className="w-full md:w-[65%]  bg-white mt-8  border py-8 px-8 border-gray-200 rounded-md">
      <h1 className="text-2xl uppercase font-bold border-b-[1px] border-b-gray-200 pb-6 text-third text-center italic">
        Information profile
      </h1>
      <div className="py-3">
        <form action="">
          <div className="container border-b-[1px] border-b-gray-200 py-3 ">
            <h1 className=" text-third font-semibold  ">Basic Information:</h1>
            <div className="mx-3 my-5 flex flex-col gap-y-7">
              <div className="">
                <label
                  className="block text-sm text-gray-900 mb-3 italic"
                  htmlFor=""
                >
                  Full name:
                </label>
                <input
                  className=" h-10 text-gray-900 sm:text-sm  block w-full px-5 border border-gray-200 rounded-lg  focus:outline-none focus:border-primary focus:ring-1 focus:ring-sky-300 hover:border-gray-700 "
                  name="fullname"
                  type="text"
                  placeholder="Nguyen Phuoc Minh Hieu"
                  id="fullname"
                />
              </div>
              <div className="">
                <label
                  className="block text-sm text-gray-900 mb-3 italic"
                  htmlFor=""
                >
                  Email:
                </label>
                <input
                  className=" h-10 text-gray-900 sm:text-sm  block w-full px-5 border border-gray-200 rounded-lg  focus:outline-none focus:border-primary focus:ring-1 focus:ring-sky-300 hover:border-gray-700 "
                  name="email"
                  type="email"
                  placeholder="nguyenphuocminhhieu310@gmail.com"
                  id="email"
                />
              </div>
              <div className="">
                <label
                  className="block text-sm text-gray-900 mb-3 italic"
                  htmlFor=""
                >
                  Address:
                </label>
                <input
                  className=" h-10 text-gray-900 sm:text-sm  block w-full px-5 border border-gray-200 rounded-lg  focus:outline-none focus:border-primary focus:ring-1 focus:ring-sky-300 hover:border-gray-700 "
                  name="address"
                  type="text"
                  placeholder="your address"
                  id="address"
                />
              </div>
              <div className="">
                <label
                  className="block text-sm text-gray-900 mb-3 italic"
                  htmlFor=""
                >
                  Bio:
                </label>
                <textarea
                  className=" h-24 text-gray-900 sm:text-sm  block w-full px-5 py-2 border border-gray-200 rounded-lg  focus:outline-none focus:border-primary focus:ring-1 focus:ring-sky-300 hover:border-gray-700 "
                  name="bio"
                  placeholder="say something about yourself..."
                  id="bio"
                />
              </div>
            </div>
          </div>
          <div className="container py-6 ">
            <h1 className="text-third font-semibold ">Links:</h1>
            <div className="mx-3 my-5 flex flex-col gap-y-7">
              <div className="flex justify-center items-center gap-x-5">
                <img src={IconFacebook} className="w-8 h-8 " alt="" />
                <input
                  className=" h-10 text-gray-900 sm:text-sm  block w-full px-5 border border-gray-200 rounded-lg  focus:outline-none focus:border-primary focus:ring-1 focus:ring-sky-300 hover:border-gray-700 "
                  name="facebook"
                  type="text"
                  placeholder="http://www.facebook.com/"
                  id="facebook"
                />
              </div>
              <div className="flex justify-center items-center gap-x-5">
                <img src={IconLinkedin} className="w-8 h-8 " alt="" />
                <input
                  className=" h-10 text-gray-900 sm:text-sm  block w-full px-5 border border-gray-200 rounded-lg  focus:outline-none focus:border-primary focus:ring-1 focus:ring-sky-300 hover:border-gray-700 "
                  name="linkedin"
                  type="text"
                  placeholder="https://www.linkedin.com/in/"
                  id="linkedin"
                />
              </div>
              <div className="flex justify-center items-center gap-x-5">
                <img src={IconGithub} className="w-8 h-8 " alt="" />
                <input
                  className=" h-10 text-gray-900 sm:text-sm  block w-full px-5 border border-gray-200 rounded-lg  focus:outline-none focus:border-primary focus:ring-1 focus:ring-sky-300 hover:border-gray-700 "
                  name="github"
                  type="text"
                  placeholder="http://www.github.com/"
                  id="github"
                />
              </div>
            </div>
          </div>
          <div className="container">
            <button className="px-6 py-2 border font-medium border-primary text-white bg-primary  rounded-full">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InformationProfile;

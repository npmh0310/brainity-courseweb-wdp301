import React, { useEffect, useState } from "react";

import IconFacebook from "../../../assets/svgicon/icons8-facebook.svg";
import IconLinkedin from "../../../assets/svgicon/icons8-linkedin.svg";
import IconGithub from "../../../assets/svgicon/iconmonstr-github-1.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../fetchData/User";
import toast from "react-hot-toast";
import { validateToken } from "../../../redux/features/authSlice";
const InformationProfile = () => {

  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        bio: user.bio ||  "",
        facebook: user.facebook ||  "",
        linkedin: user.linkedin ||  "",
        github: user.github || "",
        phoneNumber: user.phoneNumber || ""
      })
    }
  },[user])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
   
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await updateProfile(formData)
    if(res.status === 200) {
      dispatch(validateToken());
      toast.success("Successfully updated")

    }
    else{
      toast.error("Failed to update")
    }
  }

  
  


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
                  name="name"
                  type="text"
                  placeholder={user.name}
                  id="name"
                  onChange={handleChange}
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
                  placeholder={user.email}
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label
                  className="block text-sm text-gray-900 mb-3 italic"
                  htmlFor=""
                >
                  PhoneNumber:
                </label>
                <input
                  className=" h-10 text-gray-900 sm:text-sm  block w-full px-5 border border-gray-200 rounded-lg  focus:outline-none focus:border-primary focus:ring-1 focus:ring-sky-300 hover:border-gray-700 "
                  name="phoneNumber"
                  type="tel"
                  placeholder={user.phoneNumber}
                  id="phoneNumber"
                  onChange={handleChange}
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
                  placeholder={user.address}
                  id="address"
                  onChange={handleChange}
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
                  placeholder={user.bio}
                  id="bio"
                  onChange={handleChange}
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
                  placeholder={user.facebook}
                  id="facebook"
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center items-center gap-x-5">
                <img src={IconGithub} className="w-8 h-8 " alt="" />
                <input
                  className=" h-10 text-gray-900 sm:text-sm  block w-full px-5 border border-gray-200 rounded-lg  focus:outline-none focus:border-primary focus:ring-1 focus:ring-sky-300 hover:border-gray-700 "
                  name="github"
                  type="text"
                  placeholder={user.github}
                  id="github"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <button className="px-6 py-2 border font-medium border-primary text-white bg-primary  rounded-full" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InformationProfile;

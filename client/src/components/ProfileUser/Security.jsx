import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PasswordInput from "./PasswordInput";
const Security = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault(); //? Ngăn mất tiêu điểm
  };

  return (
    <div className="w-full md:w-[65%]  bg-white mt-8  border py-8 px-8 border-gray-200 rounded-md">
      <h1 className="text-2xl uppercase font-bold border-b-[1px] border-b-gray-200 pb-6 text-third text-center italic ">
        Security and login
      </h1>
      <div className="py-3">
        <form action="">
          <div className="container  py-3 ">
            <h1 className=" text-third font-semibold  ">Change password:</h1>
            <div className="mx-3 my-5 flex flex-col gap-y-7">
              <PasswordInput
                label="Old password:"
                name="oldpassword"
                id="oldpassword"
              />
              <PasswordInput
                label="New password:"
                name="newpassword"
                id="newpassword"
              />
              <PasswordInput
                label="Repeat new password:"
                name="repeatnewpassword"
                id="repeatnewpassword"
              />
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

export default Security;

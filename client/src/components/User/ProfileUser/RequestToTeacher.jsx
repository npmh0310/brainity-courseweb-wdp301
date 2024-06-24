import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PasswordInput from "./PasswordInput";
const RequestToTeacher = () => {
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
        Request To Teacher
      </h1>
      <div className="py-3"></div>
    </div>
  );
};

export default RequestToTeacher;

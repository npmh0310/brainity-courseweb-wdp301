import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
const PasswordInput = ({ label, name, id }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault(); //? cho ni de chan viec mat di focus input
  };

  return (
    <div className="relative">
      <label className="block text-sm text-gray-900 mb-3 italic" htmlFor={id}>
        {label}
      </label>
      <input
        className="h-10 text-gray-900 sm:text-sm block w-full px-5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-sky-300 hover:border-gray-700"
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder="********"
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setShowPassword(false);
        }}
      />
      {isFocused && (
        <div
          className="absolute right-4 top-[58%] text-gray-400 cursor-pointer"
          onClick={handleShowPassword}
          onMouseDown={handleMouseDown}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;

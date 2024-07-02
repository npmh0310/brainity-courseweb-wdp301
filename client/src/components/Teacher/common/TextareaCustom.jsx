import React, { forwardRef } from "react";
import "./input.css";
// Assuming you have a CSS file for styling

const TextareaCustom = forwardRef(({ id, value, onChange }, ref) => {
  return (
    <div className=" w-full">
      <textarea
        id={id}
        className="input w-full text-sm placeholder-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder={value}
        type="text"
        onChange={onChange}
        ref={ref}
      ></textarea>
    </div>
  );
});

export default TextareaCustom;

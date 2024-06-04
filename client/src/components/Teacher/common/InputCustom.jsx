import React from "react";
import "./input.css";
const InputCustom = ({ id, display }) => {
  return (
    <div className="form w-full">
      <input
        id={id}
        className="input w-full text-sm placeholder-xs"
        placeholder={display}
        type="text"
      />
    </div>
  );
};

export default InputCustom;

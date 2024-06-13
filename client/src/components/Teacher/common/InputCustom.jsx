import React, { forwardRef } from "react";
import "./input.css";
const InputCustom = forwardRef(({ id, value, onChange }, ref) => {
  return (
    <div className="form w-full">
      <input
        id={id}
        className="input w-full text-sm placeholder-xs"
        placeholder={value}
        type="text"
        onChange={onChange}
        ref={ref}
      />
    </div>
  );
});

export default InputCustom;
import React, { useRef } from "react";
import InputCustom from "./InputCustom";
import { Pen } from "lucide-react";

const InputFocus = ({ label, id, display, onChange }) => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div className="flex items-center flex-col bg-white justify-between px-6 py-4 w-6/12 gap-y-4 rounded-lg border border-spacing-1">
      <div className="flex items-center justify-between w-full">
        <label className="font-medium text-sm" htmlFor={id}>
          {label}
        </label>
        <span
          className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium"
          onClick={handleFocus}
        >
          <Pen size={14} /> add {display}
        </span>
      </div>
      <InputCustom
        id={id}
        display={display}
        ref={inputRef}
        onChange={onChange}
      />
    </div>
  );
};

export default InputFocus;

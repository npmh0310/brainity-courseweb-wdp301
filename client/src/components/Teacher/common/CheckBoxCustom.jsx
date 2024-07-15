import React from "react";
import "./checkBox.css";
const CheckBoxCustom = ({ onChange }) => {
  
  return (
    <div className="checkbox-wrapper-46">
      <input
        type="checkbox"
        id="cbx-46"
        className="inp-cbx"
        defaultChecked
        onChange={onChange}
      />
      <label htmlFor="cbx-46"  className="cbx">
        <span>
          <svg viewBox="0 0 12 10" height="10px" width="12px">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span>Free</span>
      </label>
    </div>
  );
};

export default CheckBoxCustom;

import React from "react";
import { CirclePlus, Plus } from "lucide-react";
const ButtonAdd = ({ label, onClick }) => {
  return (
    <span
      className="flex items-center gap-x-2 text-xs cursor-pointer border bg-third bg-opacity-10 rounded-3xl px-8 py-3 transition duration-300 ease-in-out transform hover:bg-opacity-20 hover:translate-y-1 font-medium uppercase"
      onClick={onClick}
    >
      {label} <CirclePlus size={15} />
    </span>
  );
};

export default ButtonAdd;

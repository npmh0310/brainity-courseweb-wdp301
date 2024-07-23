import React, { useRef, useState } from "react";
import { Pen, Check, X } from "lucide-react";
import InputCustom from "../common/InputCustom";
import { updateCourse } from "../../../fetchData/TeacherCourse";
import toast from "react-hot-toast";
import TextareaCustom from "../common/TextareaCustom";

const EditCourse = ({ label, value, inputId, idCourse, setStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState({
    courseName: undefined,
    description: undefined,
    imageUrl: undefined,
    categories: undefined,
    price: undefined,
  });
  const inputRef = useRef(null);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleInputChange = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSave = async () => {
    const res = await updateCourse(idCourse, inputValue);
    if (res && res.status === 200) {
      toast.success("Successfully edit");
      setInputValue(undefined);
      setStatus(true);
      setIsEditing(false);
    } else {
      toast.error("Failed to edit");
    }
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <label className="font-medium" htmlFor={inputId}>
          {label}:
        </label>
        {isEditing ? (
          <span className="flex items-center gap-x-2 text-sm hover:font-medium">
            <div
              className="p-1 hover:bg-green-200 cursor-pointer"
              onClick={handleSave}
            >
              <Check size={14} className="text-green-800" />
            </div>
            <div
              className="p-1 hover:bg-red-200 cursor-pointer"
              onClick={handleCancel}
            >
              <X size={14} className="text-red-700" />
            </div>
          </span>
        ) : (
          <span
            className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium"
            onClick={toggleEdit}
          >
            <Pen size={14} /> edit
          </span>
        )}
      </div>
      <div className="w-full">
        {isEditing ? (
          inputId === "description" ? ( // Render Textarea for 'description' inputId
            <TextareaCustom
              id={inputId}
              value={value}
              onChange={handleInputChange}
              ref={inputRef}
            />
          ) : (
            // Render InputCustom for other  inputIds
            <InputCustom
              id={inputId}
              value={value}
              onChange={handleInputChange}
              ref={inputRef}
            />
          )
        ) : (
          <h1 className="text-start text-sm ml-[0.5em] my-[0.74em]  break-all">
            {value}
          </h1>
        )}
      </div>
    </>
  );
};

export default EditCourse;

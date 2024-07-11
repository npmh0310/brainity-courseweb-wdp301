import React, { useEffect, useRef, useState } from "react";
import { Pen, Check, X } from "lucide-react";
import { getAllCategory, updateCourse } from "../../../fetchData/TeacherCourse";
import toast from "react-hot-toast";
import Select from "react-select";

const UpdateCate = ({ label, inputId, idCourse, setStatus, cateData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [cate, setCate] = useState([]);

  useEffect(() => {
    getAllCategory()
      .then((res) => {
        const dataCate = res.data.data;
        const formattedOptions = dataCate.map((cate) => ({
          value: cate._id,
          label: cate.categoryName,
        }));
        setCate(formattedOptions);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setSelectedOption(
      cateData?.map((cate) => ({
        value: cate._id,
        label: cate.categoryName,
      }))
    );
  }, [cateData]);

  const [inputValue, setInputValue] = useState({
    categories: undefined,
  });
  // console.log(inputValue)
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
    setIsEditing(false);
  };

  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    const selectedValues = selectedOption.map((option) => option.value);
    setInputValue((prevData) => ({
      ...prevData,
      categories: selectedValues,
    }));
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
          <Select
            isMulti
            name="cate"
            options={cate}
            value={selectedOption}
            onChange={handleDropdownChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        ) : (
          <div className="flex flex-col flex-wrap  lg:flex-row justify-start items-center gap-3 my-2 w-full">
            {cateData &&
              cateData.map((data, index) => (
                <span
                  className="px-4 text-sm py-2 bg-third bg-opacity-10 rounded-3xl"
                  key={index}
                >
                  {data.categoryName}
                </span>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateCate;

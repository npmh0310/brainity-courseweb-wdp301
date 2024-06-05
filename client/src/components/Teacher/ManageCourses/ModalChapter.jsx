import React, { useState } from "react";
import { Pen, Upload } from "lucide-react";
import InputCustom from "../common/InputCustom";
const ModalChapter = ({ handleClose }) => {
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  //  chuyen file text name thanh img
  const handleSelectedFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    handleClose()
  };

  return (
    <div className="w-[40%] h-[330px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
      <form className="container mx-auto my-8" onSubmit={handleCancelSubmit}>
        <div className="mb-3 border-b-2  border-gray-200 pb-8">
          <h1 className="text-center text-3xl font-bold font-logoTitle text-third">
            CREATE NEW SECTION
          </h1>
        </div>
        <div className="flex flex-col items-center gap-y-4 w-full">
          <div className="flex items-center flex-col bg-white justify-between px-6 py-4  gap-y-4 rounded-lg border border-spacing-1  w-full ">
            <div className="flex items-center justify-between w-full  ">
              <label className="font-medium text-sm" htmlFor="">
                Section name:{" "}
              </label>
              <span className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium ">
                <Pen size={14} /> add name
              </span>
            </div>

            <InputCustom id="sectionName" display="input name" />
          </div>

          {/* part 2 */}
        </div>
        <div className="flex flex-row items-center justify-center gap-x-8 mt-8">
          <button className="px-12  py-2 text-sm text-white font-medium  bg-primary rounded-full transition duration-300 ease-in-out transform hover:translate-y-1 ">
            Create
          </button>
          <button
            className="px-12 py-2 text-sm text-white font-medium  bg-red-600 rounded-full  transition duration-300 ease-in-out transform hover:translate-y-1"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalChapter;

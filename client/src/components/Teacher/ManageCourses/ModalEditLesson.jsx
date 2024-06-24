import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import InputCustom from "../common/InputCustom";
const ModalEditLesson = (props) => {
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { lesson, close, save } = props;

  const handleSelectedFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-[50%] max-w-[1100px]  min-h-[645px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-4">
      <div className="pb-6 pt-4 border-b-[1px] relative">
        <h1 className="text-center text-2xl font-semibold text-third uppercase">
          Edit course
        </h1>
        <div
          className="p-2 rounded-full bg-gray-200 text-[#61676f] absolute right-8 cursor-pointer  top-1/2 transform -translate-y-1/2 hover:bg-gray-300 "
          onClick={close}
        >
          <X />
        </div>
      </div>
      <form className="px-10 mx-auto py-5">
        <div className="flex flex-row justify-between items-center gap-x-5">
          <div className="flex flex-col gap-y-3 mb-3 w-1/2 py-3 px-5 border  rounded-md ">
            <span className="italic text-third font-medium">Lesson name:</span>
            <InputCustom id="name" value={lesson.lessonName} />
          </div>
          <div className="flex flex-col gap-y-3 mb-3 w-1/2 py-3 px-5 border   rounded-md ">
            <span className="italic text-third font-medium">
              Lesson description:
            </span>
            <InputCustom id="description" value={lesson.description} />
          </div>
        </div>
        <div className="flex flex-col gap-y-5 justify-center  py-3 px-5 border   rounded-md ">
          <div className="flex flex-row justify-between items-center">
            <span className="italic text-third font-medium">Lesson video:</span>
            <input
              type="file"
              id="myFile"
              name="filename"
              ref={fileInputRef}
              className="hidden"
              onChange={handleSelectedFile}
            />

            {/* Custom button */}
            <span
              className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium "
              onClick={handleFileInputClick}
            >
              <Upload className="w-4 h-4" />
              Choose file
            </span>
          </div>
          <div className="flex justify-center max-h-[250px] mb-2 ">
            {/* <span className="text-sm">{lesson.videoUrl}</span> */}
            <video width="80%" className="rounded-lg" controls>
              <source src={lesson.videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </form>
      <div className="flex justify-center">
        <button
          className="w-full mx-10 py-2 bg-primary rounded-3xl font-semibold text-white"
          onClick={save}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default ModalEditLesson;

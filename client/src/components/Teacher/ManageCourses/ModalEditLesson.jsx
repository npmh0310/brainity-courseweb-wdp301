import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import InputCustom from "../common/InputCustom";
import axios from "axios";
import toast from "react-hot-toast";
import { updateLesson } from "../../../fetchData/TeacherCourse";
const ModalEditLesson = (props) => {
  const fileInputRef = React.useRef(null);
  const { lesson, close, setStatus } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [dataInput, setDataInput] = useState({
    lessonName: lesson.lessonName,
    description: lesson.description,
    videoUrl: lesson.videoUrl
  })

  const handleChange = (e) => {
    setDataInput((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelectedFile = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const preset_key = "hbmfnkks"
    // setSelectedFile(file);
    const formData = new FormData();
    formData.append('file', file)
    formData.append("upload_preset", preset_key);

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/doydh7dtj/video/upload", formData);

      if (res && res.status === 200) {
        setDataInput(prev => ({ ...prev, videoUrl: res.data.secure_url }));

        const reader = new FileReader();

        reader.readAsDataURL(file);
      } else {
        console.error("Please select the video file");
      }
    } catch (error) {
      // If there's an error during the request (network issue, etc.), we handle it here
      toast.error("Please select the video file");
      console.error("Upload error:", error);
    }


  };

  // const handleSelectedFile = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleEditSave = async () => {
    console.log("saved");
    const res = await updateLesson(lesson._id, dataInput)
    if (res && res.status === 200) {
      toast.success("Updated successfully");
      setStatus(true)
      close()
    } else {
      toast.success("Update failed");
    }
  };

  return (
    <div className="w-[50%] max-w-[1100px]  min-h-[645px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-4">
      <div className="pb-6 pt-4 border-b-[1px] relative">
        <h1 className="text-center text-2xl font-semibold text-third uppercase">
          Edit Lesson
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
            <InputCustom id="lessonName" value={dataInput.lessonName} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-y-3 mb-3 w-1/2 py-3 px-5 border   rounded-md ">
            <span className="italic text-third font-medium">
              Lesson description:
            </span>
            <InputCustom id="description" value={dataInput.description} onChange={handleChange} />
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
          {(!dataInput.videoUrl && dataInput.videoUrl == null) ? (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to add video</span>
              </p>
              <p className="text-xs text-gray-500">
                MP4 (MAX. 800x400px)
              </p>
            </div>
          ) : (

            <div className="flex justify-center max-h-[250px] mb-2 ">
              {/* <span className="text-sm">{lesson.videoUrl}</span> */}
              <video width="80%" className="rounded-lg" controls>
                <source src={dataInput.videoUrl} type="video/mp4" />
              </video>
            </div>
          )

          }
        </div>
      </form>
      <div className="flex justify-center">
        <button
          className="w-full mx-10 py-2 bg-primary rounded-3xl font-semibold text-white"
          onClick={handleEditSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ModalEditLesson;

import { Pen, Upload } from "lucide-react";
import React, { useState } from "react";
import InputCustom from "../common/InputCustom";
import videoTest from "../../../assets/videos/ADBE925D-45A7-437E-A735-415F7A4625E4.mp4";
import { createLesson } from "../../../fetchData/TeacherCourse";
import toast from "react-hot-toast";
import axios from "axios";
const ModalLesson = ({ handleClose, sectionId, setStatus }) => {
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [data, setData] = useState({
    lessonName: undefined,
    description: undefined,
    videoUrl: undefined
  })

  const handleChange = e => {
    setData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const res = await createLesson(data, sectionId)
    if (res && res.status === 200) {
      toast.success("Successfully created")
      setStatus(true)
      handleClose()
    } else {
      toast.error("Failed to create")
    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  //  chuyen file text name thanh img
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
        setData(prev => ({ ...prev, videoUrl: res.data.secure_url }));

        const reader = new FileReader();
        reader.onloadend = () => {
          setVideoPreview(reader.result);
        };
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

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <div className="w-[70%] max-w-[1100px] h-[650px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
      <form className="container mx-auto my-8" onSubmit={handleCancelSubmit}>
        <div className="mb-3 border-b-2  border-gray-200 pb-8">
          <h1 className="text-center text-3xl font-bold font-logoTitle text-third">
            CREATE NEW LESSON
          </h1>
        </div>
        <div className="flex flex-col gap-y-4">
          {/* part 1 */}
          <div className="flex items-center justify-between gap-x-10 ">
            <div className="flex items-center flex-col bg-white justify-between px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1   ">
              <div className="flex items-center justify-between w-full  ">
                <label className="font-medium" htmlFor="">
                  Lesson name:{" "}
                </label>
                <span className="flex items-center gap-x-2 text-sm cursor-pointer">
                  <Pen size={15} /> edit name
                </span>
              </div>
              <div className="w-full">
                <InputCustom id="lessonName" value="input name" onChange={handleChange} />
              </div>
            </div>
            <div className="flex items-center flex-col bg-white justify-between px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1 ">
              <div className="flex items-center justify-between w-full  ">
                <label className="font-medium" htmlFor="">
                  Lesson description:{" "}
                </label>
                <span className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium ">
                  <Pen size={14} /> add description
                </span>
              </div>

              <InputCustom
                id="description"
                value="input description"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-start justify-between gap-x-10 ">
            <div className="flex items-center flex-col bg-white justify-between px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1   ">
              <div className="flex items-center justify-between w-full  ">
                <label className="font-medium" htmlFor="">
                  Lesson video:{" "}
                </label>

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
            </div>
            <div className="flex items-center flex-col bg-white justify-between px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1   ">
              <div
                className={`flex flex-col items-center justify-center w-full h-[231px] max-h-[291px] ${!videoPreview && "border-2 border-gray-300 border-dashed"
                  } rounded-lg  bg-gray-50`}
              >
                {videoPreview ? (
                  <div className="p-2 w-full h-[231px]  overflow-hidden">
                    <video
                      width="50%"
                      className="w-full h-full object-cover rounded-lg "
                      controls
                    >
                      <source src={videoPreview} type="video/mp4" />
                    </video>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-x-8 mt-10">
          <button
            onClick={handleClick}
            className="px-12  py-2 text-sm text-white font-medium  bg-primary rounded-full transition duration-300 ease-in-out transform hover:translate-y-1 ">
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

export default ModalLesson;
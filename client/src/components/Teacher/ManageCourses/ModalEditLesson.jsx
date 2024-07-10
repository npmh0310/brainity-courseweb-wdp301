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
  const [pendingImg, setPendingImg] = useState(false);

  const [dataInput, setDataInput] = useState({
    lessonName: lesson.lessonName,
    description: lesson.description,
    videoUrl: lesson.videoUrl,
  });

  const handleChange = (e) => {
    setDataInput((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelectedFile = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const preset_key = "hbmfnkks";
    // setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    setPendingImg(true);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/doydh7dtj/video/upload",
        formData
      );

      if (res && res.status === 200) {
        setDataInput((prev) => ({ ...prev, videoUrl: res.data.secure_url }));
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setPendingImg(false);
      } else {
        console.error("Please select the video file");
        setPendingImg(false);
      }
    } catch (error) {
      // If there's an error during the request (network issue, etc.), we handle it here
      toast.error("Please select the video file");
      setPendingImg(false);

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
    const res = await updateLesson(lesson._id, dataInput);
    if (res && res.status === 200) {
      toast.success("Updated successfully");
      setStatus(true);
      close();
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
            <InputCustom
              id="lessonName"
              value={dataInput.lessonName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-y-3 mb-3 w-1/2 py-3 px-5 border   rounded-md ">
            <span className="italic text-third font-medium">
              Lesson description:
            </span>
            <InputCustom
              id="description"
              value={dataInput.description}
              onChange={handleChange}
            />
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
          {!dataInput.videoUrl && dataInput.videoUrl == null ? (
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
              <p className="text-xs text-gray-500">MP4 (MAX. 800x400px)</p>
            </div>
          ) : (
            <div className="flex justify-center max-h-[250px] mb-2 relative">
              {/* <span className="text-sm">{lesson.videoUrl}</span> */}
              {pendingImg && (
                <div
                  role="status"
                  className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <video
                width="80%"
                className={`rounded-lg ${pendingImg && "opacity-20"} `}
                controls
              >
                <source src={dataInput.videoUrl} type="video/mp4" />
              </video>
            </div>
          )}
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

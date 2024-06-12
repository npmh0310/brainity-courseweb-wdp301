import React, { useState } from "react";
import { Pen, Upload } from "lucide-react";
import InputCustom from "../common/InputCustom";
import { CreateCourse } from "../../../fetchData/TeacherCourse";
import toast from "react-hot-toast";
const ModalCourse = ({ handleClose, setStatus }) => {
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState({
    courseName: undefined,
    description: undefined,
    imageUrl: undefined,
    categories: undefined,
    price: undefined
  })

  const handleChange = e => {
    setData(prev => ({ ...prev, [e.target.id]: e.target.value }))
    // console.log(data)
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await CreateCourse(data);
    console.log(res)
    if (res && res.status === 200) {
      toast.success("Successfully created")
      setStatus(true)
      handleClose()
    } else {
      toast.error("Failed to create")
    }
  }

  return (
    <div className="w-[70%] max-w-[1100px] h-[650px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
      <form className="container mx-auto my-8" onSubmit={handleCancelSubmit}>
        <div className="mb-3 border-b-2  border-gray-200 pb-8">
          <h1 className="text-center text-3xl font-bold font-logoTitle text-third">
            CREATE NEW COURSE
          </h1>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between gap-x-10">
            <div className="flex items-center flex-col bg-white justify-between px-6 py-4 w-6/12 gap-y-4 rounded-lg border border-spacing-1   ">
              <div className="flex items-center justify-between w-full  ">
                <label className="font-medium text-sm" htmlFor="">
                  Course name:{" "}
                </label>
                <span className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium ">
                  <Pen size={14} /> add name
                </span>
              </div>

              <InputCustom id="courseName" display="input name" onChange={handleChange} />
            </div>
            <div className="flex items-center flex-col bg-white justify-between px-6 py-4 w-6/12 gap-y-4 rounded-lg border border-spacing-1   ">
              <div className="flex items-center justify-between w-full  ">
                <label className="font-medium text-sm" htmlFor="">
                  Course description:{" "}
                </label>
                <span className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium ">
                  <Pen size={14} /> add description
                </span>
              </div>

              <InputCustom
                id="description"
                display="input description "
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-start justify-between gap-x-10">
            <div className="flex items-center flex-col bg-white justify-between px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1 h-[100%] ">
              <div className="flex items-center justify-between w-full  ">
                <label className="font-medium" htmlFor="">
                  Course image:{" "}
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
                  className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium  hover:font-medium"
                  onClick={handleFileInputClick}
                >
                  <Upload className="w-4 h-4" />
                  Choose file
                </span>
              </div>

              <div className="flex items-center justify-center w-full">
                <div
                  className={`flex flex-col items-center justify-center w-full h-[231px] max-h-[291px] ${!imagePreview && "border-2 border-gray-300 border-dashed"
                    } rounded-lg  bg-gray-50`}
                >
                  {imagePreview ? (
                    <div className="p-2 w-full h-[231px]  overflow-hidden">
                      <img
                        className="w-full h-full object-cover rounded-lg "
                        src={imagePreview}
                        alt="Selected Image"
                      />
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
                        <span className="font-semibold">
                          Click to add image
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>{" "}
            <div className="flex flex-col justify-start w-6/12 gap-y-4 h-full">
              <div className="flex items-center flex-col bg-white justify-between px-6 py-6 gap-y-4 rounded-lg border border-spacing-1   ">
                <div className="flex items-center justify-between w-full  ">
                  <label className="font-medium text-sm" htmlFor="">
                    Course categories:{" "}
                  </label>
                  <span className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium ">
                    <Pen size={14} /> add categories
                  </span>
                </div>

                <InputCustom id="categories" display="input categories" onChange={handleChange} />
              </div>
              <div className="flex items-center flex-col bg-white justify-between px-6 py-6 gap-y-4 rounded-lg border border-spacing-1   ">
                <div className="flex items-center justify-between w-full  ">
                  <label className="font-medium text-sm" htmlFor="">
                    Course price:{" "}
                  </label>
                  <span className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium ">
                    <Pen size={14} /> add price
                  </span>
                </div>

                <InputCustom id="price" display="input price" onChange={handleChange} />
              </div>
            </div>
          </div>
          {/* part 2 */}
        </div>
        <div className="flex flex-row items-center justify-center gap-x-8 mt-7">
          <button
            className="px-12  py-2 text-sm text-white font-medium  bg-primary rounded-full transition duration-300 ease-in-out transform hover:translate-y-1 "
            onClick={handleSubmit}
          >
            Create
          </button>
          <button
            className="px-12 py-2 text-sm text-white font-medium  bg-red-600 rounded-full  transition duration-300 ease-in-out transform hover:translate-y-1"
            onClick={handleCancelSubmit}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalCourse;

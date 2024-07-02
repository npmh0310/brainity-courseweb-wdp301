import React, { useEffect, useState } from "react";
import { Pen, Upload } from "lucide-react";
import InputCustom from "../common/InputCustom";
import { CreateCourse, getAllCategory } from "../../../fetchData/TeacherCourse";
import toast from "react-hot-toast";
import axios from "axios";
import Select from 'react-select';

const ModalCourse = ({ handleClose, setStatus }) => {
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [data, setData] = useState({
    courseName: undefined,
    description: undefined,
    imageUrl: undefined,
    categories: undefined,
    price: undefined
  })

  const [cate, setCate] = useState([])

  const [pendingImg, setPendingImg] = useState(false);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    getAllCategory().then(res => {

      const dataCate = res.data.data

      const formattedOptions = dataCate.map(cate => ({
        value: cate._id,
        label: cate.categoryName
      }));
      setCate(formattedOptions)
    }).catch(err => console.error(err))
  }, [])

  //  chuyen file text name thanh img
  const handleSelectedFile = async (e) => {
    const file = e.target.files[0];
    const preset_key = "hbmfnkks";
    // setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    setPendingImg(true);
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/doydh7dtj/image/upload",
      formData
    );
    if (res && res.status === 200) {
      setData((prev) => ({ ...prev, imageUrl: res.data.secure_url }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setPendingImg(false);
      };
      reader.readAsDataURL(file);
      setPendingImg(false);
    } else {
      toast.error("Please select the image file");
      setPendingImg(false);
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

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await CreateCourse(data);
    console.log(res);
    if (res && res.status === 200) {
      toast.success("Successfully created");
      setStatus(true);
      handleClose();
    } else {
      toast.error("Failed to create");
    }
  };

  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    const selectedValues = selectedOption.map(option => option.value);
    setData(prevData => ({
      ...prevData,
      categories: selectedValues
    }));
  };

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

              <InputCustom
                id="courseName"
                display="input name"
                onChange={handleChange}
              />
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
                  className={`flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium  ${pendingImg && "hidden"
                    }`}
                  onClick={handleFileInputClick}
                >
                  <Upload className={`w-4 h-4  `} />
                  Choose file
                </span>
              </div>

              <div className="flex items-center justify-center w-full">
                <div
                  className={`flex flex-col items-center justify-center w-full h-[231px] max-h-[291px] relative ${!imagePreview && "border-2 border-gray-300 border-dashed"
                    } rounded-lg  bg-gray-50`}
                >
                  {pendingImg && (
                    <div
                      role="status"
                      class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                  {imagePreview ? (
                    <div className="p-2 w-full h-[231px]  overflow-hidden">
                      <img
                        className={`w-full h-full object-cover rounded-lg ${pendingImg && "opacity-20"
                          }`}
                        src={imagePreview}
                        alt="Selected Image"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex flex-col items-center justify-center pt-5 pb-6 ${pendingImg && "opacity-20"
                        }`}
                    >
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
                <div className="w-full">
                  <label htmlFor="dropdown">Chọn tùy chọn:</label>
                  <Select
                    isMulti
                    name="cate"
                    options={cate}
                    value={selectedOption}
                    onChange={handleDropdownChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                  {/* <select id="dropdown" value="" onChange={handleDropdownChange}>
                    <option value="">Choose...</option>
                    {cate && cate.map((data, index) => (
                      <option key={index} value={data._id}>{data.categoryName}</option>
                    ))}
                  </select> */}
                  {/* <option value="other">Other...</option> */}

                  {/* {selectedOption === 'other' && (
                    <div>
                      <input className="w-full" id="categories" placeholder="input new category name" onChange={handleInputChange} />
                    </div>
                  )} */}
                </div >
              </div >
              <div className="flex items-center flex-col bg-white justify-between px-6 py-6 gap-y-4 rounded-lg border border-spacing-1   ">
                <div className="flex items-center justify-between w-full  ">
                  <label className="font-medium text-sm" htmlFor="">
                    Course price:{" "}
                  </label>
                  <span className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium ">
                    <Pen size={14} /> add price
                  </span>
                </div>

                <InputCustom
                  id="price"
                  display="input price"
                  onChange={handleChange}
                />
              </div>
            </div >
          </div >
          {/* part 2 */}
        </div >
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
      </form >
    </div >
  );
};

export default ModalCourse;

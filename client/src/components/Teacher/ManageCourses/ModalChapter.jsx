import React, { useRef, useState } from "react";
import { AwardIcon, Pen, Underline, Upload } from "lucide-react";
import InputCustom from "../common/InputCustom";
import { createSection } from "../../../fetchData/TeacherCourse";
import toast from "react-hot-toast";
import InputFocus from "../common/InputFocus";
const ModalChapter = ({ handleClose, setStatus, courseId }) => {
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState({
    sectionName: "",
  });

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
    handleClose();
  };

  const handleChange = (index, event) => {
    const newSections = [...sections];
    newSections[index].sectionName = event.target.value;
    setSections(newSections);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const res = await createSection(data, courseId);
    if (res && res.status === 200) {
      toast.success("Successfully created");
      setStatus(true);
      handleClose();
    } else {
      toast.error("Failed to create");
    }
  };

  // create more input
  const [sections, setSections] = useState([{ sectionName: "" }]);
  const inputRefs = useRef([]);

  const handleAddSection = (e) => {
    e.preventDefault();
    console.log(sections);
    setSections((prevSections) => [...prevSections, { sectionName: "" }]);
  };

  const handleFocus = (index) => {
    inputRefs.current[index].focus();
  };

  return (
    <div className="w-[40%] max-h-[530px] min-h-[350px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
      <form className="container mx-auto my-8" onSubmit={handleCancelSubmit}>
        <div className="mb-3 border-b-2  border-gray-200 pb-8">
          <h1 className="text-center text-3xl font-bold font-logoTitle text-third">
            CREATE NEW SECTION
          </h1>
        </div>
        <div className="flex flex-col items-center gap-y-4 w-full overflow-y-auto scrollbar-custom   min-h-[109px] max-h-[250px] mr-1 ">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="flex items-center flex-col bg-white justify-between px-6 py-4 gap-y-4 rounded-lg border border-spacing-1 w-full my-2 "
            >
              <div className="flex items-center justify-between w-full">
                <label className="font-medium text-sm" htmlFor="">
                  Section name:{" "}
                </label>
                <span
                  className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium"
                  onClick={() => handleFocus(index)}
                >
                  <Pen size={14} /> add name
                </span>
              </div>
              <InputCustom
                id={`sectionName-${section.id}`}
                value={section.name}
                onChange={(event) => handleChange(index, event)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-center gap-x-8 mt-8">
          <button
            className="border rounded-md px-5 py-2 text-sm"
            onClick={handleAddSection}
          >
            Add
          </button>
        </div>
        <div className="flex flex-row items-center justify-center gap-x-8 mt-8">
          <button
            className="px-12  py-2 text-sm text-white font-medium  bg-primary rounded-full transition duration-300 ease-in-out transform hover:translate-y-1 "
            onClick={handleClick}
          >
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

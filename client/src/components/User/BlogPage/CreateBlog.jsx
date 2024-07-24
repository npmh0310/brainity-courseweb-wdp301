import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import { generateSlug } from "../../../function/function";
import "react-quill/dist/quill.snow.css";
import { getAllCategory } from "../../../fetchData/TeacherCourse";
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import { createBlog } from "../../../fetchData/Blog";
import { useNavigate } from "react-router-dom";
function CreateBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cate, setCate] = useState([]);
  const [imgUrl, setImgUrl] = useState();
  const navigate = useNavigate()
  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    const selectedValues = selectedOption.map((option) => option.value);
    setCategories(selectedValues);
  };
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

  function handleTitle(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const autoSlug = generateSlug(newTitle);
    setSlug(autoSlug);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const newBlog = {
      title,
      description,
      content,
      categories,
      imgUrl,
    };
    console.log(newBlog);
    const res = await createBlog(newBlog);
    if (res.status === 200) {
      toast.success("Create blog successfull");
      navigate('/myBlog')
    } else {
      toast.error("Failed to create blog");
    }
  }

  //Custom Tool Bar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
  ];

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const preset_key = "hbmfnkks";
    // setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/doydh7dtj/image/upload",
      formData
    );
    if (res && res.status === 200) {
      setImgUrl(res.data.secure_url);
    } else {
      toast.error("Please select the image file");
    }
  };
  return (
    <div>
      <h2 className=" text-5xl pt-12 pb-5 uppercase font-third text-center py-4 font-semibold">
        Write Blog
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-4">
        {/* Blog Editor */}
        <div className="w-full max-w-3xl p-5 my-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            Blog Editor
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Title */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                >
                  Blog Title
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleTitle}
                    type="text"
                    value={title}
                    name="title"
                    id="title"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    placeholder="Type the Course title"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                >
                  Blog Categories
                </label>
                <div className="mt-2">
                  <Select
                    isMulti
                    name="cate"
                    options={cate}
                    value={selectedOption}
                    onChange={handleDropdownChange}
                    className="basic-multi-select rounded-3xl"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
              {/* Description */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Blog Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 "
                  placeholder="Write your thoughts here..."
                  required
                ></textarea>
              </div>
              {/* Content */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="categories"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Blog Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="imgUrl"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Blog Image
                </label>
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt=""
                    className=" py-2 w-full max-h-[450px] object-cover"
                  />
                )}
                <input
                  type="file"
                  className=""
                  onChange={handleFileInputChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4  hover:bg-opacity-60"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span>Create Blog Post</span>
            </button>
          </form>
        </div>

        {/* Blog View */}
        <div className=" blog-view w-full max-w-3xl p-8 my-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            Blog View
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Title */}
            <div className="sm:col-span-2">
              <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                Blog Title
              </h2>
              <div className="mt-2">
                <p className="text-2xl font-bold">{title}</p>
              </div>
            </div>

            <div className="sm:col-span-2">
              <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                Blog Categories
              </h2>
              <div className="mt-2 flex gap-x-2">
                {selectedOption &&
                  selectedOption.map((categorie, index) => (
                    <p>/ {categorie.label} </p>
                  ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt=""
                  className=" w-full max-h-[450px] object-cover"
                />
              )}
            </div>
            {/* Description */}
            <div className="sm:col-span-2">
              <h2 className="block mb-2 text-sm font-medium text-gray-900 ">
                Blog Description
              </h2>
              <p>{description}</p>
            </div>
            <div className="sm:col-span-full">
              <h2 className="block mb-2 text-sm font-medium text-gray-900 ">
                Blog Content
              </h2>
              {parse(content)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
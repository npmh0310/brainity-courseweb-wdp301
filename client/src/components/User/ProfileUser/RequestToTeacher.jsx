import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PasswordInput from "./PasswordInput";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./buttonRequest.css";
const RequestToTeacher = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const handleDownload = async () => {
    const fileUrl = "/file/Request-to-teacher.rar";
    try {
      const response = await fetch(fileUrl, { method: "HEAD" });
      if (response.ok) {
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = "Request-to-teacher.rar";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log('success');
      } else {
        alert("File not available on the server.");
      }
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("An error occurred while trying to download the file.");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="w-full md:w-[65%]  bg-white mt-8  border py-8 px-8 border-gray-200 rounded-md">
      <h1 className="text-2xl uppercase font-bold border-b-[1px] border-b-gray-200 pb-6 text-third text-center italic ">
        Request To Teacher
      </h1>
      <div className="py-3">
        <div className="flex flex-col m-4 mb-0">
          <div className="m-2">
            <div className="flex flex-col gap-y-8 justify-between ">
              <div className="flex flex-col lg:flex-row lg:space-x-9 space-y-2 lg:space-y-0">
                <h1 className="font-medium lg:w-1/3 w-full ">Full name:</h1>
                <h1 className="border-b border-b-primary border-dashed  pb-3 w-full">
                  {user.name}
                </h1>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-9 space-y-2 lg:space-y-0">
                <h1 className="font-medium  lg:w-1/3 w-full">Address:</h1>
                <h1 className="border-b border-b-primary border-dashed  pb-3 w-full">
                  {user.address}
                </h1>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-9 space-y-2 lg:space-y-0">
                <h1 className="font-medium  lg:w-1/3 w-full">Phone number:</h1>
                <h1 className="border-b border-b-primary border-dashed  pb-3 w-full">
                  {user.phoneNumber}
                </h1>
              </div>
              <div className="text-[10px] ">
                <div className="flex  items-center gap-x-2  mb-1">
                  <FontAwesomeIcon
                    className="text-yellow-400"
                    icon={faCircleExclamation}
                  />
                  <h1 className="text-xs ">Attention: </h1>
                </div>
                <div className="flex gap-y-1 flex-col italic">
                  <p className="">
                    <strong>Response Time:</strong> The department will respond
                    to your request/email within 48 hours (except for refund
                    requests, re-evaluation requests, campus transfer requests,
                    etc.).
                  </p>
                  <p className="">
                    <strong>Spam Prevention:</strong> To minimize spam, response
                    times for spam-like requests/emails will be extended based
                    on the following rule: If you send N requests/emails for the
                    same issue, the response time will be within Nx48 hours.
                  </p>
                  <p className="">
                    <strong>Recommendation:</strong> Consider the content
                    carefully before sending multiple requests/emails on the
                    same issue to ensure the fastest possible response as per
                    the guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form className="mx-2 mt-6 mb-0">
            <div className="flex flex-col lg:flex-row pb-6 mb-8 border-b-2 border-b-primary border-dashed">
              <div className="w-1/2  flex flex-col items-center gap-y-4">
                <h1 className="uppercase text-sm">Upload your file</h1>
                <div className="p-2">
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                    id="formFileSm"
                    type="file"
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-center gap-y-4" >
                <h1 className="text-sm uppercase">Download word files</h1>
                <div
                  className="buttonDown"
                  onClick={handleDownload}
                  data-tooltip="Size: 20Mb"
                >
                  <div className="button-wrapper">
                    <div className="text">Download</div>
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="2em"
                        height="2em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="flex justify-center mt-6">
              <button className="w-1/5 buttonSend text-white">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestToTeacher;

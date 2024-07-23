import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TeacherDialog from "./TeacherDialog";
import { getTeacherRequest, updateStatusTeacherRequest } from "../../../fetchData/Course";
import toast from "react-hot-toast";

const ConfirmTeacherTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(true);
  const [teachers, setTeachers] = useState([
    // Add more teachers if needed
  ]);
  // const [selectedTeacher, setSelectedTeacher] = useState({})
  
  useEffect(() => {
    if(status){
      getTeacherRequest()
      .then((res) => {setTeachers(res.data.data) 
        // console.log(res);
        setStatus(false)
      })
      .catch((err) => console.log(err))
    }
  }, [status]);

  const handleConfirm = async(id) => {
    const res = await updateStatusTeacherRequest(id, "Confirmed")
    if(res && res.status === 200){
      toast.success("You have accepted")
      setStatus(true)
    }
    setOpen(false);
  };

  const handleReject = async(id) => {
    const res = await updateStatusTeacherRequest(id, "Rejected")
    if(res && res.status === 200){
      toast.success("You have rejected")
      setStatus(true)
    }
    setOpen(false);
  };

  const handleRowClick = (teacher) => {
    setSelectedTeacher(teacher);
    // console.log(teacher);
    setOpen(true);
  };

  return (
    <div className="pt-4 px-0 lg:px-36 md:px-10">
      <div className="py-1">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <div className="flex space-x-4 items-center w-full">
            <div className="relative w-1/3">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg transition-all"
              />
            </div>
          </div>
        </div>
        <div className="py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    Teacher Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr
                    key={teacher._id + 1}
                    className={`hover:bg-gray-100 cursor-pointer ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                    onClick={() => handleRowClick(teacher)}
                  >
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <div className="flex items-center">
                        <img
                          src={teacher.user?.avatar}
                          alt={teacher.user.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {teacher.user?.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {teacher.user?.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {teacher.user?.phoneNumber}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-medium leading-tight ${
                          teacher.status === "Confirmed"
                            ? "text-green-900"
                            : teacher.status === "Rejected"
                            ? "text-black"
                            : "text-gray-900"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${
                            teacher.isApproved === "Confirmed"
                              ? "bg-primary"
                              : teacher.isApproved === "Rejected"
                              ? "bg-red-600"
                              : "bg-gray-200"
                          } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative">{teacher.isApproved}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TeacherDialog
        open={open}
        teacher={selectedTeacher}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        onReject={handleReject}
      />
    </div>
  );
};

export default ConfirmTeacherTable;

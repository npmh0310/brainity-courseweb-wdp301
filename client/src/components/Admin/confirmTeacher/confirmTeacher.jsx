import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TeacherDialog from "./TeacherDialog";

const ConfirmTeacherTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "John has a PhD in Mathematics and 10 years of teaching experience.",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=2",
      bio: "Jane is a certified Science teacher with a passion for research.",
    },
    {
      id: 3,
      name: "Samuel Green",
      email: "samuel.green@example.com",
      phone: "555-666-7777",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=3",
      bio: "Samuel has written several books on ancient history.",
    },
    {
      id: 4,
      name: "Lisa White",
      email: "lisa.white@example.com",
      phone: "444-333-2222",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=4",
      bio: "Lisa is an award-winning author and English teacher.",
    },
    // Add more teachers if needed
  ]);

  useEffect(() => {
    setFilteredTeachers(teachers);
  }, [teachers]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilteredTeachers(
        teachers.filter((teacher) =>
          teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, teachers]);

  const handleConfirm = (id) => {
    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === id ? { ...teacher, status: "Confirmed" } : teacher
    );
    setTeachers(updatedTeachers);
    setOpen(false);
  };

  const handleReject = (id) => {
    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === id ? { ...teacher, status: "Rejected" } : teacher
    );
    setTeachers(updatedTeachers);
    setOpen(false);
  };

  const handleRowClick = (teacher) => {
    setSelectedTeacher(teacher);
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
                {filteredTeachers.map((teacher, index) => (
                  <tr
                    key={teacher.id}
                    className={`hover:bg-gray-100 cursor-pointer ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                    onClick={() => handleRowClick(teacher)}
                  >
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <div className="flex items-center">
                        <img
                          src={teacher.avatar}
                          alt={teacher.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {teacher.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {teacher.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {teacher.phone}
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
                            teacher.status === "Confirmed"
                              ? "bg-primary"
                              : teacher.status === "Rejected"
                              ? "bg-red-600"
                              : "bg-gray-200"
                          } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative">{teacher.status}</span>
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

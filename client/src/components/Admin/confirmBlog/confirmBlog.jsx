import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import BlogDialog from "./BlogDialog";
import { getAllBlog } from "../../../fetchData/Blog";
import { formatDate } from "date-fns";
import { formatDate2 } from "../../../function/function";

const ConfirmBlogTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [open, setOpen] = useState(false);

  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    const res = await getAllBlog();
    if (res.status === 200) {
      setBlogs(res.data.blogs);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (blog) => {
    setSelectedBlog(blog);
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
                    Blog Title
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    Uploaded By
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr
                    key={blog.id}
                    className={`hover:bg-gray-100 cursor-pointer ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                    onClick={() => handleRowClick(blog)}
                  >
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {blog.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {formatDate2(blog.createdAt)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-medium leading-tight ${
                          blog.isApproved === "Confirmed"
                            ? "text-green-900"
                            : blog.isApproved === "Rejected"
                            ? "text-black"
                            : "text-gray-900"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 ${
                            blog.isApproved === "Confirmed"
                              ? "bg-green-600" // bg-primary
                              : blog.isApproved === "Rejected"
                              ? "bg-red-600"
                              : "bg-gray-200"
                          } opacity-50 rounded-full`}
                        >
                          {/* Nội dung khác của bạn */}
                        </div>
                        <span className="relative">{blog.isApproved}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <BlogDialog
        open={open}
        blog={selectedBlog}
        onClose={() => setOpen(false)}
        fetchData={fetchData}
      />
    </div>
  );
};

export default ConfirmBlogTable;

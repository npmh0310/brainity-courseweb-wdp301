import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import BlogDialog from "./BlogDialog";

const ConfirmBlogTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Understanding React Hooks",
      content: `This blog post explains the concept of React Hooks. Hooks are a new addition in React 16.8 that let you use state and other React features without writing a class.

      Motivation:
      Classes confuse both people and machines. You can use more of the React features without needing classes. It helps you to reuse stateful logic without changing your component hierarchy.

      Basic Hooks:
      - useState is the Hook that lets you add React state to function components.
      - useEffect is a Hook that lets you perform side effects in function components.
      
      Other Hooks:
      There are more Hooks like useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue.
      
      Conclusion:
      Hooks solve a wide variety of seemingly unconnected problems in React that we've encountered over five years of writing and maintaining tens of thousands of components. Whether you’re learning React, use it daily, or even prefer a different library with a similar component model, you might recognize some of these problems.`,
      status: "Pending",
      uploadBy: "John Doe",
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      content: `In this blog post, we compare CSS Grid and Flexbox. Both are CSS layout models that can create complex web page designs without much effort.

      Flexbox:
      Flexbox is designed for one-dimensional layouts. It excels at taking a bunch of items which have different sizes, and returning the best layout for those items.

      CSS Grid:
      Grid is designed for two-dimensional layouts. It excels at dividing a page into major regions or defining the relationship in terms of size, position, and layer, between parts of a control built from HTML primitives.

      Use Cases:
      - Use Flexbox for a more linear structure.
      - Use Grid for more complex, asymmetrical layouts.
      
      Conclusion:
      Both Flexbox and Grid have their uses and understanding both will help you to build robust layouts.`,
      status: "Pending",
      uploadBy: "Jane Smith",
    },
    // Add more blogs if needed
  ]);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilteredBlogs(
        blogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, blogs]);

  const handleConfirm = (id) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, status: "Confirmed" } : blog
    );
    setBlogs(updatedBlogs);
    setOpen(false);
  };

  const handleReject = (id) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, status: "Rejected" } : blog
    );
    setBlogs(updatedBlogs);
    setOpen(false);
  };

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
                {filteredBlogs.map((blog, index) => (
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
                        {blog.uploadBy}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-medium leading-tight ${
                          blog.status === "Confirmed"
                            ? "text-green-900"
                            : blog.status === "Rejected"
                            ? "text-black"
                            : "text-gray-900"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${
                            blog.status === "Confirmed"
                              ? "bg-primary"
                              : blog.status === "Rejected"
                              ? "bg-red-600"
                              : "bg-gray-200"
                          } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative">{blog.status}</span>
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
        onConfirm={handleConfirm}
        onReject={handleReject}
      />
    </div>
  );
};

export default ConfirmBlogTable;

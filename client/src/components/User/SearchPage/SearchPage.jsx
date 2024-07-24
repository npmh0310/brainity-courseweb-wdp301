import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getAllCourse } from "../../../fetchData/Course";
import { Left } from "../Categories/Left";
import { Right } from "../Categories/Right";
import { useLocation } from "react-router-dom";
import Item from "../../common/Item";
import CategoriesBg from "../../../assets/images/Categories/bg1.jpg";
import { useDebounce } from "use-debounce";
import { getCourseBySearch } from "../../../fetchData/Course";

export const SearchPage = () => {
  const [courseList, setCourseList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sortBy, setSortBy] = useState("Best Seller");
  const { ref: courseRef, inView: courseView } = useInView({
    triggerOnce: true,
  });

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchQuery, 300);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await getCourseBySearch(debouncedSearchTerm);
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("khong tim thay", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Xử lý Sort By
  const handleSortBy = (option) => {
    setSortBy(option); // Cập nhật lựa chọn hiện tại
    setIsOpen(false); // Đóng dropdown sau khi chọn
    filterCourses(option); // Lọc danh sách khoá học với lựa chọn mới
  };

  // Hàm lọc khoá học dựa trên Sort By
  const filterCourses = (option) => {
    if (option === "Best Seller") {
      handleSortByBestSeller();
    } else if (option === "New release") {
      handleSortByNewest();
    }
  };

  const handleSortByBestSeller = () => {
    const sortedCourses = [...courseList].sort(
      (a, b) => b.numOfEnrolledUsers - a.numOfEnrolledUsers
    );
    setFilteredCourses(sortedCourses);
  };

  const handleSortByNewest = () => {
    const sortedCourses = [...courseList].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFilteredCourses(sortedCourses);
  };

  const handleFilteredCourses = (filteredCourses) => {
    setFilteredCourses(filteredCourses);
  };

  return (
    <div ref={courseRef} className="container bg-white px-0 mx-auto pb-20">
      <div>
        <div className="border-b-2 py-4 text-3xl font-semibold">
          <div className="flex gap-2">
            <p>
              {searchResults && searchResults.length} result(s) for "
              {searchQuery}"
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4 mb-8 items-center">
          <div className="relative inline-block text-left items-center gap-2">
            <div>
              <button
                type="button"
                className="inline-flex justify-between items-center w-48 h-fit rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={toggleDropdown}
              >
                <div className="text-left">
                  <p className="text-sm font-normal">Sorted by</p>
                  <p className="text-lg font-semibold">{sortBy}</p>
                </div>
                <svg
                  className={`-mr-1 ml-2 h-5 w-5 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div
                className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={() => handleSortBy("Best Seller")}
                  >
                    Best Seller
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={() => handleSortBy("New release")}
                  >
                    New release
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-10">
        {/* Left component */}

        <Left onFilteredCourses={handleFilteredCourses} />

        {/* Right component */}
        <div ref={courseRef} className="col-span-5 block">
          {searchResults.length === 0 ? (
            <p className="text-center text-xl text-gray-600">No Course Found</p>
          ) : (
            <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2  lg:grid-cols-3 ">
              {searchResults.map((data) => (
                <Item key={data.id} data={data} loading={loading} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

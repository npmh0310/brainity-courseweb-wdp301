import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { getAllCourseNoLimit } from "../../../fetchData/Course";

export const Left = ({ onFilteredCourses }) => {
  const [courseData, setCourseData] = useState([]);
  const [checked, setChecked] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [categories, setCategories] = useState("");
  const [ratingRange, setRatingRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCourseNoLimit();
        setCourseData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Handle sort option change
  const handleChecked = (option) => {
    setChecked((prevOption) => (prevOption === option ? "" : option));
  };

  // Handle price range change
  const handlePriceRangeChange = (range) => {
    setPriceRange((prevRange) => (prevRange === range ? "" : range));
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setCategories((prevCategory) =>
      prevCategory === category ? "" : category
    );
  };

  // Handle rating range change
  const handleRatingRangeChange = (range) => {
    setRatingRange((prevRange) => (prevRange === range ? "" : range));
  };

  useEffect(() => {
    const filterCourses = () => {
      let filteredCourses = [...courseData];

      // Sort by Best Seller
      if (checked === 1) {
        filteredCourses = filteredCourses.filter((course) => course.numOfEnrolledUsers >= 2);
      }
      // Sort by Rating
      if (checked === 2) {
        filteredCourses.sort(
          (a, b) => b.ratingInfo.avgRating - a.ratingInfo.avgRating
        );
      }

      // Filter by Categories
      if (categories) {
        filteredCourses = filteredCourses.filter((course) =>
          categories === "Beginner"
            ? course.courseName.toLowerCase().includes("beginner") ||
              course.courseName.toLowerCase().includes("newbie") ||
              course.courseName.toLowerCase().includes("basic")
            : !course.courseName.toLowerCase().includes("beginner") &&
              !course.courseName.toLowerCase().includes("newbie") &&
              !course.courseName.toLowerCase().includes("basic")
        );
      }

      // Filter by Rating Range
      if (ratingRange) {
        const [min, max] = ratingRange.split(" to ").map(Number);
        filteredCourses = filteredCourses.filter(
          (course) =>
            course.ratingInfo.avgRating >= min &&
            course.ratingInfo.avgRating <= max
        );
      }

      // Filter by Price Range
      if (priceRange) {
        filteredCourses = filteredCourses.filter((course) => {
          const [min, max] = priceRange.split("-").map(Number);
          return course.price >= min && course.price <= max;
        });
      }

      return filteredCourses;
    };

    const filteredCourses = filterCourses();
    onFilteredCourses(filteredCourses);
  }, [checked, priceRange, categories, ratingRange, courseData]);

  return (
    <div className="block col-span-1 items-center">
      {/* sort */}
      <div className="block text-black font-medium pt-4 border-t-2 border-y-yellow-800">
        <p className="mb-4 text-lg">Sort by</p>
        <div className="mb-3 cursor-pointer text-sm ">
          <input
            className="mr-2 cursor-pointer "
            type="radio"
            checked={checked === 1}
            onClick={() => handleChecked(1)}
            readOnly
          />
          <label onClick={() => handleChecked(1)}>Best Seller</label>
        </div>
        <div className="mb-3 cursor-pointer text-sm ">
          <input
            className="mr-2 cursor-pointer "
            checked={checked === 2}
            onClick={() => handleChecked(2)}
            readOnly
            type="radio"
          />
          <label onClick={() => handleChecked(2)}>Star</label>
        </div>
        <div className="border-b-2 border-y-yellow-800 pb-4"></div>
      </div>
      {/* categories */}
      <div className="block text-black font-medium pt-4">
        <p className="mb-4 text-lg">Categories</p>
        <div className="mb-3 cursor-pointer text-sm">
          <input
            className="mr-2 cursor-pointer "
            type="radio"
            checked={categories === "Beginner"}
            onClick={() => handleCategoryChange("Beginner")}
          />
          <label>Beginners</label>
        </div>
        <div className="mb-3 cursor-pointer text-sm pb-4">
          <input
            className="mr-2 cursor-pointer"
            type="radio"
            checked={categories === "Expert"}
            onClick={() => handleCategoryChange("Expert")}
          />
          <label>Experts</label>
        </div>
        <div className="border-b-2 border-y-yellow-800"></div>
      </div>
      {/* ratings */}
      <div className="block text-black font-medium pt-4">
        <p className="mb-2 text-lg">Rating</p>
        <div className="block items-center pb-2 flex-wrap">
          <div className="flex items-center pb-3">
            <input
              className="mr-2 cursor-pointer "
              checked={ratingRange === "4 to 5"}
              onClick={() => handleRatingRangeChange("4 to 5")}
              type="radio"
            />
            <span className="text-sm flex items-center gap-1">
              <div> 4.0 - 5.0</div>
              <Rating
                className="mb-[2px]"
                name="half-rating-read"
                defaultValue={5}
                precision={0.5}
                readOnly
                size="small"
              />
            </span>
          </div>
          <div className="flex items-center pb-3">
            <input
              className="mr-2 cursor-pointer "
              checked={ratingRange === "3 to 4"}
              onClick={() => handleRatingRangeChange("3 to 4")}
              type="radio"
            />
            <span className="text-sm flex items-center gap-1">
              <div> 3.0 - 4.0</div>
              <Rating
                className="mb-[2px]"
                name="half-rating-read"
                defaultValue={4}
                precision={0.5}
                readOnly
                size="small"
              />
            </span>
          </div>
          <div className="flex items-center pb-3">
            <input
              className="mr-2 cursor-pointer "
              checked={ratingRange === "0 to 3"}
              onClick={() => handleRatingRangeChange("0 to 3")}
              type="radio"
            />
            <span className="text-sm flex items-center gap-1">
              <div>Under 3.0</div>
              <Rating
                className="mb-[2px]"
                name="half-rating-read"
                defaultValue={3}
                precision={0.5}
                readOnly
                size="small"
              />
            </span>
          </div>
        </div>
        <div className="border-b-2 border-y-yellow-800 pb-4"></div>
      </div>
      {/* price */}
      <div className="block text-black font-medium pt-4">
        <p className="mb-4 text-lg">Price</p>
        <div className="mb-3 cursor-pointer text-sm">
          <input
            className="mr-2 cursor-pointer "
            type="radio"
            checked={priceRange === "200000-500000"}
            onClick={() => handlePriceRangeChange("200000-500000")}
          />
          <label>200.000vnd - 500.000vnd</label>
        </div>
        <div className="mb-3 cursor-pointer text-sm">
          <input
            className="mr-2 cursor-pointer "
            type="radio"
            checked={priceRange === "500000-1000000"}
            onClick={() => handlePriceRangeChange("500000-1000000")}
          />
          <label>500.000vnd - 1.000.000vnd</label>
        </div>
        <div className="mb-3 cursor-pointer text-sm">
          <input
            className="mr-2 cursor-pointer "
            type="radio"
            checked={priceRange === "1000000-5000000"}
            onClick={() => handlePriceRangeChange("1000000-5000000")}
          />
          <label>1.000.000vnd - 5.000.000vnd</label>
        </div>
      </div>
    </div>
  );
};
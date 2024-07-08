import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { getAllCourse } from "../../../fetchData/Course";

export const Left = ({ onFilteredCourses }) => {
  const [courseData, setCourseData] = useState([]);
  const [checked, setChecked] = useState("");
  const [priceRange, setPriceRange] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ratingRange, setRatingRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCourse();
        setCourseData(response.data.data);
        console.log("hihihaha",response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
},[])
   // Xử lý khi người dùng chọn lựa chọn sắp xếp
   const handleChecked = (option) => {
    setChecked((prevOption) => (prevOption === option ? "" : option));
  };

  // Xử lý khi người dùng thay đổi phạm vi giá
  const handlePriceRangeChange = (range) => {
    setPriceRange((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  // Xử lý khi người dùng thay đổi danh mục
  const handleCategoryChange = (category) => {
    setCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Xử lý khi người dùng thay đổi phạm vi đánh giá
  const handleRatingRangeChange = (range) => {
    setRatingRange((prev) => (prev === range ? "" : range));
  };


  useEffect(() => {
     const filterCourses = () => {
    let filteredCourses = [...courseData];

    // Sort by Best Seller
    if (checked === 1) {
      filteredCourses = filteredCourses.filter((course) => course.numOfEnrolledUsers > 2);
      console.log(filteredCourses);
    }

    // Sort by Rating
    if (checked === 2) {
      filteredCourses.sort((a, b) => b.ratingInfo.avgRating - a.ratingInfo.avgRating);
      console.log(filteredCourses);
    }

    // Filter by Categories
    // chứa "beginner", "newbie" hay "basic" thì nó là beginner
    if (categories.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        categories.includes("Beginner")
          ? course.courseName.toLowerCase().includes("beginner") || 
            course.courseName.toLowerCase().includes("newbie") || 
            course.courseName.toLowerCase().includes("basic")
          : !course.courseName.toLowerCase().includes("beginner") && 
            !course.courseName.toLowerCase().includes("newbie") && 
            !course.courseName.toLowerCase().includes("basic")
      );
      console.log(filteredCourses);
    }

    // Filter by Rating Range
    if (ratingRange) {
      const [min, max] = ratingRange.split(" to ").map(Number);
      filteredCourses = filteredCourses.filter(
        (course) => course.ratingInfo.avgRating >= min && course.ratingInfo.avgRating <= max
      );
    }

    // Filter by Price Range
    if (priceRange.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        priceRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return course.price >= min && course.price <= max;
        })
      );
    }

    return filteredCourses;
  };

  const filteredCourses = filterCourses();
  onFilteredCourses(filteredCourses);
  },[checked, priceRange, categories, ratingRange, courseData])
 

  return (
    <div className="block col-span-1 items-center">
      {/* sort */}
      <div className="block text-black font-medium pt-4 border-t-2 border-y-yellow-800">
        <p className="mb-4 text-lg">Sort by</p>
        <div className="mb-3 cursor-pointer hover:text-third text-sm ">
          <input
            className="mr-2 cursor-pointer hover:text-third"
            type="radio"
            checked={checked === 1}
            onClick={() => handleChecked(1)}
            readOnly
            name=""
            id=""
          />
          <label htmlFor="" onClick={() => handleChecked(1)}>
            Best Seller
          </label>
        </div>
        <div className="mb-3 cursor-pointer hover:text-third text-sm ">
          <input
            className="mr-2 cursor-pointer hover:text-third"
            checked={checked === 2}
            onClick={() => handleChecked(2)}
            readOnly
            type="radio"
            name=""
            id=""
          />
          <label htmlFor="" onClick={() => handleChecked(2)}>
            Star
          </label>
        </div>
        <div className="border-b-2 border-y-yellow-800 pb-4"></div>
      </div>
      {/* categories */}
      <div className="block text-black font-medium pt-4">
        <p className="mb-4 text-lg">Categories</p>
        <div className="mb-3 cursor-pointer hover:text-third text-sm">
          <input
            className="mr-2 cursor-pointer hover:text-third"
            type="checkbox"
            checked={categories.includes("Beginner")}
            onChange={() => handleCategoryChange("Beginner")}
            name=""
            id=""
          />
          <label htmlFor="">Beginners</label>
        </div>
        <div className="mb-3 cursor-pointer hover:text-third text-sm pb-4">
          <input
            className="mr-2 cursor-pointer hover:text-third"
            type="checkbox"
            checked={categories.includes("Expert")}
            onChange={() => handleCategoryChange("Expert")}
            name=""
            id=""
          />
          <label htmlFor="">Experts</label>
        </div>
        <div className="border-b-2 border-y-yellow-800"></div>
      </div>
      {/* ratings */}
      <div className="block text-black font-medium pt-4">
        <p className="mb-2 text-lg">Rating</p>
        <div className="block items-center pb-2 flex-wrap">
          <div className="flex items-center pb-3">
            <input
              className="mr-2 cursor-pointer hover:text-third"
              checked={ratingRange === "4 to 5"}
              onClick={() => handleRatingRangeChange("4 to 5")}
              type="radio"
              name=""
              id=""
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
              className="mr-2 cursor-pointer hover:text-third"
              checked={ratingRange === "3 to 4"}
              onClick={() => handleRatingRangeChange("3 to 4")}
              type="radio"
              name=""
              id=""
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
              className="mr-2 cursor-pointer hover:text-third"
              checked={ratingRange === "Under 3"}
              onClick={() => handleRatingRangeChange("Under 3")}
              type="radio"
              name=""
              id=""
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
        <div className="mb-3 cursor-pointer hover:text-third text-sm">
          <input
            className="mr-2 cursor-pointer hover:text-third"
            type="checkbox"
            checked={priceRange.includes('200000-500000')}
            onChange={() => handlePriceRangeChange('200000-500000')}
            name=""
            id=""
          />
          <label htmlFor="">200.000vnd - 500.000vnd</label>
        </div>
        <div className="mb-3 cursor-pointer hover:text-third text-sm">
          <input
            className="mr-2 cursor-pointer hover:text-third"
            type="checkbox"
            checked={priceRange.includes('500000-1000000')}
            onChange={() => handlePriceRangeChange('500000-1000000')}
            name=""
            id=""
          />
          <label htmlFor="">500.000vnd - 1.000.000vnd</label>
        </div>
        <div className="mb-3 cursor-pointer hover:text-third text-sm">
          <input
            className="mr-2 cursor-pointer hover:text-third"
            type="checkbox"
            checked={priceRange.includes('1000000-5000000')}
            onChange={() => handlePriceRangeChange('1000000-5000000')}
            name=""
            id=""
          />
          <label htmlFor="">1.000.000vnd - 5.000.000vnd</label>
        </div>
      </div>
    </div>
  );
};

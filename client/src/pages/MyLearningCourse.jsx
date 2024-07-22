import React, { useEffect, useState } from "react";
import learningImg from "../assets/images/wallpaperflare.com_wallpaper.jpg";
import avatar from "../assets/images/6298053d43cd1.jpg";
import { HiUserGroup, HiCursorClick } from "react-icons/hi";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { getAllCourseEnrolled } from "../fetchData/User";

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const MyLearningCourse = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    getAllCourseEnrolled()
      .then((res) => {
        console.log("Fetched Courses Data:", res.data.coursesEnrolled);
        setEnrolledCourses(res.data.coursesEnrolled);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error.message);
      });

    setProgress(30); // set progress
  }, []);

  return (
    <div className="mb-20">
      <div className="container w-full mx-auto">
        <div
          className="relative h-80 rounded-b-3xl"
          style={{
            backgroundImage: `url(${learningImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute top-56 left-24 flex items-end">
            <div className="rounded-full p-2 bg-white">
              <img className="rounded-full w-40" src={avatar} alt="Avatar" />
            </div>
            <div className="mb-8 ml-5">
              <h1 className="text-3xl font-semibold">Nguyen Phuoc Minh Hieu</h1>
            </div>
          </div>
        </div>
        <div className="flex mt-32 justify-between container mx-auto">
          {/* Left */}
          <div className="flex w-[41%] gap-y-4 flex-col">
            <div
              className="flex flex-col gap-y-4 rounded-lg px-6 py-5 w-full"
              style={{
                boxShadow: "0 0 5px 0 rgba(0,0,0,.1),0 0 1px 0 rgba(0,0,0,.1)",
              }}
            >
              <h2 className="text-lg font-medium">Introduce</h2>
              <div className="flex items-center gap-x-3">
                <HiUserGroup className="text-xl mb-1 text-gray-600" />
                <span className="text-sm">
                  Brainity member since{" "}
                  <span className="font-medium">2 years ago</span>
                </span>
              </div>
            </div>
            <div
              className="flex flex-col gap-y-4 rounded-lg px-6 py-5 w-full"
              style={{
                boxShadow: "0 0 5px 0 rgba(0,0,0,.1),0 0 1px 0 rgba(0,0,0,.1)",
              }}
            >
              <h2 className="text-lg font-medium">Recent activity</h2>
              <div className="flex items-center gap-x-3">
                <HiCursorClick className="text-xl mb-1 text-gray-600" />
                <span className="text-sm">No recent activity</span>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="flex w-[57%]">
            <div
              className="flex w-full flex-col gap-y-7 rounded-lg px-6 py-5"
              style={{
                boxShadow: "0 0 5px 0 rgba(0,0,0,.1),0 0 1px 0 rgba(0,0,0,.1)",
              }}
            >
              <h1 className="text-lg font-medium">Courses attended</h1>
              {Array.isArray(enrolledCourses) && enrolledCourses.length > 0 ? (
                enrolledCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-4 mx-1 pb-7 border-b-[1px] border-b-gray-300 last:border-none last:pb-0"
                  >
                    <Link
                      className="md:w-1/2 w-full"
                      to={`/course/${course._id}`}
                    >
                      <img
                        className="rounded-lg w-full h-auto md:h-44"
                        src={course.imageUrl}
                        alt={course.name}
                      />
                    </Link>
                    <div className="w-full md:w-1/2 block">
                      <h2 className="font-bold text-lg mb-2 ">
                        <Link to={`/course/${course._id}`}>
                          {course.courseName}
                        </Link>
                      </h2>
                      <div className="text-sm mb-2 mt-2">
                        {course.description}
                      </div>
                      <div className="text-sm mb-2 mt-2">
                        Learned 3 months ago
                      </div>
                      <div className="flex flex-row items-center gap-x-1">
                        {course.ratingInfo && (
                          <>
                            <span className="text-sm">
                              {course.ratingInfo.avgRating}
                            </span>
                            <Rating
                              className="mb-[2px]"
                              name="half-rating-read"
                              defaultValue={course.ratingInfo.avgRating}
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                          </>
                        )}
                      </div>
                      <div>
                        <LinearProgressWithLabel value={40} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No courses available</p>
              )}
            </div>
          </div>
          {/* Right */}
        </div>
      </div>
    </div>
  );
};

export default MyLearningCourse;

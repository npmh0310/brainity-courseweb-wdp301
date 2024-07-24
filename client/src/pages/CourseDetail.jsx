import React from "react";
import Star from "../assets/images/star.png";
import {
  Check,
  Dot,
  Heart,
  Infinity,
  MonitorPlay,
  MonitorSmartphone,
  Trophy,
} from "lucide-react";
import Section from "../components/User/CourseDetail/Section/Section";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import {
  addCourseInFavourite,
  createPayment,
  deleteCourseInFavourite,
  getCourseById,
  getFavouriteCourse,
  getStudents,
} from "../fetchData/Course";
import GlobalLoading from "../components/common/GlobalLoading/GlobalLoading";
import {
  formatCurrencyVND,
  formatDate,
  formatDate2,
} from "../function/function";
import {
  getRatingByCourseId,
  getAvgRating,
  getRatingByCourseIdSortStar,
} from "../fetchData/Rating";
import { getProfile } from "../fetchData/User";
import { Modal, Button } from "@mui/material";

import { FaStar, FaRegStar } from "react-icons/fa";
import {
  addCourse,
  getAllInCart,
  getCartLoading,
  getCoursesInCart,
} from "../redux/features/cartSlice";
import { getRatingCourse } from "../fetchData/RatingOfCourse";
import { Rating } from "@mui/material";
import { addCourseToCart } from "../fetchData/Cart";
import CircularProgress from "@mui/material/CircularProgress";

import { Spinner } from "flowbite-react";
import { enrollCourse } from "../fetchData/Enroll";
import {
  getCourseEnrolled,
  getIsLogin,
  validateToken,
} from "../redux/features/authSlice";

import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFilled } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-solid-svg-icons";

function CourseDetail() {
  const { id: courseId } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const divRefBanner = useRef(null);
  const divRefPage = useRef(null);
  const [heightOfBanner, setHeightOfBanner] = useState();
  const dispatch = useDispatch();
  const [course, setCourse] = useState();
  const [statusCourse, setStatusCourse] = useState(false);
  const cart = useSelector(getAllInCart);
  const [rating, setRating] = useState();
  const [ratingOfCourse, setRatingOfCourse] = useState();
  const loading = useSelector(getCartLoading);
  const navigate = useNavigate();
  const [ratingByStar, setRatingByStar] = useState([]);
  const [avgRating, setAvgRating] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedStar, setSelectedStar] = useState(null);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [students, setStudents] = useState(0);
  const isLogin = useSelector(getIsLogin);
  const courseEnrolled = useSelector(getCourseEnrolled);
  const exist =
    courseEnrolled && courseEnrolled.includes(courseId) ? true : false;

  const [initialSortedRatings, setInitialSortedRatings] = useState([]);
  // đếm số người rating từng loại sao
  const [ratingsCount, setRatingsCount] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  // total rating
  const [totalRatingsCount, setTotalRatingsCount] = useState(0);

  useEffect(() => {
    if (rating) {
      const filtered = rating.filter((r) => r.comment);
      setFilteredRatings(filtered);
    }
  }, [rating]);

  //Data

  useEffect(() => {
    const fetchData = async (courseId) => {
      dispatch(setGlobalLoading(true));
      try {
        // Fetch course data
        const courseResponse = await getCourseById(courseId);
        if (courseResponse.data.success) {
          setCourse(courseResponse.data.data);
        } else {
          console.log("Failed to fetch course data");
        }

        // Fetch rating data
        const ratingResponse = await getRatingByCourseId(courseId);
        if (ratingResponse.data) {
          setRating(ratingResponse.data.ratings);
          setTotalRatingsCount(ratingResponse.data.totalRatingsCount);
        } else {
          console.log("Failed to fetch rating data");
        }

        const avgRatingResponse = await getAvgRating(courseId);
        if (avgRatingResponse.data) {
          setAvgRating(avgRatingResponse.data.avgRating);
        } else {
          console.log("Failed to fetch average rating data");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    if (courseId) {
      fetchData(courseId);
    } else {
      console.log("Invalid courseId");
    }
  }, [courseId, dispatch]);

  const handleOpenModal = async () => {
    try {
      const ratingByStarResponse = await getRatingByCourseIdSortStar(courseId);
      if (ratingByStarResponse.data) {
        setInitialSortedRatings(ratingByStarResponse.data.ratings);
        setRatingByStar(ratingByStarResponse.data.ratings);
        setRatingsCount(ratingByStarResponse.data.ratingsCount);
      } else {
        console.log("Failed to fetch sorted rating data");
      }
    } catch (error) {
      console.log("Error fetching sorted rating data:", error);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setRatingByStar(ratingByStar);
    setShowModal(false);
    setSelectedStar(null);
  };

  const handleFilterByStar = (rate) => {
    if (selectedStar === rate) {
      setSelectedStar(null);
      setRatingByStar(initialSortedRatings);
    } else {
      setSelectedStar(rate);
      const filtered = rating.filter((r) => r.rate === rate);
      setRatingByStar(filtered);
    }
  };

  useEffect(() => {
    const course = cart.find((data) => data.course._id === courseId);
    if (course != null) {
      setStatusCourse(true);
    }
  }, [cart, courseId]);

  // rating
  const fetchRattingCourse = async (courseId) => {
    const response = await getRatingCourse(courseId);

    if (response != null) {
      setRatingOfCourse(response.data);
    }
  };
  useEffect(() => {
    fetchStudents(courseId);
    fetchRattingCourse(courseId);
  }, [courseId]);

  // add To cart
  const addToCart = async () => {
    dispatch(addCourse(courseId));
  };

  const handleButtonAdd = () => {
    if (isLogin) {
      if (!statusCourse) {
        addToCart();
      } else {
        navigate("/cart");
      }
    } else {
      navigate("/signin");
    }
  };

  const handleButtonEnroll = async () => {
    if (isLogin) {
      const res = await enrollCourse(courseId);
      if (res.status === 200) {
        dispatch(validateToken());
      }
    } else {
      navigate("/signin");
    }
  };

  const handleExist = async () => {
    navigate(`/learningCourse/${courseId}`);
  };

  const fetchStudents = async (courseId) => {
    const res = await getStudents(courseId);
    if (res.status === 200) {
      setStudents(res.data.total);
    }
  };

  // add fatovites
  const [courseList, setCourseList] = useState([]);

  const handleFavorite = (courseId, isFavourite) => {
    if (isFavourite) {
      deleteCourseInFavourite(courseId).then((res) => {
        toast.success("Remove favourite course");
        setCourseList((prevList) =>
          prevList.filter((course) => course._id !== courseId)
        );
      });
    } else {
      addCourseInFavourite(courseId).then((res) => {
        toast.success("Add favourite course");
        const addedCourse = { _id: courseId };
        setCourseList((prevList) => [...prevList, addedCourse]);
      });
    }
  };

  useEffect(() => {
    getFavouriteCourse()
      .then((response) => {
        const data = Object.values(response.data.data);
        setCourseList(data);
      })
      .catch((error) => {
        console.error("Error while fetching favourite courses: ", error);
      });
  }, []);

  const isCourseInList = courseList.some((c) => c._id === course._id);
  const handleBuyNow = async () => {
    const res = await createPayment(course.price, "buynowne", courseId);
    if (res) {
      window.open(res.data.url, "_self");
    }
  };

  return (
    <div className="relative courseDetail w-full ">
      <div className={` h-[300px] absolute bg-[#2d2f31]  z-0 w-full`}></div>
      <GlobalLoading />

      {course && (
        <>
          <div
            ref={divRefPage}
            className=" max-w-[1280px] mx-auto w-full flex justify-start"
          >
            <div className=" w-full px-2 lg:w-8/12 z-10 ">
              <div
                ref={divRefBanner}
                className=" banner px-8 py-6 flex flex-col mb-4 "
              >
                <h1 className=" text-3xl text-white font-bold mb-4">
                  {course.courseName}
                </h1>
                <div className=" text-sm text-white mb-4">
                  {course.description}
                </div>
                <div className=" flex gap-2 text-white justify-start items-center mb-2">
                  {ratingOfCourse && ratingOfCourse.numOfRates > 2 && (
                    <div className="  p-1 bg-[#eceb98] text-sm text-center font-semibold text-black">
                      Bestseller
                    </div>
                  )}
                  {ratingOfCourse != null && (
                    <div className=" flex justify-center items-center gap-1 ">
                      <span className="text-sm">
                        {ratingOfCourse.avgRating}
                      </span>
                      <Rating
                        className="mb-[2px]"
                        name="half-rating-read"
                        value={ratingOfCourse.avgRating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                    </div>
                  )}
                  <div className=" text-white text-sm">{students} students</div>
                </div>
                <div className=" text-white text-sm tracking-wide mb-6">
                  Create by{" "}
                  <Link className=" text-purple-200 underline" href="#">
                    {course.instructor.username}
                  </Link>
                </div>
                <div className="px-2 flex flex-col gap-y-6 bg-white ">
                  <div className=" py-6 pb-4 border ">
                    <h2 className=" text-xl text-start font-semibold mx-6 mb-4">
                      What you'll learn
                    </h2>
                    <div className=" flex justify-center items-center mx-6">
                      <ul className="  grid grid-cols-2 gap-x-3">
                        <li>
                          <div className=" py-1 flex justify-start items-start">
                            <Check />
                            <span className=" text-sm text-black ml-2">
                              Become an advanced, confident, and modern React
                              developer from scratch
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className=" py-1 flex justify-start items-start">
                            <Check />
                            <span className=" text-sm text-black ml-2">
                              Become an advanced, confident, and modern React
                              developer from scratch
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className=" py-1 flex justify-start items-start">
                            <Check />
                            <span className=" text-sm text-black ml-2">
                              Become an advanced, confident, and modern React
                              developer from scratch
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className=" py-1 flex justify-start items-start">
                            <Check />
                            <span className=" text-sm text-black ml-2">
                              Become an advanced, confident, and modern React
                              developer from scratch
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className=" py-1 flex justify-start items-start">
                            <Check />
                            <span className=" text-sm text-black ml-2">
                              Become an advanced, confident, and modern React
                              developer from scratch
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className=" pt-4 mb-4">
                    <h2 className=" text-xl text-start font-semibold mb-2">
                      This course includes:
                    </h2>
                    <div className=" flex justify-start items-center">
                      <ul className=" w-9/12 grid grid-cols-2 gap-x-4">
                        <li>
                          <div className=" flex justify-start items-center py-1">
                            <MonitorPlay size={14} />
                            <span className=" text-sm ml-2">
                              84 hours on-demand video
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className=" flex justify-start items-center py-1">
                            <MonitorPlay size={14} />
                            <span className=" text-sm ml-2">
                              84 hours on-demand video
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className=" flex justify-start items-center py-1">
                            <MonitorPlay size={14} />
                            <span className=" text-sm ml-2">
                              84 hours on-demand video
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className=" pt-4">
                    <h2 className=" text-xl text-start font-semibold mb-4">
                      Course content
                    </h2>
                    <div className=" flex justify-between items-center">
                      <div className=" flex items-center gap-x-1 my-2 text-sm ">
                        <span>40 sections</span>
                        <Dot size={12} />
                        <span>505 lectures</span>
                        <Dot size={12} />

                        <span>83h 52m total length</span>
                      </div>
                      <span className=" text-sm font-semibold text-purple-400 hover:text-purple-900 transition-all ease-in-out cursor-pointer text-end">
                        Expand all section
                      </span>
                    </div>
                    <div className=" flex flex-col">
                      {course.sections &&
                        course.sections.map((section, index) => (
                          <Section section={section} key={index} />
                        ))}
                    </div>
                  </div>
                  <div className=" py-4">
                    <h2 className=" text-xl text-start font-semibold mb-4">
                      Description
                    </h2>
                    <div className=" w-full flex flex-col gap-y-2  text-sm text-start">
                      <p>{course.description}</p>
                      <strong>
                        Self Inventory as a Path to Employment and Career
                        Fulfillment
                      </strong>
                      <p>
                        Too often, career search begins with looking for
                        employment vacancies; scanning the job markets and
                        trying to figure out how to best “fit in", writing a
                        resume, searching employment ads, and replying and
                        waiting for responses.
                      </p>
                    </div>
                  </div>

                  {/* Rating */}

                  <div>
                    <h1 className="text-2xl font-bold flex font-secondary">
                      <span className="flex justify-center items-center mr-2">
                        <FaStar className="w-4 h-4  text-[#faaf00]" />
                      </span>{" "}
                      {avgRating} course rating on average -{" "}
                      {totalRatingsCount && totalRatingsCount} ratings
                    </h1>
                    <div className="grid grid-cols-2 gap-x-10 mt-7">
                      {filteredRatings.length > 0 ? (
                        filteredRatings.map((rating) => (
                          <article
                            key={rating._id}
                            className="px-4 py-6 border-t-[1px] border-gray-200"
                          >
                            <div className="flex items-start mb-3">
                              <img
                                className="w-12 h-12 me-4 rounded-full"
                                src={rating.user.avatar}
                                alt=""
                              />
                              <div className="font-semibold ">
                                <p>{rating.user.username}</p>{" "}
                                <div className="flex items-center ">
                                  <Rating
                                    className="mb-[2px]"
                                    name="half-rating-read"
                                    defaultValue={rating.rate}
                                    precision={0.1}
                                    readOnly
                                    size="small"
                                  />
                                </div>
                              </div>
                            </div>

                            <h3 className="text-md my-3 text-gray-900">
                              {rating.comment}
                            </h3>
                            <footer className="mb-2 text-sm text-gray-500">
                              <p>
                                Reviewed on
                                <span> {formatDate2(rating.createdAt)}</span>
                              </p>
                            </footer>
                            <p className="mb-2 text-gray-500">
                              {rating.review}
                            </p>
                          </article>
                        ))
                      ) : (
                        <p className="text-gray-500">No ratings found.</p>
                      )}
                    </div>
                    <button
                      onClick={handleOpenModal}
                      className="mt-4 font-medium rounded-sm mb-8 py-3 text-sm px-5 border border-black hover:bg-gray-300 transition-all duration-300 "
                    >
                      Show all Ratings
                    </button>
                    <Modal
                      open={showModal}
                      onClose={handleCloseModal}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <div className="flex flex-col rounded-sm min-w-[789px] w-[50%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-4 shadow-lg  mx-auto ">
                        {/* Filter Section */}
                        <div className="flex px-6 mb-3 flex-row">
                          <span className="flex justify-center items-center mr-2">
                            <FaStar className="w-5 h-5  text-[#faaf00]" />
                          </span>
                          <h2 className="text-xl  font-semibold py-4 b text-center">
                            {avgRating} course rating
                            <span className="text-gray-400 text-sm mx-2">
                              {" "}
                              ●{" "}
                            </span>{" "}
                            {totalRatingsCount && totalRatingsCount} ratings
                          </h2>
                        </div>
                        <div className="flex flex-row gap-x-3 px-1">
                          <div className="w-1/4">
                            <div className="">
                              {[5, 4, 3, 2, 1].map((star) => (
                                <Button
                                  key={star}
                                  className={`w-full mt-2 border flex justify-center items-center opacity-100`}
                                  sx={{
                                    opacity:
                                      selectedStar === null ||
                                      selectedStar === star
                                        ? 1
                                        : 0.2,
                                  }}
                                  onClick={() => handleFilterByStar(star)}
                                >
                                  <Rating
                                    className="mb-[2px]"
                                    name="half-rating-read"
                                    defaultValue={star}
                                    precision={0.1}
                                    readOnly
                                    size="small"
                                  />{" "}
                                  <span className="ml-2">
                                    ({ratingsCount[star]})
                                  </span>
                                </Button>
                              ))}
                            </div>
                          </div>
                          {/* Content Section */}
                          <div className="w-3/4  h-[70vh] scrollbar-custom overflow-y-auto">
                            {ratingByStar.length > 0 ? (
                              ratingByStar.map((rating) => (
                                <div key={rating._id} className="border-t py-4">
                                  <div className="flex flex-row">
                                    <img
                                      className="w-12 h-12 me-4 rounded-full"
                                      src={rating.user.avatar}
                                      alt=""
                                    />
                                    <div className="flex flex-col gap-y-1">
                                      <h1 className="font-medium">
                                        {rating.user.username}
                                      </h1>
                                      <div className="flex flex-row justify-center items-center gap-x-2">
                                        <span className="flex ">
                                          <Rating
                                            className="mb-[2px]"
                                            name="half-rating-read"
                                            defaultValue={rating.rate}
                                            precision={0.1}
                                            readOnly
                                            size="small"
                                          />
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          {" "}
                                          {formatDate(rating.createdAt)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" text-sm text-gray-800 mt-4">
                                    {rating.comment ? (
                                      <p className="">{rating.comment}</p>
                                    ) : (
                                      <p className=" italic">No comment</p>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">
                                No ratings found for this filter.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>

            <div className=" relative w-0 lg:w-4/12">
              <div
                className={`courseView  hidden lg:flex mt-6  ml-4 min-w-[320px] w-[320px] bg-white shadow-lg sticky top-0 `}
              >
                <div className=" w-full">
                  <div className=" h-40 flex justify-center items-center p-1 mb-2">
                    {course.sections &&
                      course.sections[0] &&
                      course.sections[0].lessons &&
                      course.sections[0].lessons.length > 0 &&
                      course.sections[0].lessons[0].videoUrl && (
                        <video
                          controls
                          src={course.sections[0].lessons[0].videoUrl}
                          className="w-full h-full object-cover"
                        ></video>
                      )}
                  </div>
                  <div className=" p-6 w-full flex flex-col gap-y-2 items-start">
                    {!course.isFree ? (
                      <span className=" text-2xl text-black font-semibold">
                        {formatCurrencyVND(course.price)}
                      </span>
                    ) : (
                      ""
                    )}
                    {!exist ? (
                      <>
                        {!course.isFree ? (
                          <div className="w-full flex flex-col gap-y-2 items-start">
                            <div className="w-full flex justify-between items-center">
                              <div
                                className={` p-3 ${
                                  isLogin ? "w-9/12" : "w-full"
                                } text-sm uppercase font-semibold text-white text-center bg-primary border hover:bg-[#03cba3] hover:font-bold hover:scale-105 cursor-pointer transition-all ease-in-out `}
                               onClick={handleButtonAdd}
                              >
                                {loading ? (
                                  <CircularProgress color="inherit" />
                                ) : (
                                  <>
                                    {statusCourse
                                      ? "Go to Cart"
                                      : "Add to Cart"}
                                  </>
                                )}
                              </div>
                              {isLogin && (
                                <div
                                  className=" p-3  flex items-center justify-center  w-2/12 border border-red-500 cursor-pointer hover:bg-red-100"
                                  onClick={() =>
                                    handleFavorite(course._id, isCourseInList)
                                  }
                                >
                                  <FontAwesomeIcon
                                    className="text-red-500"
                                    icon={
                                      isCourseInList
                                        ? faHeartOutline
                                        : faHeartFilled
                                    }
                                  />
                                </div>
                              )}
                            </div>
                            {/* <div className=" p-3 text-sm w-full font-semibold text-black text-center bg-[#eceb98] border border-black ">

                              <div className=" p-3  flex items-center justify-center  w-2/12 border border-black ">
                                <Heart size={14} />
                              </div>
                            </div> */}
                            {!statusCourse && <div
                              className=" p-3 w-full text-lg font-semibold text-black text-center bg-[#eceb98] border border-black cursor-pointer hover:bg-opacity-65 hover:scale-105 transition-all ease-in-out "
                              onClick={handleBuyNow}
                            >
                              Buy now
                            </div>}
                          </div>
                        ) : (
                          <div
                            className="w-full p-4 text-sm font-semibold text-white text-center bg-purple-600 border hover:bg-opacity-70 hover:font-bold cursor-pointer transition-all ease-in-out"
                            onClick={handleButtonEnroll}
                          >
                            Enroll now
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        className=" w-full p-4 text-sm font-semibold text-white text-center bg-purple-600 border hover:bg-opacity-70 hover:font-bold cursor-pointer transition-all ease-in-out "
                        onClick={handleExist}
                      >
                        Go to Course
                      </div>
                    )}

                    <div className=" mt-4 flex flex-col gap-y-2 items-start">
                      <h2 className=" text-sm text-start font-semibold mb-1">
                        This course includes:
                      </h2>
                      <div className=" flex gap-x-2 justify-between items-center">
                        <MonitorPlay size={12} />
                        <span className=" text-[12px]">
                          1.5 hours on-demand video
                        </span>
                      </div>
                      <div className=" flex gap-x-2 justify-between items-center">
                        <MonitorSmartphone size={12} />
                        <span className=" text-[12px]">
                          Access on mobile and pc
                        </span>
                      </div>
                      <div className=" flex gap-x-2 justify-between items-center">
                        <Infinity size={12} />
                        <span className=" text-[12px]">Full time access</span>
                      </div>
                      <div className=" flex gap-x-2 justify-between items-center">
                        <Trophy size={12} />
                        <span className=" text-[12px]">
                          Certificate of completion
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CourseDetail;

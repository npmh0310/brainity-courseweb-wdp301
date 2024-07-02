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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { getCourseById } from "../fetchData/Course";
import GlobalLoading from "../components/common/GlobalLoading/GlobalLoading";
import { formatCurrencyVND } from "../function/function";
import { getRatingByCourseId, getAvgRating } from "../fetchData/Rating";
import { getProfile } from "../fetchData/User";
import { Modal, Button } from "@mui/material";
import { FaStar, FaRegStar } from "react-icons/fa"; import { addCourse, getCartLoading, getCoursesInCart } from '../redux/features/cartSlice'
import { getRatingCourse } from '../fetchData/RatingOfCourse'
import { Rating } from '@mui/material'
import { addCourseToCart } from '../fetchData/Cart'
import CircularProgress from '@mui/material/CircularProgress';
import { Spinner } from "flowbite-react";
function CourseDetail() {
  const [isScrolled, setIsScrolled] = useState(false)
  const divRefBanner = useRef(null);
  const divRefPage = useRef(null)
  const [heightOfBanner, setHeightOfBanner] = useState()
  const dispatch = useDispatch()
  const [course, setCourse] = useState()
  const [statusCousre, setStatusCourse] = useState(false);
  const cart = useSelector(getCoursesInCart)
  const [rating, setRating] = useState()
  const [ratingOfCourse, setRatingOfCourse] = useState()
  const loading = useSelector(getCartLoading)
  const navigate = useNavigate()
  const [ratingByStar, setRatingByStar] = useState([]);
  const [avgRating, setAvgRating] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedStar, setSelectedStar] = useState(null);
  const [filteredRatings, setFilteredRatings] = useState([]);
  useEffect(() => {
    if (rating) {
      const filtered = rating.filter((r) => r.comment);
      setFilteredRatings(filtered);
    }
  }, [rating]);

  // useEffect(() => {
  //     if (divRefBanner.current) {
  //         setHeightOfBanner(divRefBanner.current.clientHeight)
  //     }
  // }, [divRefBanner]);
  // useEffect(() => {
  //     const handleScroll = () => {
  //         if (window.scrollY > divRefBanner.current.clientHeight) {
  //             setIsScrolled(true)
  //         } else {
  //             setIsScrolled(false)
  //         }
  //     };
  //     window.addEventListener('scroll', handleScroll);
  //     return () => {
  //         window.removeEventListener('scroll', handleScroll)
  //     };
  // }, []);

  //Data
  const { id: courseId } = useParams();

  useEffect(() => {
    const fetchData = async (courseId) => {
      dispatch(setGlobalLoading(true));
      try {
        // Fetch course data
        const courseResponse = await getCourseById(courseId);
        if (courseResponse.data.success) {
          console.log("Course data:", courseResponse.data.data);
          setCourse(courseResponse.data.data);
        } else {
          console.log("Failed to fetch course data");
        }

        // Fetch rating data
        const ratingResponse = await getRatingByCourseId(courseId);
        if (ratingResponse.data) {
          console.log("Rating data fetched:", ratingResponse.data);
          setRating(ratingResponse.data);
        } else {
          console.log("Failed to fetch rating data");
        }

        const ratingByStarResponse = await getRatingByCourseId(courseId);
        if (ratingByStarResponse.data) {
          console.log("Rating in filter data fetched:", ratingByStarResponse.data);
          setRatingByStar(ratingByStarResponse.data);
        } else {
          console.log("Failed to fetch rating data");
        }

        const avgRatingResponse = await getAvgRating(courseId);
        if (avgRatingResponse.data) {
          console.log(
            "Average rating fetched:",
            avgRatingResponse.data.avgRating
          );
          setAvgRating(avgRatingResponse.data.avgRating);
        } else {
          console.log("Failed to fetch average rating data");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        dispatch(setGlobalLoading(false));
        console.log("Loading finished"); // Log để kiểm tra
      }
    };

    if (courseId) {
      console.log("Fetching data for courseId:", courseId);
      fetchData(courseId);
    } else {
      console.log("Invalid courseId");
    }
  }, [courseId, dispatch]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setRatingByStar(rating);
    setShowModal(false);
  }

  const handleFilterByStar = (rate) => {
    setSelectedStar(rate);
    const filtered = rating.filter((r) => r.rate === rate);
    setRatingByStar(filtered);
    console.log(filtered);
  };

  useEffect(() => {
    console.log(courseId)
    const course = cart.find(data => data.course._id === courseId)
    if (course != null) {
      setStatusCourse(true)
    }
  }, [cart, courseId])

  // rating
  const fetchRattingCourse = async (courseId) => {
    const response = await getRatingCourse(courseId)
    console.log(response.data)
    if (response != null) {
      setRatingOfCourse(response.data)
    }
  }
  useEffect(() => {
    fetchRattingCourse(courseId)
  }, [courseId])

  // add To cart
  const addToCart = async () => {
    dispatch(addCourse(courseId))
  }

  const handleButtonAdd = () => {
    if (!statusCousre) {
      addToCart()
    }
    else {
      navigate("/cart")
    }
  }

  return (
    <div className='relative courseDetail w-full '>
      <div className={` h-[300px] absolute bg-[#2d2f31]  z-0 w-full`}></div>
      <GlobalLoading />
      {course && <>
        <div ref={divRefPage} className=' max-w-[1280px] mx-auto w-full flex justify-start'>
          <div className=' w-full px-2 lg:w-8/12 z-10 '>
            <div ref={divRefBanner} className=' banner px-8 py-6 flex flex-col mb-4 '>
              <h1 className=' text-3xl text-white font-bold mb-4'>
                {course.courseName}
              </h1>
              <div className=' text-sm text-white mb-6'>
                {course.description}
              </div>
              <div className=' flex gap-2 text-white justify-start items-center mb-6'>
                {ratingOfCourse && ratingOfCourse.numOfRates > 2 &&
                  <div className='  p-1 bg-[#eceb98] text-sm text-center font-semibold text-black'>
                    Bestseller
                  </div>}
                {ratingOfCourse != null &&
                  <div className=' flex justify-center items-center gap-1 '>
                    <span className="text-sm">{ratingOfCourse.avgRating}</span>
                    <Rating
                      className="mb-[2px]"
                      name="half-rating-read"
                      value={ratingOfCourse.avgRating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </div>}
                <div className=' text-white text-sm'>
                  90,817 students
                </div>
              </div>
              <div className=' text-white text-sm tracking-wide'>
                Create by <a className=' text-purple-200 underline' href="#">{course.instructor.username}</a>
              </div>
            </div>
            <div className='px-2 flex flex-col gap-y-6 bg-white '>
              <div className=' py-6 pb-4 border '>
                <h2 className=' text-xl text-start font-semibold mx-6 mb-4'>
                  What you'll learn
                </h2>
                <div className=' flex justify-center items-center mx-6'>
                  <ul className='  grid grid-cols-2 gap-x-3'>
                    <li>
                      <div className=' py-1 flex justify-start items-start'>
                        <Check />
                        <span className=' text-sm text-black ml-2'>
                          Become an advanced, confident, and modern React developer from scratch
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className=' py-1 flex justify-start items-start'>
                        <Check />
                        <span className=' text-sm text-black ml-2'>
                          Become an advanced, confident, and modern React developer from scratch
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className=' py-1 flex justify-start items-start'>
                        <Check />
                        <span className=' text-sm text-black ml-2'>
                          Become an advanced, confident, and modern React developer from scratch
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className=' py-1 flex justify-start items-start'>
                        <Check />
                        <span className=' text-sm text-black ml-2'>
                          Become an advanced, confident, and modern React developer from scratch
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className=' py-1 flex justify-start items-start'>
                        <Check />
                        <span className=' text-sm text-black ml-2'>
                          Become an advanced, confident, and modern React developer from scratch
                        </span>
                      </div>
                    </li>


                  </ul>
                </div>
              </div>
              <div className=' pt-4 mb-4'>
                <h2 className=' text-xl text-start font-semibold mb-2'>
                  This course includes:
                </h2>
                <div className=' flex justify-start items-center'>
                  <ul className=' w-9/12 grid grid-cols-2 gap-x-4'>
                    <li>
                      <div className=' flex justify-start items-center py-1'>
                        <MonitorPlay size={14} />
                        <span className=' text-sm ml-2'>
                          84 hours on-demand video
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className=' flex justify-start items-center py-1'>
                        <MonitorPlay size={14} />
                        <span className=' text-sm ml-2'>
                          84 hours on-demand video
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className=' flex justify-start items-center py-1'>
                        <MonitorPlay size={14} />
                        <span className=' text-sm ml-2'>
                          84 hours on-demand video
                        </span>
                      </div>
                    </li>


                  </ul>
                </div>
              </div>
              <div className=' pt-4'>
                <h2 className=' text-xl text-start font-semibold mb-4'>
                  Course content
                </h2>
                <div className=' flex justify-between items-center'>
                  <div className=' flex items-center gap-x-1 my-2 text-sm '>
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
                    employment vacancies; scanning the job markets and trying
                    to figure out how to best “fit in", writing a resume,
                    searching employment ads, and replying and waiting for
                    responses.
                  </p>
                </div>
              </div>

              {/* Rating */}

              <div>
                <h1 className="text-xl font-bold flex">
                  <span className="flex justify-center items-center mr-1">
                    <FaStar className="w-4 h-4 text-yellow-300" />
                  </span>{" "}
                  {avgRating && avgRating} course rating on average - {rating && rating.length}{" "}
                  ratings
                </h1>
                <div className="grid grid-cols-2 gap-x-4 mt-4">
                  {filteredRatings.length > 0 ? (
                    filteredRatings.map((rating) => (
                      <article key={rating._id} className="p-4">
                        <div className="flex items-center mb-4">
                          <img
                            className="w-10 h-10 me-4 rounded-full"
                            src={rating.user.avatar}
                            alt=""
                          />
                          <div className="font-medium dark:text-white">
                            <p>{rating.user.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                          <span className="flex">
                            {[...Array(rating.rate)].map((_, index) => (
                              <FaStar
                                key={index}
                                className="w-4 h-4 text-yellow-300"
                              />
                            ))}
                            {[...Array(5 - rating.rate)].map((_, index) => (
                              <FaRegStar
                                key={index}
                                className="w-4 h-4 text-yellow-300"
                              />
                            ))}
                          </span>
                        </div>
                        <h3 className="text-md mt-2 mb-1 font-semibold text-gray-900">
                          {rating.comment}
                        </h3>
                        <footer className="mb-5 text-sm text-gray-500">
                          <p>
                            Reviewed on
                            <span>
                              {" "}
                              {new Date(rating.createdAt).toLocaleDateString(
                                "en-us",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </p>
                        </footer>
                        <p className="mb-2 text-gray-500">{rating.review}</p>
                      </article>
                    ))
                  ) : (
                    <p className="text-gray-500">No ratings found.</p>
                  )}
                </div>
                <button
                  onClick={handleOpenModal}
                  className="mt-4 mb-8 text-lg p-3 border-2 border-black hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Show all Ratings
                </button>
                <Modal
                  open={showModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                >
                  {/* <div>
                      <h2 className="text-xl font-bold text-primary mb-4">
                        {avgRating} course rating on average - {rating.length}{" "}
                        ratings
                      </h2>
                    </div> */}

                  <div className="flex bg-white p-4 rounded-lg shadow-lg max-w-3xl mx-auto mt-24">
                    {/* Filter Section */}
                    <div className="w-1/4 p-4">
                      <h2 className="text-xl font-bold text-center">
                        Filter by rating
                      </h2>
                      {[5, 4, 3, 2, 1].map((star) => (
                        <Button
                          key={star}
                          className="w-full mt-2 text-primary border flex justify-center items-center"
                          onClick={() => handleFilterByStar(star)}
                        >
                          {Array.from({ length: star }).map((_, index) => (
                            <FaStar
                              key={index}
                              className="w-4 h-4 text-yellow-300"
                            />
                          ))}
                          {Array.from({ length: 5 - star }).map(
                            (_, index) => (
                              <FaRegStar
                                key={index}
                                className="w-4 h-4 text-yellow-300"
                              />
                            )
                          )}
                        </Button>
                      ))}
                    </div>
                    {/* Content Section */}
                    <div className="w-2/3 pl-5 py-9 overflow-y-auto">
                      {ratingByStar.length > 0 ? (
                        ratingByStar.map((rating) => (
                          <div key={rating._id} className="border-b py-2">
                            <p className="font-medium text-gray-900">
                              {rating.user.username}
                              <span className="flex">
                                {[...Array(rating.rate)].map((_, index) => (
                                  <FaStar
                                    key={index}
                                    className="w-4 h-4 text-yellow-300"
                                  />
                                ))}
                                {[...Array(5 - rating.rate)].map(
                                  (_, index) => (
                                    <FaRegStar
                                      key={index}
                                      className="w-4 h-4 text-yellow-300"
                                    />
                                  )
                                )}
                              </span>
                            </p>
                            {rating.comment ? (
                              <p className="text-gray-500">
                                {rating.comment}
                              </p>
                            ) : (
                              <p className="text-gray-500 italic">
                                No comment
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          No ratings found for this filter.
                        </p>
                      )}
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>

          <div className=' relative w-0 lg:w-4/12'>
            <div className={`courseView  hidden lg:flex mt-6  ml-4 min-w-[320px] w-[320px] bg-white shadow-lg sticky top-0 `}>
              <div className=' w-full'>
                <div className=' h-40 flex justify-center items-center p-1 mb-2'>
                  {course.sections[0].lessons[0] && <video controls src={course.sections[0].lessons[0].videoUrl} className=' w-full h-full object-cover ' ></video>}
                </div>
                <div className=' p-6 w-full flex flex-col gap-y-2 items-start'>
                  <span className=' text-2xl text-black font-semibold'>
                    {formatCurrencyVND(course.price)}
                  </span>
                  <div className=' w-full flex justify-between items-center '>
                    <div className=' p-3 w-9/12 text-sm font-semibold text-white text-center bg-primary border hover:bg-opacity-70 hover:font-bold cursor-pointer transition-all ease-in-out ' onClick={handleButtonAdd}>
                      {/* {statusCousre ?  "Go to Cart" : "Add to Cart" } */}
                      {loading ? <CircularProgress color="inherit" /> : <>{statusCousre ? "Go to Cart" : "Add to Cart"}</>}

                    </div>
                    <div className=' p-3  flex items-center justify-center  w-2/12 border border-black '>
                      <Heart size={14} />
                    </div>
                  </div>
                  <div className=' p-3 w-full text-lg font-semibold text-black text-center bg-[#eceb98] border border-black '>
                    Buy now
                  </div>
                  <div className=' mt-4 flex flex-col gap-y-2 items-start'>
                    <h2 className=' text-sm text-start font-semibold mb-1'>
                      This course includes:
                    </h2>
                    <div className=' flex gap-x-2 justify-between items-center'>
                      <MonitorPlay size={12} />
                      <span className=' text-[12px]'>
                        1.5 hours on-demand video
                      </span>
                    </div>
                    <div className=' flex gap-x-2 justify-between items-center'>
                      <MonitorSmartphone size={12} />
                      <span className=' text-[12px]'>
                        Access on mobile and pc
                      </span>
                    </div>
                    <div className=' flex gap-x-2 justify-between items-center'>
                      <Infinity size={12} />
                      <span className=' text-[12px]'>
                        Full time access
                      </span>
                    </div>
                    <div className=' flex gap-x-2 justify-between items-center'>
                      <Trophy size={12} />
                      <span className=' text-[12px]'>
                        Certificate of completion
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </>}


      {/* <div style={{ height: `${heightOfBanner}px` }} className={`absolute bg-[#2d2f31]  z-0 w-full`}></div>
            <div ref={divRefPage} className=' max-w-[1280px] mx-auto w-full flex justify-start'>
                <div className=' w-full px-2 lg:w-8/12 z-10 '>
                    <div ref={divRefBanner} className=' banner px-8 py-6 flex flex-col mb-4 '>
                        <h1 className=' text-3xl text-white font-bold mb-4'>
                            { }
                        </h1>
                        <div className=' text-sm text-white mb-6'>
                            Master modern React from beginner to advanced! Next.js, Context API, React Query, Redux, Tailwind, advanced patterns
                        </div>
                        <div className=' flex gap-2 text-white justify-start items-center mb-6'>
                            <div className='  p-1 bg-[#eceb98] text-sm text-center font-semibold text-black'>
                                Bestseller
                            </div>
                            <div className=' flex justify-center items-center gap-1 '>
                                <span className=' text-sm'>
                                    4.9
                                </span>
                                <img className=' w-3 h-3 object-cover' src={Star} alt="" />
                                <img className=' w-3 h-3 object-cover' src={Star} alt="" />
                                <img className=' w-3 h-3 object-cover' src={Star} alt="" />
                                <img className=' w-3 h-3 object-cover' src={Star} alt="" />
                                <img className=' w-3 h-3 object-cover' src={Star} alt="" />
                            </div>

                            <span className=' text-purple-300 text-sm'>
                                12.999 rating
                            </span>
                            <div className=' text-white text-sm'>
                                90,817 students
                            </div>
                        </div>
                        <div className=' text-white text-sm tracking-wide'>
                            Create by <a className=' text-purple-200 underline' href="#">NgocTam</a>
                        </div>
                    </div>
                    <div className='px-2 flex flex-col gap-y-6 bg-white '>
                        <div className=' py-6 pb-4 border '>
                            <h2 className=' text-xl text-start font-semibold mx-6 mb-4'>
                                What you'll learn
                            </h2>
                            <div className=' flex justify-center items-center mx-6'>
                                <ul className='  grid grid-cols-2 gap-x-3'>
                                    <li>
                                        <div className=' py-1 flex justify-start items-start'>
                                            <Check />
                                            <span className=' text-sm text-black ml-2'>
                                                Become an advanced, confident, and modern React developer from scratch
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className=' py-1 flex justify-start items-start'>
                                            <Check />
                                            <span className=' text-sm text-black ml-2'>
                                                Become an advanced, confident, and modern React developer from scratch
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className=' py-1 flex justify-start items-start'>
                                            <Check />
                                            <span className=' text-sm text-black ml-2'>
                                                Become an advanced, confident, and modern React developer from scratch
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className=' py-1 flex justify-start items-start'>
                                            <Check />
                                            <span className=' text-sm text-black ml-2'>
                                                Become an advanced, confident, and modern React developer from scratch
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className=' py-1 flex justify-start items-start'>
                                            <Check />
                                            <span className=' text-sm text-black ml-2'>
                                                Become an advanced, confident, and modern React developer from scratch
                                            </span>
                                        </div>
                                    </li>


                                </ul>
                            </div>
                        </div>
                        <div className=' pt-4 mb-4'>
                            <h2 className=' text-xl text-start font-semibold mb-2'>
                                This course includes:
                            </h2>
                            <div className=' flex justify-start items-center'>
                                <ul className=' w-9/12 grid grid-cols-2 gap-x-4'>
                                    <li>
                                        <div className=' flex justify-start items-center py-1'>
                                            <MonitorPlay size={14} />
                                            <span className=' text-sm ml-2'>
                                                84 hours on-demand video
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className=' flex justify-start items-center py-1'>
                                            <MonitorPlay size={14} />
                                            <span className=' text-sm ml-2'>
                                                84 hours on-demand video
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className=' flex justify-start items-center py-1'>
                                            <MonitorPlay size={14} />
                                            <span className=' text-sm ml-2'>
                                                84 hours on-demand video
                                            </span>
                                        </div>
                                    </li>


                                </ul>
                            </div>
                        </div>
                        <div className=' pt-4'>
                            <h2 className=' text-xl text-start font-semibold mb-4'>
                                Course content
                            </h2>
                            <div className=' flex justify-between items-center'>
                                <div className=' flex items-center gap-x-1 my-2 text-sm '>
                                    <span>40 sections</span>
                                    <Dot size={12} />
                                    <span>505 lectures</span>
                                    <Dot size={12} />

                                    <span>83h 52m total length</span>
                                </div>
                                <span className=' text-sm font-semibold text-purple-400 hover:text-purple-900 transition-all ease-in-out cursor-pointer text-end'>
                                    Expand all section
                                </span>
                            </div>
                            <div className=' flex flex-col'>
                                <Section />
                                <Section />
                                <Section />
                                <Section />
                            </div>
                        </div>
                        <div className=' py-4'>
                            <h2 className=' text-xl text-start font-semibold mb-4'>
                                Description
                            </h2>
                            <div className=' w-full flex flex-col gap-y-2  text-sm text-start' >
                                <p >
                                    We all face times in our lives where we have to make challenging, sometimes life-altering decisions. We might be choosing or switching careers, or picking a college major. We might be going through a divorce or other moment of crisis. Sometimes it can simply be recognition of a lack of fulfillment and purpose in our personal and professional lives.
                                </p>
                                <strong>
                                    Self Inventory as a Path to Employment and Career Fulfillment
                                </strong>
                                <p>
                                    Too often, career search begins with looking for employment vacancies; scanning the job markets and trying to figure out how to best “fit in", writing a resume, searching employment ads, and replying and waiting for responses.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' relative w-0 lg:w-4/12'>

                    <div className={`courseView  hidden lg:flex mt-6  ml-4 min-w-[320px] w-[320px] bg-white shadow-lg ${isScrolled? ' sticky top-0  pt-[85px]' : ''}`}>

                        <div className=' w-full'>
                            <div className=' flex justify-center items-center mb-2'>
                                <iframe src="https://www.youtube.com/watch?v=SXmpbDBbJCw" frameborder="0"></iframe>
                            </div>
                            <div className=' p-6 w-full flex flex-col gap-y-2 items-start'>
                                <span className=' text-2xl text-black font-semibold'>
                                    đ360.000
                                </span>
                                <div className=' w-full flex justify-between items-center '>
                                    <div className=' p-3 w-9/12 text-sm font-semibold text-white text-center bg-primary border '>
                                        Go to cart
                                    </div>
                                    <div className=' p-3  flex items-center justify-center  w-2/12 border border-black '>
                                        <Heart size={14} />
                                    </div>
                                </div>
                                <div className=' p-3 w-full text-lg font-semibold text-black text-center bg-[#eceb98] border border-black '>
                                    Buy now
                                </div>
                                <div className=' mt-4 flex flex-col gap-y-2 items-start'>
                                    <h2 className=' text-sm text-start font-semibold mb-1'>
                                        This course includes:
                                    </h2>
                                    <div className=' flex gap-x-2 justify-between items-center'>
                                        <MonitorPlay size={12} />
                                        <span className=' text-[12px]'>
                                            1.5 hours on-demand video
                                        </span>
                                    </div>
                                    <div className=' flex gap-x-2 justify-between items-center'>
                                        <MonitorSmartphone size={12} />
                                        <span className=' text-[12px]'>
                                            Access on mobile and pc
                                        </span>
                                    </div>
                                    <div className=' flex gap-x-2 justify-between items-center'>
                                        <Infinity size={12} />
                                        <span className=' text-[12px]'>
                                            Full time access
                                        </span>
                                    </div>
                                    <div className=' flex gap-x-2 justify-between items-center'>
                                        <Trophy size={12} />
                                        <span className=' text-[12px]'>
                                            Certificate of completion
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  );
}

export default CourseDetail;

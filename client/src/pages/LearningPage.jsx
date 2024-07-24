import React, { useEffect, useState } from "react";
import { Logo } from "../components/common/Logo";
import {
  ChevronDown,
  ChevronLeft,
  Forward,
  Search,
  SettingsIcon,
  Sparkle,
  X,
} from "lucide-react";
import { Box, Popover } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";
import Section from "../components/User/LearningPage/Section/Section";
import Footer from "../components/common/Footer/Footer";
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getCourseById, getStudents } from "../fetchData/Course";
import { useDispatch, useSelector } from "react-redux";
import {
  getGlobalLoading,
  setGlobalLoading,
} from "../redux/features/globalLoadingSlice";
import GlobalLoading from "../components/common/GlobalLoading/GlobalLoading";
import CourseReviewDialog from "../components/User/LearningPage/SubmitReview/CourseReviewDialog";
import Toast from "../components/User/LearningPage/Toast/Toast";
import {
  completeCourse,
  getLessonProgressUser,
} from "../fetchData/UserChapterProgress";
import { insertLessonProgress } from "../redux/features/learningSlice";
import { calculateOverallCompletionPercent } from "../function/function";
import VideoChaper from "./../components/User/LearningPage/VideoChapter/VideoChaper";
import CourseContent from "./../components/User/LearningPage/CourseContent/CourseContent";
import OverView from "./../components/User/LearningPage/OverView/OverView";
import Exercise from "./../components/User/LearningPage/Exercise/Exercise";
import SearchContent from "./../components/User/LearningPage/Search/Search";
function LearningPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCourse, setShowCourse] = useState(true);
  const [innerWidth, setInnerWidth] = useState(true);
  const [course, setCourse] = useState({});
  const [link, setLink] = useState();
  const [showModal, setShowModal] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [courseProgress, setCourseProgress] = useState();

  const navigate = useNavigate();
  const [overralCompletionPercent, setOverralCompletionPercent] = useState(0);
  // const [sectionsWithProgress, setSectionsWithProgress] = useState()
  // const { lessonsProgress, setInitialLessonsProgress } = useLessonProgress()
  const lessonsProgress = useSelector(
    (state) => state.learningSlice.lessonProgress
  );
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight =
        document.querySelector(".headerLearning").offsetHeight;
      if (window.scrollY > headerHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setShowCourse(false);
        setInnerWidth(false);
      } else {
        setShowCourse(true);
        setInnerWidth(true);
        // navigate("#overview");
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Check initial window size
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Data
  const { id: courseId } = useParams();
  const fetchCourse = async (courseId) => {
    dispatch(setGlobalLoading(true));
    try {
      const response_Course = await getCourseById(courseId);
      const response_LessonProgress = await getLessonProgressUser(courseId);

      if (
        response_Course.data.success &&
        response_LessonProgress.data.success
      ) {
        const sectionsWithProgress = response_Course.data.data.sections.map(
          (section) => ({
            ...section,
            lessons: section.lessons.map((lesson) => ({
              ...lesson,
              isCompleted:
                response_LessonProgress.data.data.lessonsProgress.find(
                  (p) => p.lesson === lesson._id
                )?.isCompleted || false,
            })),
          })
        );

        setCourse(response_Course.data.data);
        setCourseProgress(response_LessonProgress.data.data);
        dispatch(insertLessonProgress(sectionsWithProgress));
        // setInitialLessonsProgress(sectionsWithProgress);
        // setSectionsWithProgress(sectionsWithProgress)
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCourse(courseId);
  }, []);

  useEffect(() => {
    if (courseProgress && !courseProgress.isCompleted) {
      const overralCompletionPercent =
        calculateOverallCompletionPercent(lessonsProgress);
      setOverralCompletionPercent(overralCompletionPercent);
      if (overralCompletionPercent.overal == 100.0) {
        const res = completeCourse(courseId);
        openModal();
      }
    }
  }, [lessonsProgress, courseId]);

  // hash section
  const [section, setSection] = useState("overview");
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Bỏ dấu #
      setSection(hash || section);
    };

    // Lắng nghe sự thay đổi của hash
    window.addEventListener("hashchange", handleHashChange);

    // Cập nhật lần đầu tiên khi component được mount
    handleHashChange();

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  });

  return (
    <div className="bg-white">
      <GlobalLoading />
      {course && (
        <>
          <div className="headerLearning p-4 bg-white flex justify-between items-center gap-x-4">
            <a className="-translate-x-4" href="/">
              <Logo />
            </a>
            <div className="ml-4 flex justify-start items-center w-8/12 uppercase ">
              <Link to={`/course/${courseId}`}> {course.courseName} </Link>
            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {courseProgress &&
              overralCompletionPercent.overal != 100.0 &&
              !courseProgress.isCompleted ? (
                <div className="p-4 flex flex-col gap-y-2 justify-center items-start text-sm">
                  <span className="font-bold">
                    {overralCompletionPercent.completedLessons} of{" "}
                    {overralCompletionPercent.totallesson} complete
                  </span>
                  <span>Finish course to get your certificate</span>
                </div>
              ) : (
                <div className="p-4 flex flex-col gap-y-2 justify-center items-start text-sm">
                  <span className="font-bold">
                    You have completed the course
                  </span>
                </div>
              )}
            </Popover>
            <div
              aria-describedby={id}
              className="flex justify-center items-center text-sm group cursor-pointer"
              onClick={handleClick}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginRight: 1,
                }}
              >
                <CircularProgress
                  size="md"
                  determinate
                  value={
                    courseProgress && !courseProgress.isCompleted
                      ? overralCompletionPercent.overal
                      : 100
                  }
                  color={
                    courseProgress &&
                    !courseProgress.isCompleted &&
                    overralCompletionPercent.overal != 100.0
                      ? "danger"
                      : "success"
                  }
                >
                  <Sparkle />
                </CircularProgress>
              </Box>
              <span className="group-hover:text-slate-300 transition-all ease-in-out">
                Your Progress
              </span>
              <ChevronDown className="group-hover:text-gray-800 transition-all ease-in-out" />
            </div>
            {/* <div className='hidden text-sm sm:flex justify-center items-center gap-2'>
                            <div className='p-2 border border-black flex justify-center items-center gap-2 cursor-pointer'>
                                Share
                                <Forward className='text-slate-400 -translate-y-1' />
                            </div>
                            <div className='p-2 border border-black text-center cursor-pointer'>
                                <SettingsIcon />
                            </div>
                        </div> */}
          </div>
          <div className="relative w-full flex">
            <div
              className={`${showCourse ? "w-9/12" : "w-full"}  flex flex-col`}
            >
              <div className=" relative bg-black video w-full h-[600px]">
                <Routes>
                  {/* {course.sections &&
                    course.sections.length > 0 &&
                    course.sections.map(
                      (section, sectionIndex) =>
                        section.lessons &&
                        section.lessons.length > 0 &&
                        section.lessons.map((lesson, lessonIndex) => (
                          <Route
                            key={`${sectionIndex}-${lessonIndex}`}
                            path={`lesson/${lesson._id}`}
                            element={
                              <VideoChaper
                                courseProgress={courseProgress}
                                courseId={courseId}
                                lesson={lesson}
                              />
                            }
                          />
                        ))
                    )} */}
                  <Route
                    path="lesson/:lessonId"
                    element={
                      <VideoChaper
                        courseProgress={courseProgress}
                        courseId={courseId}
                      />
                    }
                  />
                </Routes>
                {!showCourse && innerWidth && (
                  <Link
                    to={`#overview`}
                    className=" absolute top-[10%] right-0 px-4 py-2 border-white bg-black hover:bg-slate-800 cursor-pointer"
                    onClick={() => setShowCourse(!showCourse)}
                  >
                    <ChevronLeft size={14} color="white" />
                  </Link>
                )}
              </div>

              <div
                className={`${
                  !showCourse ? "lg:w-9/12" : "sm:w-full"
                } px-4 mx-auto mb-6  flex flex-col`}
              >
                <div className=" px-4 min-w-[880px]  flex border-b  justify-start items-center gap-4 ">
                  <NavLink
                    to={`#search`}
                    className={
                      section === "search"
                        ? "py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer"
                        : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"
                    }
                  >
                    <Search size={16} />
                  </NavLink>
                  {!showCourse && (
                    <NavLink
                      to={`#courseContent`}
                      className={
                        section === "courseContent"
                          ? "py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer"
                          : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"
                      }
                    >
                      Course Content
                    </NavLink>
                  )}
                  <NavLink
                    to={`#overview`}
                    className={
                      section === "overview"
                        ? "py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer"
                        : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"
                    }
                  >
                    Overview
                  </NavLink>
                  {/* <NavLink
                    to={`#exercise`}
                    className={
                      section === "exercise"
                        ? "py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer"
                        : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"
                    }
                  >
                    Exercise
                  </NavLink> */}
                  {/* <NavLink to='learning tool' className={section === 'search' ? 'py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer' : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"}>Learning tool</NavLink> */}
                  {/* <NavLink
                    to={`#notes`}
                    className={
                      section === "notes"
                        ? "py-4 px-1 text-center font-semibold text-lg border-b-2 border-black cursor-pointer"
                        : "py-4 px-1 text-center font-semibold text-lg cursor-pointer"
                    }
                  >
                    Notes
                  </NavLink> */}
                </div>
                <div className=" mt-4">
                  {section === "courseContent" && (
                    <CourseContent course={course} />
                  )}
                  {section === "search" && <SearchContent course={course} />}
                  {section === "overview" && <OverView course={course} />}
                  {/* {section === "exercise" && <Exercise course={course} />} */}
                </div>
              </div>
              <Footer />
            </div>
            {showCourse && (
              <div
                className={`px-2 flex  flex-col overflow-y-auto fixed right-0 ${
                  isScrolled ? "top-0" : ""
                } h-screen w-3/12 z-10 bg-white border-x animate-transCourse `}
              >
                <div className="flex justify-between items-center sticky top-0 bg-white z-10">
                  <h2 className="p-2 text-lg font-semibold text-start">
                    Course Content
                  </h2>
                  <X
                    size={18}
                    className=" mr-2 cursor-pointer"
                    onClick={() => setShowCourse(!showCourse)}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  {lessonsProgress &&
                    lessonsProgress.map((section, index) => (
                      <Section
                        courseId={course._id}
                        section={section}
                        key={index}
                      />
                    ))}
                </div>
                <div className="flex justify-center">
                  {(overralCompletionPercent.overal == 100.0 ||
                    courseProgress?.isCompleted) && (
                    <button
                      onClick={openModal}
                      className="mt-6 bg-blue-500 rounded-2xl hover:bg-blue-700 text-white font-semibold py-2 px-10  focus:outline-none focus:shadow-outline"
                    >
                      Rewrite comment
                    </button>
                  )}

                  {showModal && (
                    <CourseReviewDialog
                      course={course}
                      courseId={course._id}
                      onSubmit={(data) => {
                        closeModal(); // Close modal after successful submit
                      }}
                      onClose={closeModal}
                      setToastMessage={setToastMessage}
                      setToastSeverity={setToastSeverity}
                      setToastOpen={setToastOpen}
                    />
                  )}
                  <Toast
                    open={toastOpen}
                    handleClose={handleToastClose}
                    message={toastMessage}
                    severity={toastSeverity}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default LearningPage;

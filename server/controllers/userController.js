const User = require("../models/user");
const Course = require("../models/course");
const UserChapterProgress = require("../models/UserChapterProgress");
const { getAvgRatingByCourseId } = require("./ratingController");
const { getProgress } = require("./userChapterProgressController");
const { createNotification } = require("./notificationController");

const enrollCourse = async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.id;
  const rooms = [`room_profile_${req.user.id}`];
  const notification = {
    title: "system",
    sender: userId,
    name: " a new course",
    message: "You enrolled in ",
    type: "course",
    link: "/mylearningcourse",
    image: "https://img.upanh.tv/2024/07/21/logo11.jpg",
  };
  createNotification(req.user.id, res.io, notification, rooms);
  try {
    const user = await User.findById(userId);

    if (user.coursesEnrolled.includes(courseId)) {
      return res.status(200).json({
        message: "Previously registered course",
      });
    } else {
      const course = await Course.findById(courseId).populate({
        path: "sections",
        populate: {
          path: "lessons",
          model: "Lesson",
        },
      });
      user.coursesEnrolled.push(course);

      let overallIndex = 0;
      const progress = new UserChapterProgress({
        user: userId,
        course: course._id,
        lessonsProgress: [],
        completed: false,
        progressPercentage: 0,
      });

      for (const section of course.sections) {
        const lessonIds = section.lessons.map((lesson) => lesson._id);
        progress.lessonsProgress.push(
          ...lessonIds.map((lessonId) => ({
            index: overallIndex++,
            lesson: lessonId,
            completed: false,
          }))
        );
      }

      await user.save();
      await progress.save();
      return res.status(200).json({
        message: "Course enrolled successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCourseEnrolled = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .select("coursesEnrolled")
      .populate("coursesEnrolled");

    const coursesEnrolled = user.coursesEnrolled;

    const coursesWithRatingInfo = await Promise.all(
      coursesEnrolled.map(async (course) => {
        const ratingInfo = await getAvgRatingByCourseId(course._id);
        const progress = await getProgress(course._id, userId);
        console.log("Progress: " + progress);
        return { ...course.toObject(), ratingInfo, progress };
      })
    );

    return res.status(200).json({
      ...user.toObject(),
      coursesEnrolled: coursesWithRatingInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  enrollCourse,
  getAllCourseEnrolled,
};

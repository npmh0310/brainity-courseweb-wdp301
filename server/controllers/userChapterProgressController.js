const UserChapterProgress = require("../models/UserChapterProgress");
const Course = require("../models/course");

const addProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.params.id);
    const course = await Course.findById(req.params.id).populate({
      path: "sections",
      populate: {
        path: "lessons",
        model: "Lesson", // Tên của mô hình Lesson
      },
    });
    console.log(course);
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

      // Create a new progress document for the section's lessons

      progress.lessonsProgress.push(
        ...lessonIds.map((lessonId) => ({
          index: overallIndex++,
          lesson: lessonId,
          completed: false,
        }))
      );
    }
    await progress.save();
    res.status(200).json({
      message: "Add Progress successfull",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const submitLesson = async (req, res) => {
  try {
    const { userId, courseId, lessonId } = req.body;

    if (!userId || !courseId || !lessonId) {
      return res
        .status(400)
        .json({ message: "User ID, Course ID, and Lesson ID are required" });
    }

    const progress = await UserChapterProgress.findOne({
      user: userId,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({
        message: "Progress not found",
      });
    }

    const lessonProgress = progress.lessonsProgress.find(
      (lessonProgress) => lessonProgress.lesson.toString() === lessonId
    );

    if (!lessonProgress) {
      return res.status(404).json({
        message: "Lesson progress not found",
      });
    }

    lessonProgress.isCompleted = true;

    const allLessonsCompleted = progress.lessonsProgress.every(
      (lesson) => lesson.completed
    );
    progress.completed = allLessonsCompleted;

    await progress.save();

    res.status(200).json({
      message: "Lesson completed status updated successfully",
    });
  } catch (error) {
    console.error("Error updating lesson completed status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLessonsProgressUser = async (req, res) => {
  const userId = req.user.id;
  const course_id = req.params.id;

  try {
    const lessonsProgressUser = await UserChapterProgress.findOne({
      user: userId,
      course: course_id,
    });

    res.status(200).json({
      success: true,
      message: "Successfully get lessons progress user",
      data: lessonsProgressUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to get Course. Try again",
    });
  }
};

const completeLesson = async (req, res) => {
  const userId = req.user.id;
  const { courseId, lessonId, isCompleted } = req.body;

  try {
    const userCourse = await UserChapterProgress.findOne({
      user: userId,
      course: courseId,
    });
    if (!userCourse.isCompleted) {
      const updateLesson = await UserChapterProgress.findOneAndUpdate(
        { user: userId, course: courseId, "lessonsProgress.lesson": lessonId },
        {
          $set: { "lessonsProgress.$.isCompleted": isCompleted },
        }
      );
      res.status(200).send("complete successfull");
    }
  } catch (error) {
    res.status(500).send("complete faild");
  }
};

const completeCourse = async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.body;

  try {
    const updateLesson = await UserChapterProgress.findOneAndUpdate(
      { user: userId, course: courseId },
      { $set: { isCompleted: true } },
      { new: true } // Option new: true để trả về bản ghi đã được cập nhật
    );

    if (updateLesson) {
      res.status(200).send("Completed successfully");
    } else {
      res.status(404).send("Course progress not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Completion failed");
  }
};

const getProgress = async (courseId, userId) => {
  const progress = await UserChapterProgress.findOne({
    user: userId,
    course: courseId,
  });

  if (!progress || !progress.lessonsProgress.length) {
    return 0;
  }

  if (progress.isCompleted) {
    return 100;
  }

  const completedLessons = progress.lessonsProgress.filter(
    (lesson) => lesson.isCompleted
  ).length;

  const progressPercentage = (
    (completedLessons / progress.lessonsProgress.length) *
    100
  ).toFixed(2);

  return progressPercentage;
};

module.exports = {
  submitLesson,
  addProgress,
  getLessonsProgressUser,
  completeLesson,
  completeCourse,
  getProgress,
};

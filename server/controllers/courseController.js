var Course = require("../models/course");
const UserChapterProgress = require("../models/UserChapterProgress");
const User = require("../models/user");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { getAvgRatingByCourseId } = require("./ratingController");
const { getProgress } = require("./userChapterProgressController");
const { createNotification } = require("./notificationController");

/// teacher CRUD
const createCourse = async (req, res) => {
  const userId = req.user.id;
  const newCourse = new Course(req.body);
  newCourse.instructor = userId;

  try {
    const savedCourse = await newCourse.save();
    console.log(savedCourse);
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again" + err,
    });
  }
};

const getCourseByName = async (req, res) => {
  const name = req.body;
  // console.log(name)

  try {
    const getAllCourse = await Course.find({});
    // .populate({
    //     path: 'section',
    //     populate: {
    //         path: 'sections',
    //         model: 'Section' // Tên của mô hình Lesson
    //     }
    // })
    const savedCourse = await Course.findOne({ courseName: name.courseName })
      .populate({
        path: "sections",
        populate: {
          path: "lessons",
          model: "Lesson", // Tên của mô hình Lesson
        },
      })
      .populate("categories");

    res.status(200).json({
      success: true,
      message: "Successfully get",
      data: savedCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get. Try again",
    });
  }
};

const getCourseOfTeacher = async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 0;
  const pageSize = 8;

  try {
    const totalCourses = await Course.countDocuments({ instructor: userId });
    const totalPages = Math.ceil(totalCourses / pageSize);
    const getAllCourseOfTeacher = await Course.find({ instructor: userId })
      .skip(page * pageSize)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      count: getAllCourseOfTeacher.length,
      message: "Successfully get all of Teacher",
      data: getAllCourseOfTeacher,
      totalPages: totalPages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get all course of teacher. Try again",
    });
  }
};

const updateCourse = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const updateCourse = await Course.findOneAndUpdate(
      {
        _id: id,
        instructor: userId,
      },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
    });
  }
};

const deleteCourseById = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteCourseById = await Course.findOneAndDelete({
      _id: id,
    });

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: deleteCourseById,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Try again",
    });
  }
};

/// end teacher course CRUD

const getCourseInHomePage = async (req, res) => {
  try {
    const courses = await Course.find({
      isConfirm: true,
      isRejected: false,
      isPublic: true,
    })
      .limit(9)
      .populate("instructor", "username");

    const promises = courses.map(async (course) => {
      const numOfEnrolledUsers = await getCourseNumOfEnrolled(course._id);
      const ratingInfo = await getAvgRatingByCourseId(course._id);
      return { ...course.toObject(), numOfEnrolledUsers, ratingInfo };
    });

    const coursesWithEnrolledNumbers = await Promise.all(promises);

    // Send response
    res.status(200).json({
      success: true,
      count: coursesWithEnrolledNumbers.length,
      message: "Successfully get all",
      data: coursesWithEnrolledNumbers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get all. Try again. Details: " + err.message,
    });
  }
};

const getAllCourse = async (req, res) => {
  const page = parseInt(req.query.page) || 0;

  try {
    //  limiting to 9 courses per page
    const courses = await Course.find({})
      .skip(page * 9)
      .limit(9);
    const promises = courses.map(async (course) => {
      const numOfEnrolledUsers = await getCourseNumOfEnrolled(course._id);
      const ratingInfo = await getAvgRatingByCourseId(course._id);
      return { ...course.toObject(), numOfEnrolledUsers, ratingInfo };
    });
    const coursesWithEnrolledNumbers = await Promise.all(promises);

    res.status(200).json({
      success: true,
      count: coursesWithEnrolledNumbers.length,
      message: "Successfully get all",
      data: coursesWithEnrolledNumbers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get all. Try again. Details: " + err.message,
    });
  }
};

const getCourseById = async (req, res) => {
  const id = req.params.id;
  // console.log(id)

  try {
    const getCourseById = await Course.findById(id)
      .populate({
        path: "sections",
        populate: {
          path: "lessons",
          model: "Lesson", // Tên của mô hình Lesson
        },
      })
      .populate("categories")
      .populate("instructor");

    res.status(200).json({
      success: true,
      message: "Successfully get Course",
      data: getCourseById,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to get Course. Try again",
    });
  }
};

const getFeaturedCourse = async (req, res) => {
  try {
    const getFtCourse = await Course.find({ featured: true })
      .populate("categories")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successfully",
      data: getFtCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed. Try again",
    });
  }
};

const getFreeCourse = async (req, res) => {
  try {
    const getFreeCourse = await Course.find({ isFree: true })
      .populate("categories")
      .limit(6);

    res.status(200).json({
      success: true,
      message: "Successfully",
      data: getFreeCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed. Try again",
    });
  }
};

const getProCourse = async (req, res) => {
  try {
    const getProCourse = await Course.find({ isFree: false })
      .populate("categories")
      .limit(6);

    res.status(200).json({
      success: true,
      message: "Successfully",
      data: getProCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed. Try again",
    });
  }
};

const getCourseBySearch = async (req, res) => {
  const search = new RegExp(req.query.courseName, "i");

  try {
    const getCourses = await Course.find({ courseName: search, isConfirm: true, isRejected: false, isPublic : true })
      .populate("categories")
      .populate("instructor");

    res.status(200).json({
      success: true,
      message: "Successfully fetched courses",
      count: getCourses.length,
      data: getCourses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed, Try again",
    });
  }
};

const getCourseCount = async (req, res) => {
  try {
    const CourseCount = await Course.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: CourseCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch. Try again",
    });
  }
};

const getCourseNumOfEnrolled = async (courseId) => {
  const course = new mongoose.Types.ObjectId(courseId);

  const result = await User.aggregate([
    {
      $match: { coursesEnrolled: { $in: [course] } },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]).exec();
  return result[0] ? result[0].count : 0;
};

const enrollCourse = async (req, res) => {
  const userId = req.user.id;
  const courseId = req.body.courseId;

  try {
    const user = await User.findById(userId);

    // Check if the course is already enrolled
    if (user.coursesEnrolled.includes(courseId)) {
      return res.status(400).json({ message: "Course already enrolled" });
    }

    user.coursesEnrolled.push(courseId);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Enrolled in the course successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEnrolledCourses = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  try {
    const user = await User.findById(userId);

    // .populate({
    //   path: "coursesEnrolled",
    //   populate: {
    //     path: "Section",
    //     populate: {
    //       path: "Lesson",
    //       model: "Lesson", // Tên của mô hình Lesson
    //     },
    //   },
    // });
    // .populate("categories");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully retrieved enrolled courses",
      data: user.coursesEnrolled,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve enrolled courses. Try again",
    });
  }
};

const checkCourseStatus = async (req, res) => {
  // get course enrolled number
};

const getStudents = async (req, res) => {
  const id = req.params.id;

  try {
    // Use countDocuments to count the number of documents that match the query
    const total = await UserChapterProgress.countDocuments({ course: id });

    return res.status(200).json({ total });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Các hàm để admin confirm hay reject
const getAllCourseForConfirm = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("instructor")
      .populate("categories")
      .populate({
        path: "sections",
        populate: {
          path: "lessons",
        },
      })
      .sort({ createdAt: -1 }); //Sort theo createdAt
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses: " + error.message,
    });
  }
};

// Xác nhận khóa học
const confirmCourse = async (req, res) => {
  const { courseId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid courseId" });
  }

  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        isConfirm: true,
        isRejected: false,
      },
      { new: true }
    );

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error confirming course: " + error.message,
    });
  }
};

// Từ chối khóa học
const rejectCourse = async (req, res) => {
  const { courseId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid courseId" });
  }

  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        isConfirm: false,
        isRejected: true,
      },
      { new: true }
    );

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error rejecting course: " + error.message,
    });
  }
};
const getCourseByPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const pageSize = 9;

  try {
    const totalCourses = await Course.find({
      isConfirm: true,
      isRejected: false,
    }).countDocuments();
    const totalPages = Math.ceil(totalCourses / pageSize);
    const getAllCourseOfPagination = await Course.find({
      isConfirm: true,
      isRejected: false,
    })
      .skip(page * pageSize)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      count: getAllCourseOfPagination.length,
      message: "Successfully get all of page",
      data: getAllCourseOfPagination,
      totalPages: totalPages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get all course of page. Try again",
    });
  }
};
const getAllCourseNoLimit = async (req, res) => {
  try {
    const courses = await Course.find({ isConfirm: true, isRejected: false, isPublic : true });
    const promises = courses.map(async (course) => {
      const numOfEnrolledUsers = await getCourseNumOfEnrolled(course._id);
      const ratingInfo = await getAvgRatingByCourseId(course._id);
      return { ...course.toObject(), numOfEnrolledUsers, ratingInfo };
    });
    const coursesWithEnrolledNumbers = await Promise.all(promises);

    res.status(200).json({
      success: true,
      count: coursesWithEnrolledNumbers.length,
      message: "Successfully get all",
      data: coursesWithEnrolledNumbers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get all. Try again. Details: " + err.message,
    });
  }
};

// const getAllCourseEnrolled = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId)
//       .select("coursesEnrolled")
//       .populate("coursesEnrolled");

//     const coursesEnrolled = user.coursesEnrolled;

//     const coursesWithRatingInfo = await Promise.all(
//       coursesEnrolled.map(async (course) => {
//         const ratingInfo = await getAvgRatingByCourseId(course._id);
//         const progress = await getProgress(course._id, userId);
//         console.log(progress);
//         return { ...course.toObject(), ratingInfo };
//       })
//     );

//     return res.status(200).json({
//       ...user.toObject(),
//       coursesEnrolled: coursesWithRatingInfo,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

module.exports = {
  createCourse,
  deleteCourseById,
  getCourseInHomePage,
  getAllCourse,
  getCourseById,
  updateCourse,
  getFeaturedCourse,
  getCourseBySearch,
  getCourseCount,
  getFreeCourse,
  getProCourse,
  enrollCourse,
  getCourseNumOfEnrolled,
  getCourseOfTeacher,
  getCourseByName,
  getEnrolledCourses,
  getStudents,
  getAllCourseForConfirm,
  confirmCourse,
  rejectCourse,
  getCourseByPagination,
  getAllCourseNoLimit,
};

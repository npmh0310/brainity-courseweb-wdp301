const Rating = require("../models/rating");
const User = require("../models/user");
const Course = require("../models/course");
// const UserChapterProgress = require('../models/UserChapterProgress');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating: newRatingValue, comment } = req.body;

    const existCourse = await Course.findOne({ _id: courseId });

    if (!existCourse) {
      return res.status(400).json({ error: "Course does not exist" });
    }

    // Check if the user is enrolled in the course
    // const isEnrolled = await User.findOne({
    //   _id: userId,
    //   coursesEnrolled: { $in: courseId },
    // });

    // if (!isEnrolled) {
    //   return res
    //     .status(400)
    //     .json({ error: "User is not enrolled in the course" });
    // }

    // Check if the user has completed at least 90% of the course
    // const userProgress = await UserChapterProgress.findOne({ user: userId, course: courseId });

    // if (!userProgress || userProgress.progressPercentage < 90) {
    //     return res.status(400).json({ error: 'User has not completed at least 90% of the course' });
    // }

    // Check if a rating already exists for the user and course
    const existingRating = await Rating.findOne({
      user: userId,
      course: courseId,
    });

    if (existingRating) {
      // Update the existing rating
      existingRating.rate = newRatingValue;
      if (comment) {
        existingRating.comment = comment;
      }
      await existingRating.save();
      return res
        .status(200)
        .json({ message: "Rating updated successfully", data: existingRating });
    } else {
      // Create a new rating instance
      const newRating = new Rating({
        user: userId,
        course: courseId,
        rate: newRatingValue,
        comment,
      });

      // Save the new rating to the database
      await newRating.save();

      // Send the response with correct structure
      return res
        .status(201)
        .json({ message: "Rating created successfully", data: newRating });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAvgRatingByCourseId = async (courseId) => {
  try {
    // Find all ratings for the specified course
    const ratings = await Rating.find({ course: courseId });

    if (ratings.length === 0)
      return {
        avgRating: 0,
        numOfRates: ratings.length,
      };

    const totalRating = ratings.reduce((acc, curr) => acc + curr.rate, 0);

    // Calculate the average rating
    const avgRating = totalRating / ratings.length;
    console.log(avgRating, ratings.length);
    return {
      avgRating,
      numOfRates: ratings.length,
    };
  } catch (error) {
    return -1; // Return -1 if an error occurs
  }
};

const getAverageRatingByCourseId = async (reqOrCourseId, res = null) => {
  try {
    // Xác định xem chúng ta đang xử lý đối tượng request hay trực tiếp courseId
    const courseId =
      typeof reqOrCourseId === "object" && reqOrCourseId.params
        ? reqOrCourseId.params.courseId
        : reqOrCourseId;

    if (!courseId) {
      throw new Error("Course ID is required");
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      const error = new Error("Course not found");
      if (res) {
        return res.status(404).json({ message: error.message });
      } else {
        throw error;
      }
    }

    // Find ratings for the specified course ID
    const ratings = await Rating.find({ course: courseId });

    // Calculate the average rating
    const numOfRates = ratings.length;
    const totalRating = ratings.reduce((acc, curr) => acc + curr.rate, 0);
    const avgRating = numOfRates ? (totalRating / numOfRates).toFixed(2) : 0;

    const result = { avgRating, numOfRates };

    if (res) {
      return res.status(200).json(result);
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error calculating average rating:", error);
    if (res) {
      return res.status(500).json({ message: "Server error" });
    } else {
      throw error;
    }
  }
};
const getRatingByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const latestRatings = await Rating.find({ course: courseId })
      .sort({ updatedAt: -1 })
      .limit(4)
      .populate("user");

    // Fetch total number of ratings for the course
    const totalRatingsCount = await Rating.countDocuments({ course: courseId });

    // Adjust the fields to populate as needed

    res.status(200).json({ ratings: latestRatings, totalRatingsCount });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getRatingByCourseIdSortStar = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find ratings for the specified course ID and populate user details
    const ratings = await Rating.find({ course: courseId })
      .populate("user")
      .sort({ rate: -1 });
    const ratingsCount = calculateRatingsCount(ratings);

    res.status(200).json({ ratingsCount, ratings });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getRatingCourse = async (req, res) => {

  const courseId = req.params.id;

  try {
    // Find all ratings for the specified course
    const ratings = await Rating.find({ course: courseId });

    if (ratings.length === 0) {
      return res.status(200).json({
        avgRating: 0,
        numOfRates: ratings.length,
      });
    }

    const totalRating = ratings.reduce((acc, curr) => acc + curr.rate, 0);

    // Calculate the average rating
    const avgRating = (totalRating / ratings.length).toFixed(2);

    return res.status(200).json({
      avgRating,
      numOfRates: ratings.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/// đếm số người rating từng mốc sao
const calculateRatingsCount = (ratings) => {
  const ratingsCount = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  ratings.forEach((rating) => {
    const rate = rating.rate;
    if (ratingsCount[rate] !== undefined) {
      ratingsCount[rate]++;
    }
  });

  return ratingsCount;
};


module.exports = {
  createRating,
  getAvgRatingByCourseId,
  getAverageRatingByCourseId,
  getRatingByCourseId,
  getRatingCourse,
  getRatingByCourseIdSortStar,
};

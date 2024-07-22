var Section = require("../models/section");
const Course = require("../models/course");
const sectionSchema = require("../models/section");
const Lesson = require("../models/lesson");

// teacher
const createChapterInCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const newChapters = req.body;
  //   console.log(newChapters);

  try {
    const savedChapters = await Section.insertMany(newChapters);

    const sectionIds = savedChapters.map((chapter) => chapter._id);

    await Course.findByIdAndUpdate(courseId, {
      $push: { sections: { $each: sectionIds } },
    });

    res.status(200).json({
      success: true,
      message: "Successfully Section submitted",
      data: savedChapters,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to submit. Try again",
    });
  }
};

const createChapter = async (req, res) => {
  const newChapter = new Section(req.body);

  try {
    const savedChapter = await newChapter.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedChapter,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

const getAllChapter = async (req, res) => {
  try {
    const getAllChapter = await Section.find({}).populate("lessons");

    res.status(200).json({
      success: true,
      count: getAllChapter.length,
      message: "Successfully get all",
      data: getAllChapter,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get all. Try again",
    });
  }
};

const getChapterById = async (req, res) => {
  const id = req.params.id;

  try {
    const getChapterById = await Section.findById(id).populate("lessons");

    res.status(200).json({
      success: true,
      message: "Successfully get Section",
      data: getChapterById,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get Section. Try again",
    });
  }
};

const updateChapter = async (req, res) => {
  const id = req.params.id;

  try {
    const updateChapter = await Section.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateChapter,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
    });
  }
};

const deleteChapterById = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteChapterById = await Section.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: deleteChapterById,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Try again",
    });
  }
};

const getChapterCount = async (req, res) => {
  try {
    const ChapterCount = await Section.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: ChapterCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch. Try again",
    });
  }
};

module.exports = {
  createChapter,
  deleteChapterById,
  getAllChapter,
  updateChapter,
  getChapterCount,
  createChapterInCourse,
  getChapterById,
};

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },
    courseName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true
    },
    imageUrl: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    price: {

      type: Number,
      min: 0,
      required: true
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    isDelete: {
      type: Boolean,
      default: false,
    },
    isConfirm: {
      type: Boolean,
      default: false,
    },
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    isFree: {
      type: Boolean,
      default: true,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

courseSchema.pre("remove", async function (next) {
  try {
    await Section.deleteMany({ _id: { $in: this.section } });
    next();
  } catch (error) {
    next(error);
  }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

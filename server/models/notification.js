const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    system: {
      type: Boolean,
      default: false,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    read:{
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["interact", "comment", "blog", "course", "profile", "system"],
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

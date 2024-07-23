const multer = require("multer");
const path = require("path");
const express = require("express");
const fs = require("fs");
const { createTeacherRequest } = require("../../controllers/teacherRequestController");
const { verifyUser } = require("../../utils/verifyToken");

const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const multerRoute = express.Router();

multerRoute.post("/upload", verifyUser, upload.single("file"), async (req, res) => {
  const userId = req.user.id;
  const fileUrl = req.file.filename;
  const filePath = path.join(dir, fileUrl);

  try {
    const result = await createTeacherRequest(userId, fileUrl);
    console.log(result);

    if (result.status === 200) {
      // Keep the file if status is 200
      res.status(result.status).send(result.data);
    } else {
      // Delete the file if status is not 200
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete file:", err);
        else console.log("File deleted:", fileUrl);
      });
      res.status(result.status).send(result.data);
    }
  } catch (err) {
    // Delete the file if there's an error
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
      else console.log("File deleted due to error:", fileUrl);
    });
    res.status(400).send(err);
  }
});

module.exports = multerRoute;

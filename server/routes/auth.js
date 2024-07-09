var express = require('express');
const { login, register, getAllUser, getUserById, updateUser, deleteUserById, updateUserFreeCourse, getProfile, logout, changePassword, updateAvatar } = require('../controllers/authenController');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);
authRoute.put("/changePassword", verifyUser, changePassword);
authRoute.get("/profile", verifyUser, getProfile);
authRoute.get("/logout", logout);
authRoute.get("/", verifyAdmin, getAllUser);
authRoute.get("/:id", getUserById);
authRoute.put("/profile", verifyUser ,updateUser);
authRoute.put("/:id/course/:idCourse", verifyUser, updateUserFreeCourse);
authRoute.delete("/:id", verifyAdmin, deleteUserById);
authRoute.put("/updateAvatar", verifyUser ,updateAvatar);




module.exports = authRoute;
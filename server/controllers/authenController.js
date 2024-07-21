
var User = require("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Course = require("../models/course");
const { addProgress } = require("./userChapterProgressController");
const { createNotification } = require("./notificationController");
var nodemailer = require('nodemailer');

const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { avatar, password, ...otherFields } = req.body;
    const newUser = new User({
      // username: req.body.username,
      // email: req.body.email,
      password: hash,
      avatar: "https://img.upanh.tv/2024/06/18/user-avatar.png",
      ...otherFields,
    });


    const defaultNotificationRoom = "room_profile_" + newUser.id;
    newUser.notificationRooms = ["room_system", defaultNotificationRoom];

    await newUser.save();

    //create notification realtime and saving in db
    const rooms = ["room_system"];
    const notification = {
      title: "system",
      name: "Name account",
      message: "has been created",
      link: "/",
      type: "system",
      image: "https://img.upanh.tv/2024/07/21/logo11.jpg",
    };
    createNotification(newUser.id, res.io, notification, rooms);

    res.status(200).json({
      success: true,
      message: "Successfully created",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const username = req.body.username;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const { password, role, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // set token in cookies
    console.log("token: " + token);
    res
      .cookie("accessToken", token, {
        // httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully login",
        token: token,
        role: role,
        data: { ...rest },
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "fail to login",
    });
  }
};
const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const AllUser = await User.find({});

    res.status(200).json({
      success: true,
      count: AllUser.length,
      message: "Successfully get all",
      data: AllUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get all. Try again",
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).populate("coursesEnrolled");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get User",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get User. Try again",
    });
  }
};

const updateUser = async (req, res) => {

  const id = req.user.id;
  const { email, password, ...rest } = req.body;
  const user = await User.findById(id);

  const rooms = [`room_profile_${req.user.id}`];
  const notification = {
    title: "system",
    sender: id,
    name: "Your profile",
    message: " has been updated",
    type: "profile",
    link: "/profile/informationuser",
    image: "https://img.upanh.tv/2024/06/26/21009353.jpg",
  };
  createNotification(req.user.id, res.io, notification, rooms);

  try {
    if (!user.googleId) {
      const updateUser = await User.findByIdAndUpdate(
        id,
        {
          $set: { ...req.body },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Successfully updated",
        data: updateUser,
      });
    } else {
      const updateUser = await User.findByIdAndUpdate(
        id,
        {
          $set: { ...rest },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Successfully updated",
        data: updateUser,
      });
    }

    // try {
    //     const updateUser = await User.findByIdAndUpdate(id, {
    //         $set: { ...req.body }
    //     }, { new: true })

    //     res.status(200).json({
    //         success: true,
    //         message: "Successfully updated",
    //         data: updateUser
    //     })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
    });
  }
};

const deleteUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteUserById = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: deleteUserById,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Try again",
    });
  }
};

const updateUserFreeCourse = async (req, res) => {
  const idCourse = req.params.idCourse;
  const idUser = req.params.id;

  try {
    const course = await Course.findById(idCourse).populate({
      path: "chapters",
      populate: {
        path: "lessons",
        model: "Lesson", // Tên của mô hình Lesson
      },
    });
    const user = await User.findById(idUser);

    if (!course || !course.isFree) {
      return res.status(400).json({
        success: false,
        message: "Course not found or not free.",
      });
    }

    const isEnrolled = user.coursesEnrolled.some(
      (enrolledCourse) =>
        enrolledCourse._id.toString() === course._id.toString()
    );

    if (isEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You have registered for this course.",
      });
    }

    const updateCourseOfUser = await User.findByIdAndUpdate(idUser, {
      $push: { coursesEnrolled: course._id },
    });

    if (!updateCourseOfUser) {
      return res.status(400).json({
        success: false,
        message: "Course not found or not free.",
      });
    }

    addProgress(user, course);
    res.status(200).json({
      success: true,
      message: "Course successfully submitted",
      data: updateCourseOfUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to submit. Try again",
    });
  }
};

const getProfile = async (req, res) => {
  const id = req.user.id;

  try {
    const getProfile = await User.findById(id);

    res.status(200).json({
      success: true,
      message: "Successfully get profile",
      data: getProfile,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get profile. Try again",
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

const changePassword = async (req, res) => {

  const userId = req.user.id;

  const rooms = [`room_profile_${req.user.id}`];
  const notification = {
    title: "passwordChangeNotification",
    sender: userId,
    name: "Your password",
    message: " has been changed",
    type: "profile",
    link: "/profile/security",
    image: "https://img.upanh.tv/2024/06/26/21009353.jpg",
  };
  createNotification(req.user.id, res.io, notification, rooms);
  // Handle password change event
  //  const room = "room_profile_" + req.user.id;
  //  res.io.to(room).emit('passwordChangeNotification', "password changed");

  //  io.emit('newLessonNotification', data);
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  const checkCorrectPassword = await bcrypt.compare(oldPassword, user.password);

  if (!checkCorrectPassword) {
    return res.status(401).json({
      success: false,
      message: "Incorrect email or password",
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  user.password = hash;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
};
const updateAvatar = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: req.body.avatar },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      data: user,
    });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update avatar',
            error: err.message
        });
    }

}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    try {
        const user = await User.findOne({ email: email })
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        )
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'brainitycourseweb@gmail.com',
                pass: 'tzuvnsosxdadntqt'
            }

        });
        var mailOptions = {
            from: 'brainitycourseweb@gmail.com',
            to: user.email,
            subject: 'Reset Password - Brainity Course',
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #04ddb2;">Reset Your Password</h2>
                <p>Dear ${user.name},</p>
                <p>We received a request to reset your password. Click the button below to reset it:</p>
                <a href="http://localhost:3000/reset_password/${token}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: white; background-color: #04ddb2; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>If you didn't request a password reset, please ignore this email.</p>
                <p>Thank you,<br>The Brainity Course Team</p>
            </div>
        `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.status(200).json({
                    message: "Success"
                })
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
const resetPassword = async (req, res) => {
    const userId = req.user.id
    const { token , newPassword, confirmPassword  } = req.body;
    
    try {
        if (newPassword == confirmPassword) {
            const user = await User.findById(userId)
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(newPassword, salt)
            console.log('new mk ', hash)
            user.password = hash;
            await user.save();

            return res.status(200).json({
                success: true,
                message: 'Password updated successfully'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'faild reset'
        })
    }


}

module.exports = {
    register,
    login,
    createUser,
    deleteUserById,
    getAllUser,
    getUserById,
    updateUserFreeCourse,
    updateUser,
    getProfile,
    logout,
    changePassword,
    updateAvatar,
    forgotPassword,
    resetPassword
}


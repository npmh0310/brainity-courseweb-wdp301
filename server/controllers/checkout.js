const Cart = require("../models/cart");
const Course = require("../models/course");
const Purchase = require("../models/purchase");
const User = require("../models/user");
const UserChapterProgress = require("../models/UserChapterProgress");

const enrollCourse = async (userId, courseId) => {
  try {
    const user = await User.findById(userId);

    if (user.coursesEnrolled.includes(courseId)) {
      return { status: 401, data: { message: "Previously registered course" } };
    } else {
      const course = await Course.findById(courseId).populate({
        path: "sections",
        populate: {
          path: "lessons",
          model: "Lesson",
        },
      });

      user.coursesEnrolled.push(course._id); // Lưu trữ chỉ ID của khóa học

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

      console.log("enroll success ne");

      return { data: { message: "Course enrolled successfully" } };
    }
  } catch (error) {
    return { data: { message: error.message } };
  }
};

const checkoutSuccess = async (userId) => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "courses.course"
    );
    if (!cart) return { status: 404, data: { message: "Cart not found" } };

    // lấy mấy cái item để thanh toán ra nè
    const courseToOrder = cart.courses.filter(
      (course) => course.later === true
    );

    if (courseToOrder.length === 0) {
      return {
        status: 400,
        data: { message: "No items to order" },
      };
    }

    const newOrder = new Purchase({
      user: userId,
      purchaseDetail: courseToOrder.map((item) => ({
        courses: item.course._id,
        priceAtPaid: item.course.price,
      })),
      paymentMethod: "Banking",
      totalPrice: courseToOrder.reduce(
        (sum, item) => sum + item.course.price,
        0
      ),
    });

    const savedOrder = await newOrder.save();

    for (const item of courseToOrder) {
      await enrollCourse(userId, item.course._id);
    }

    cart.courses = cart.courses.filter((course) => course.later === false);
    await cart.save();

    return {
      status: 200,
      data: {
        success: true,
        message: "Successfully created",
        data: savedOrder,
      },
    };
  } catch (err) {
    return {
      status: 500,
      data: {
        success: false,
        message: "Failed to create. Try again",
      },
    };
  }
};

const checkoutSuccessBuyNow = async (userId, idCourse) => {
  try {
    const courseByNow = Course.findById(idCourse);

    const newOrder = new Purchase({
      user: userId,
      purchaseDetail: {
        courses: courseByNow._id,
        priceAtPaid: courseByNow.price,
      },
      paymentMethod: "Banking",
      totalPrice: courseByNow.price,
    });

    const savedOrder = await newOrder.save();

    await enrollCourse(userId, idCourse);

    return {
      status: 200,
      data: {
        success: true,
        message: "Successfully created",
        data: savedOrder,
      },
    };
  } catch (err) {
    return {
      status: 500,
      data: {
        success: false,
        message: "Failed to create. Try again",
      },
    };
  }
};

const checkoutATM = async (req, res) => {
  const userId = req.user.id;
  const result = await checkoutSuccess(userId);
  res.status(result.status).json(result.data);
};

module.exports = { checkoutATM, checkoutSuccess, checkoutSuccessBuyNow };

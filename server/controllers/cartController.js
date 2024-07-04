
const Cart = require('../models/cart')
const Course = require('../models/course')


const createCart = async (req, res) => {
    const newCart = new Cart({ "user": req.user.id, ...req.body })

    try {
        const savedCart = await newCart.save()

        return res.status(200).json({
            success: true,
            message: "Successfully created cart",
            data: savedCart
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again"
        })
    }
}


const getCartById = async (req, res) => {
    const cartId = req.body.cartId;

    try {
        const getCartById = await Cart.findById(cartId)

        return res.status(200).json({
            success: true,
            message: "Successfully get Cart",
            data: getCartById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get Cart. Try again"
        })
    }
}

const addCourseToCart = async (req, res, next) => {
    const courseId = req.body.courseId;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ user: userId }).populate({
            path: 'courses.course',
            populate: {
                path: 'instructor'
            }
        });
        let modifyMessage = "";

        if (!cart) {
            cart = await createNewCart(req, res);
            modifyMessage = "New cart created. ";
        }

        if (cart.courses.some(data => data.course._id.toString() === courseId)) {
            return res.status(200).json({
                success: true,
                message: modifyMessage + "Course already exists in the cart",
                data: cart
            });
        }

        // Add the course to the cart
        cart.courses.push({ course: courseId });
        await cart.save();

        cart = await Cart.findOne({ user: userId }).populate({
            path: 'courses.course',
            populate: {
                path: 'instructor'
            }
        });

        return res.status(200).json({
            success: true,
            message: modifyMessage + "Course added to cart successfully",
            data: cart
        });
    } catch (err) {
        console.error("Error adding course to cart:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to add course. Try again"
        });
    }
};


const removeCourseFromCart = async (req, res) => {
    const courseId = req.body.courseId;
    const userId = req.user.id;
    let cart = await Cart.findOne({ user: userId }).populate({
        path: 'courses.course',
        populate: {
            path: 'instructor'
        }
    });
    let modifyMessage = "";

    if (!cart) {
        return res.status(500).json({
            success: false,
            message: "Cart not found. Unable to remove course."
        });
    }
    

    const courseIndex = cart.courses.findIndex(data => data.course._id.toString() === courseId);

    if (courseIndex === -1) {
        return res.status(500).json({
            success: false,
            message: "Course not found in the cart. Unable to remove course."
        });
    }

    // Remove the course from the cart
    cart.courses.splice(courseIndex, 1);
    await cart.save();

    cart = await Cart.findOne({ user: userId }).populate({
        path: 'courses.course',
        populate: {
            path: 'instructor'
        }
    });

    return res.status(200).json({
        success: true,
        message: "Course removed from cart successfully",
        data: cart
    });

};


const getCartByUserId = async (req, res) => {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId })
    .populate({
        path: 'courses.course',
        populate: {
            path: 'instructor'
        }
    });

    if (!cart) {
        cart = await createNewCart(req, res);
    }

    return res.status(200).json({
        success: true,
        message: "Successfully retrieved Cart",
        data: cart
    });

};


const createNewCart = async (req, res) => {
    const userId = req.user.id

    try {
        const newCart = new Cart({ user: userId })
        return newCart.save()
    } catch (error) {
        console.log(error)
    }
}

const deleteCartById = async (req, res) => {
    const cartId = req.body.cartId;

    try {
        const deleteCartById = await Cart.findByIdAndDelete(cartId)

        return res.status(200).json({
            success: true,
            message: "Successfully deleted",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again"
        })
    }
}

const updateCart = async (req, res) => {
    const cartId = req.params.cartId;

    try {
        const updateCart = await Cart.findByIdAndUpdate(cartId, {
            $set: req.body
        }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Successfully updated cart",
            data: updateCart
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update. Try again"
        })
    }
}

const updateCourseInCart = async ( req, res) => {
    const userId = req.user.id
    const courseId = req.body.courseId
    const later = req.body.later

    try {
        const cart = await Cart.findOneAndUpdate(
            {user: userId , 'courses.course': courseId },
            {$set: {'courses.$.later' : later}},
            {new: true}
        ).populate({
            path: 'courses.course',
            populate: {
                path: 'instructor'
            }
        });
        if(!cart) {
            return res.status(500).json({
                success: false,
                message: "Cart or course not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: cart
        })
    } catch (error) {
        console.error("Error updating course:", error);
        return res.status(500).json({
            success: false,
            message: "Cart or course not found",
        })
    }


}


module.exports = {
    createCart,
    deleteCartById,
    getCartByUserId,
    removeCourseFromCart,
    addCourseToCart,
    updateCart,
    updateCourseInCart
}
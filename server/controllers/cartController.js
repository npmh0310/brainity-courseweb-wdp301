
const Cart = require('../models/cart')
const Course = require('../models/course')


const createCart = async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()

        res.status(200).json({
            success: true,
            message: "Successfully created",
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
    const cart = req.params.cartId;

    try {
        const getCartById = await Cart.findById(cartId)

        res.status(200).json({
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

const addCourseToCart = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.userId;
    try {
        const cart = await Cart.findOne({ user: userId });
        
        if (!cart) {
            cart = new Cart({ user: userId, courses: [] });
        }
        
        // Check if the course already exists in the cart
        if (cart.courses.includes(courseId)) {
            res.status(200).json({
                success: true,
                message: "Course already exists in the cart",
            })
        }
        
        // Add the course to the cart
        cart.courses.push(courseId);
        await cart.save();
        res.status(200).json({
            success: true,
            message: "Course already exists in the cart",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to add course. Try again"
        })
    }
    
}

const removeCourseFromCart = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.userId;
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            res.status(404).json({
                success: false,
                message: "Cart not found for the user ID provided no"
            })
        }

        // Remove the course from the cart
        const index = cart.courses.indexOf(courseId);
        if (index !== -1) {
            cart.courses.splice(index, 1);
            await cart.save();
            res.status(200).json({
                success: false,
                message: "Course remove successfully"
            })
        } else {
            res.status(200).json({
                success: false,
                message: "Course not found in the cart"
            })
        }
    } catch (error) {
        console.error(error);
        return { message: 'Failed to remove course from cart' };
    }
} 

const getCartByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await Cart.findOne({user: userId})

        res.status(200).json({
            success: true,
            message: "Successfully get Cart",
            data: user.cart
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get Cart. Try again"
        })
    }
}

const deleteCartById = async (req, res) => {
    const cartId = req.params.cartId;

    try {
        const deleteCartById = await Cart.findByIdAndDelete(cartId)

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
            data: deleteCartById
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

        res.status(200).json({
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



module.exports = {
    createCart,
    deleteCartById,
    getCartByUserId,
    removeCourseFromCart,
    addCourseToCart,
    updateCart
}

const Cart = require('../models/cart')
const Course = require('../models/course')


const createCart = async (req, res) => {
    const newCart = new Cart({"user" : req.user.id, ...req.body})

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
    if(!req.body.action) 
        return res.status(400).json({
        success: false,
        message: "Please provide an action: add or remove in req body"
    });

    if(req.body.action == "remove") {
        return next();
    }

    const cartId = req.body.cartId;
    const courseId = req.body.courseId;
    const userId = req.user.id;

    try {
        let cart;
        let modifyMessage;

        if (cartId) {
          cart = await Cart.findById(cartId);
          modifyMessage = "Exist cart id in req. "
        } else {
          cart = await Cart.findOne({user: userId});
          modifyMessage = "Cart id find by user id. "
        }
        if (!cart) {
            cart = new Cart({ user: userId, courses: [] });
            modifyMessage = "New cart created. "
        }
        
        // Check if the course already exists in the cart
        if (cart.courses.includes(courseId)) {
            return res.status(200).json({
                success: true,
                message: modifyMessage+ "Course already exists in the cart",
                data: {
                    cart: {
                        id: cart._id,
                        courses: cart.courses
                    }
                }
            });
        }

        // Add the course to the cart
        cart.courses.push(courseId);
        await cart.save();
        
        return res.status(200).json({
            success: true,
            message: modifyMessage + "Course added to cart successfully",
            data: {
                cart: {
                    id: cart._id,
                    courses: cart.courses
                }
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to add course. Try again"
        });
    } 
}

const removeCourseFromCart = async (req, res) => {
    const courseId = req.body.courseId;
    const cartId = req.body.cartId;
    const userId = req.user.id;
    try {
        let cart = await Cart.findById(cartId);
        
        if (cartId) {
            cart = await Cart.findById(cartId);
            modifyMessage = "Exist cart id in req. "
        } else {
            cart = await Cart.findOne({user: userId});
            modifyMessage = "Cart id find by user id. "
        }
      
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found ID provided "
            })
        }

        // Remove the course from the cart
        const index = cart.courses.indexOf(courseId);
        if (index !== -1) {
            cart.courses.splice(index, 1);
            await cart.save();
            return res.status(200).json({
                success: true,
                message: modifyMessage + "Course remove successfully",
                data: {
                    cart: {
                        id: cart._id,
                        courses: cart.courses
                    }
                }
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "Course not found in the cart"
            })
        }
    } catch (error) {
        return { message: 'Failed to remove course from cart' };
    }
} 

const getCartByUserId = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await Cart.findOne({user: userId})

        if(!cart) {
            createCart(req, res);
        }

        return res.status(200).json({
            success: true,
            message: "Successfully get Cart",
            data: cart
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get Cart. Try again"
        })
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



module.exports = {
    createCart,
    deleteCartById,
    getCartByUserId,
    removeCourseFromCart,
    addCourseToCart,
    updateCart
}
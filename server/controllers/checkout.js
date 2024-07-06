const Cart = require("../models/cart");
const Purchase = require("../models/purchase")

const checkoutSuccess = async (userId) => {
    try {
        const cart = await Cart.findOne({ user: userId }).populate('courses.course');;
        if (!cart) return { status: 404, data: { message: 'Cart not found' } };

        // lấy mấy cái item để thanh toán ra nè 
        const courseToOrder = cart.courses.filter(course => course.later === true);

        if (courseToOrder.length === 0) {
            return {
                status: 400,
                data: { message: 'No items to order' }
            };
        }

        const newOrder = new Purchase({
            user: userId,
            purchaseDetail: courseToOrder.map(item => ({
                courses: item.course._id,
                priceAtPaid: item.course.price,
            })),
            paymentMethod: "Banking",
            totalPrice: courseToOrder.reduce((sum, item) => sum + item.course.price, 0)
        });

        const savedOrder = await newOrder.save();

        cart.courses = cart.courses.filter(course => course.later === false);
        await cart.save();

        return {
            status: 200,
            data: {
                success: true,
                message: "Successfully created",
                data: savedOrder
            }
        }
    } catch (err) {
        return {
            status: 500,
            data: {
                success: false,
                message: "Failed to create. Try again"
            }
        }
    }
}

const checkoutATM = async (req, res) => {
    const userId = req.user.id;
    const result = await checkoutSuccess(userId);
    res.status(result.status).json(result.data);
};

module.exports = { checkoutATM }
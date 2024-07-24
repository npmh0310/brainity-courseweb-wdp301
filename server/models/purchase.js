var mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        totalPrice: {
            type: Number,
            min: 0

        },
        paymentMethod: {
            type: String,
            required: true
        },
        purchaseDetail: [{
            courses: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
            priceAtPaid: Number
        }]
    },
    {timestamps: true}
);

var Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;

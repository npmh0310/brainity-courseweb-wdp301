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
        paymentStatus: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
            required: true
        },
        purchaseDetail: {
            courseId: String,
            priceAtPaid: Number
        }
    }
);

var Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;

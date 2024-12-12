import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    orderId: {
        type: String,
        required: [true, "Provide orderId"],
        unique: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    productDetails: {
        name: String,
        image: Array
    },
    paymentId: {
        type: String,
        default: ""
    },
    paymentStatus: {
        type: String,
        default: ""
    },
    deliveryAddress: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    invoiceReceipt: {
        type: String,
        default: ""
    }
},{
    timestamps: true
})

const OrderModel = mongoose.model('Order', orderSchema)

export default OrderModel
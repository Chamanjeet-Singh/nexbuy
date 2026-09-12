import mongoose, { mongo, Mongoose } from "mongoose"
import { type } from "os";

const couponSchema = new mongoose.Schema({
    code: {
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    discountPercentage: {
        type: Number,
        required: true,
        trim: true
    },
    minShoppingAmount: {
        type: Number,
        required: true,
        trim: true
    },
    validity: {
        type: Date,
        required: true,
    },
    deletedAt: {
        type:String,
        default:null,
        index: true
    },
},{timestamps: true})

// as soon as time end the otp expires and data get automatically delete 


const CouponModel = mongoose.models.Coupon ||  mongoose.model("Coupon",couponSchema, "coupons")
export default CouponModel;
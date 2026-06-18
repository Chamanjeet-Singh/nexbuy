import mongoose, { mongo, Mongoose } from "mongoose"

const otpSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    otp: {
        type:String,
        required: true
    },
    expiredAt: {
        type:Date,
        required: true,
        default: () => new Date(Date.now() + 10 * 60 * 1000)

    },
},{timestamps: true})

// as soon as time end the otp expires and data get automatically delete 

otpSchema.index({expiredAt:1},{expireAfterSeconds: 0})

const OTPModel = mongoose.models.OTP ||  mongoose.model("OTP",otpSchema, "otps")
export default OTPModel;
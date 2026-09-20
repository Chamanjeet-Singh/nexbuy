import mongoose, { mongo, Mongoose } from "mongoose"
import { type } from "os";

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    rating: {
        type: Number,   
        required: true
    },
    title:{
        type: String,
        required: true
    },
    review:{
        type: String,
        required: true
    },
    deletedAt: {
        type:String,
        default:null,
        index: true
    },
},{timestamps: true})

// as soon as time end the otp expires and data get automatically delete 


const ReviewModel = mongoose.models.Review ||  mongoose.model("Review",reviewSchema, "reviews")
export default ReviewModel;
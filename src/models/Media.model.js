import mongoose, { mongo, Mongoose } from "mongoose"

const mediaSchema = new mongoose.Schema({
    asset_id: {
        type:String,
        required: true,
        trim: true
    },
    public_id: {
        type:String,
        required: true,
        trim: true
    },
    path: {
        type:String,
        required: true,
        trim: true
    },
    thumbnail_url: {
        type:String,
        required: true,
        trim: true
    },
    alt: {
        type:String,
        trim: true
    },
    title: {
        type:String,
        trim: true
    },
    deletedAt: {
        type:String,
        default:null,
        index: true
    },
},{timestamps: true})

// as soon as time end the otp expires and data get automatically delete 


const MediaModel = mongoose.models.OTP ||  mongoose.model("Media",mediaSchema, "medias")
export default MediaModel;
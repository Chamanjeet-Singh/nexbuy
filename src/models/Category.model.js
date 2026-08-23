import { timeStamp } from "console"
import mongoose, { mongo } from "mongoose"
import { lowercase } from "zod";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },

    slug: {
        type:String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    deletedAt: {
        type:Date,
        default:null,
        index: true
    }
},{ timestamps: true })

const CategoryModel = mongoose.models.Category || mongoose.model("Category", categorySchema, "categories")
export default CategoryModel;
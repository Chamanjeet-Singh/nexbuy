import { timeStamp } from "console"
import mongoose, { mongo } from "mongoose"
import { lowercase } from "zod";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },

    slug: {
        type:String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,

    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    mrp: {
        type:Number,
        require: true,
    },
    sellingPrice: {
        type:Number,
        require: true,
    },
    discountPercentage: {
        type:Number,
        require: true,
    },
    media: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            required: true
        }
    ],
    description: {
        type:String,
        require: true,
    },
    deletedAt: {
        type:Date,
        default:null,
        index: true
    }
},{ timestamps: true })


productSchema.index({category : 1})

const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema, "products")
export default ProductModel;
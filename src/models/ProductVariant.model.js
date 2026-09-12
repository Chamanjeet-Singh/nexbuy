import mongoose from "mongoose"
import { lowercase, number } from "zod";

const ProductVariantSchema = new mongoose.Schema({

    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    color: {
        type: String,
        require: true,
        trim: true
    },

    size: {
        type:String,
        require: true,
        trim: true,
        unique: true

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
    sku: {
        type: String,
        require: true,
    },
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



const ProductVariantModel = mongoose.models.ProductVariant || mongoose.model("ProductVariant", ProductVariantSchema, "productvariants")
export default ProductVariantModel;
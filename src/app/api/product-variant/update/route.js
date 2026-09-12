import { catchError,  response } from "../../../../lib/helperFunction"
import { isAuthenticated } from "../../../../lib/authentication"
import { connectDB } from "../../../../lib/dbConnect"
import { zSchema } from "../../../../lib/zodSchema"
import ProductVariantModel from "../../../../models/ProductVariant.model"


export async function PUT(request) {
    try {
        const auth = await isAuthenticated("admin")
        if(!auth.isAuth){
            return response(false, 403 , "Unauthorized")
        }

        await connectDB()

        const payload = await request.json()
        const schema = zSchema.pick({
                          _id: true,
                          product: true,
                          sku: true,
                          color: true,
                          size: true,
                          mrp: true,
                          sellingPrice: true,
                          discountPercentage: true,
                          media: true
                         
                         
                      })

        const validate = schema.safeParse(payload)

        if(!validate.success){
           return response(false, 400, "Invalid or missing fields", validate.error)
        }

        const validatedData  = validate.data;

        const getProductVariant = await ProductVariantModel.findById({deletedAt: null ,_id: validatedData._id});

        if(!getProductVariant){
            return response(false, 404 , "Can't find the Category")
        }

        getProductVariant.product = validatedData.product,
        getProductVariant.color = validatedData.color,
        getProductVariant.sku = validatedData.sku,
        getProductVariant.size = validatedData.size,
        getProductVariant.mrp = validatedData.mrp,
        getProductVariant.sellingPrice = validatedData.sellingPrice,
        getProductVariant.discountPercentage = validatedData.discountPercentage,
        getProductVariant.media = validatedData.media,

        await getProductVariant.save()

         return response(true, 200, "Product Variant updated successfully")
                  

        
    } catch (error) {

        return catchError(error, "Failed to add product")
        
    }

    
}
import { catchError,  response } from "../../../../lib/helperFunction"
import { isAuthenticated } from "../../../../lib/authentication"
import { connectDB } from "../../../../lib/dbConnect"
import { zSchema } from "../../../../lib/zodSchema"
import CouponModel from "../../../../models/Coupon.model"
import { Code } from "lucide-react"



export async function POST(request) {
    try {
        const auth = await isAuthenticated("admin")
        if(!auth.isAuth){
            return response(false, 403 , "Unauthorized")
        }

        await connectDB()

        const payload = await request.json()
         const schema = zSchema.pick({
                          code: true,
                          discountPercentage: true,
                          minShoppingAmount: true,
                          validity: true,
                         
                      })

        const validate = schema.safeParse(payload)

        if(!validate.success){
           return response(false, 400, "Invalid or missing fields", validate.error)
        }

        const couponData = validate.data
        
        const newCoupon = new CouponModel({

                code : couponData.code,
                discountPercentage : couponData.discountPercentage,
                minShoppingAmount : couponData.minShoppingAmount,
                validity : couponData.validity,
               
        }) 
        await newCoupon.save();

        return response(true, 200, "Coupon added successfully", newProduct)
                  

        
    } catch (error) {

        return catchError(error, "Failed to add coupon")
        
    }

    
}
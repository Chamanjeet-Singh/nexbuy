import { SignJWT } from "jose";
import { connectDB } from "../../../../lib/dbConnect";
import { catchError, response } from "../../../../lib/helperFunction";
import { zSchema } from "../../../../lib/zodSchema";
import OTPModel from "../../../../models/Otp.model";
import {cookies} from "next/headers";
import userModel from "../../../../models/User.model";


export async function POST(request) {
    try {
        await connectDB();

        const payload = await  request.json();
        console.log("payload : ",payload)

        const validateSchema = zSchema.pick({
            otp:true, email: true
        })

        const validatedData = validateSchema.safeParse(payload);

        if(!validatedData.success){
            return response(false, 401, "Invalid or missing fields data", validatedData.error)
        }

        //verify otp

        const {email,otp} = validatedData.data

        const getOtpData = await OTPModel.findOne({email,otp})

        if(!getOtpData){
            return response(false, 401, "Invalid or Exprired OTP")
        }

        const getUser = await userModel.findOne({deletedAt: null ,  email}).lean()
        if(!getUser){
            return response(false, 401, "User not found. ")

        }

        //remove otp after validation

        await getOtpData.deleteOne()

        return response(true,200, "OTP verified")
        
    } catch (error) {
        return catchError(error)
    }
    
}
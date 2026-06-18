import { otpEmail } from "../../../../email/otpEmail";
import { connectDB } from "../../../../lib/dbConnect";
import { catchError, generateOtp, response } from "../../../../lib/helperFunction";
import { zSchema } from "../../../../lib/zodSchema";
import OTPModel from "../../../../models/Otp.model";
import userModel from "../../../../models/User.model";
import { sendMail } from "../../../../lib/sendMail";


export async function POST(request) {
    try {
        await connectDB()

        const payload = await request.json()
        
        const validateSchema = zSchema.pick({
            email:true
        })

         const validatedData = validateSchema.safeParse(payload)
          if(!validatedData.success){
                return response(false, 401, "Invalid or missing fields data", validatedData.error)
            }
            const {email} = validatedData.data

            const getUser = await userModel.findOne({email})

            if(!getUser){
                return response(false, 401, "User not found", validatedData.error)
               
            }

            //remove old otp
            await OTPModel.deleteMany({email})
            const otp = generateOtp()
            const newOtpData = new OTPModel({
                email, otp
            })


            await newOtpData.save();

            const otpSendStatus = await sendMail("Your login verification code.",email,otpEmail(otp))

            if(!otpSendStatus){
                return response(false, 400, "Failed to Resend OTP", validatedData.error)
            }

            return response(true, 200, "OTP send successfully.")


       

    } catch (error) {
       return catchError(error)
    }
    
}
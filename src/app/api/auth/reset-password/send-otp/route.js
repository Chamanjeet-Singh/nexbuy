import { otpEmail } from "../../../../../email/otpEmail";
import { connectDB } from "../../../../../lib/dbConnect";
import { catchError, generateOtp, response } from "../../../../../lib/helperFunction";
import { sendMail } from "../../../../../lib/sendMail";
import { zSchema } from "../../../../../lib/zodSchema";
import OTPModel from "../../../../../models/Otp.model";
import userModel from "../../../../../models/User.model";

export async function POST(params) {
    try {
        await connectDB()

        const payload = request.json();

        const validateSchema = zSchema.pick({
            email: true
        })

        const validatedData = validateSchema.safeParse(payload)

        if(!validatedData){
            return response(false,401,"Invalid or missing email address", validatedData.error)
        }

        const {email} = validatedData.data;

        const getUser = await userModel.findOne({deletedAt: null , email}).lean

        if(!getUser){
        return response(false, 401, "User not found", validatedData.error)
        }

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
        
                    return response(true, 200, "Plese verify your account")
        
        

        
    } catch (error) {
        return catchError(error)
        
    }
    
}
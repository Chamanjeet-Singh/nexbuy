import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/dbConnect";
import { zSchema } from "../../../../lib/zodSchema";
import UserModel from "../../../../models/User.model";
import comparePassword from "../../../../models/User.model";
import {z } from "zod";
import { SignJWT } from "jose";
import { sendMail } from "../../../../lib/sendMail";
import { emailVerificationLink } from "../../../../email/emailVerificationLink";
import OTPModel from "../../../../models/Otp.model";
import { generateOtp } from "../../../../lib/helperFunction";
import { catchError, response } from "../../../../lib/helperFunction"
import { otpEmail } from "../../../../email/otpEmail"


export async function POST(request) {

    try {
        await connectDB()

        const payload  = await request.json()

        const validationSchema = zSchema.pick({
            email: true
        }).extend({
            password: z.string()
        })

        const validatedData = validationSchema.safeParse(payload)

        if(!validatedData.success){
            return response(false, 401, "Invalid or missing fields data", validatedData.error)
        }

        const {email, password} = validatedData.data

        //get user

        const getUser = await UserModel.findOne({deletedAt: null , email}).select("+password")

        if(!getUser){
            return response(false,404,"Invalid Login Credentials.")
        }

        //resend email verification link

        if(!getUser.isEmailVerified){
            const secret = new TextEncoder().encode(process.env.SECRET_KEY)
                    const token = await new SignJWT({ userId: getUser._id.toString() })
                        .setIssuedAt()
                        .setExpirationTime("1h")
                        .setProtectedHeader({ alg: "HS256" })
                        .sign(secret)
            
                    await sendMail(
                        "Email Verification request",
                        email,
                        emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`)
                    )

                    return response(false,401,"Your email is not verified, We have send a verification link to your registered email address")
        }

        //password verificaiton
        const isPasswordVerified = await getUser.comparePassword(password);

        if(!isPasswordVerified){
             return response(false,400,"Invalid Login Credentials.")
           
        }

        //otp generation
        await OTPModel.deleteMany({email})//deleting old OTP
        const otp = generateOtp()

        //storing otp to databaase

        const newOtpData = new OTPModel({
            email, otp
        })
        
        await newOtpData.save()


        const otpEmailStatus = sendMail("Your Login Verificaition Code", email, otpEmail(otp));
        if(!(await otpEmailStatus).success){
            return response(false,400,"Failed to send OTP.")
        }

         return response(true,200,"Please verify your device.")

    } catch (error) {
        return catchError(error)
    }
    
}


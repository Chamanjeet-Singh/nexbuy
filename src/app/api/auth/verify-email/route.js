import { jwtVerify } from "jose";
import { connectDB } from "../../../../lib/dbConnect";
import { catchError, response } from "../../../../lib/helperFunction";
import userModel from "../../../../models/User.model";
import { isValidObjectId } from "mongoose";

export async function POST(request) {
    try {
        await connectDB();
        const {token} = await request.json()

        if(!token)
            return response(false,400,"Missing token")

        const secret = new TextEncoder().encode(process.env.SECRET_KEY)
        const decode = jwtVerify(token, secret)
        const userId = (await decode).payload.userId

        if(!isValidObjectId(userId)){
            return response(false,400,"Invalid UserId,", userId)
        }

       
        // get user

        const user = await userModel.findById(userId)
         if(!user)
            return response(false,400,"User not found")

         user.isEmailVerified = true
         await user.save()


         return response(true,200,"Email Verification Successfull")

    } catch (error) {
     return  catchError(error);
        
    }
    
}
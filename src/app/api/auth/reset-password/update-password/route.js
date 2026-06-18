import { connectDB } from "../../../../../lib/dbConnect";
import { catchError, response } from "../../../../../lib/helperFunction";
import { zSchema } from "../../../../../lib/zodSchema";
import userModel from "../../../../../models/User.model";

export async function PUT(params) {
    try {
        await connectDB();

        const payload = await request.json()

        const validateSchema = zSchema.pick({
            email:true, password:true
        })

        const validatedData = validateSchema.safeParse(payload);

        if(!validatedData){
            return response(false,401,"Invalid or missing email address", validatedData.error)
            
        }

        const {email, password} = validatedData

        const getUser = userModel.findOne({deletedAt:null , email}).select("+password")

        if(!getUser){
            return response(false,401,"User not Found")
        }

       getUser.password = password
       await getUser.save()

        return response(true, 201, "Password updated Successfully")





    } catch (error) {
        return catchError(error)
        
    }
    
}
import {connectDB} from "../../../../lib/dbConnect"
import { catchError, response } from "../../../../lib/helperFunction"
import { isAuthenticated } from "../../../../lib/authentication"
import CategoryModel from "../../../../models/Category.model"

export async function GET(request) {
    try {
        const auth = await isAuthenticated("admin")
        if(!auth.isAuth){
            return response(false, 403 , "Unauthorized")
        }
        await connectDB()

        const filter = {
            deletedAt: null
        }

        const getCatagory = await CategoryModel.find(filter).sort({createdAt: -1}).lean()


        if(!getCatagory){
             return response(false, 404 , "Collection empty.")
        }

         return response(true, 200 , "Data found",getCatagory)
       

    } catch (error) {
        return catchError(error)
        
    }
    
}
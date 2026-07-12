import { isValidObjectId } from "mongoose"
import { zSchema } from "../../../../lib/zodSchema"
import { connectDB } from "../../../../lib/dbConnect"
import { catchError, isAuthenticated, response } from "../../../../lib/helperFunction"
import MediaModel from "../../../../models/Media.model"

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
                  alt: true,
                  title: true,
              });

              const validate = schema.safeParse(payload)
              if(!validate.success){
                response(false,400,"Invalid or missing fields",validate.error)
              }

              const {_id, alt, title} = validate.data
              if(!isValidObjectId(_id)){
                return response(false,400,"Invalid Object id")
              }

              const getMedia = await MediaModel.findById(_id)
              if(!getMedia){
                return response(false,404,"Media not found")
              }

              getMedia.alt = alt
              getMedia.title = title
              await getMedia.save()

              return response(true,200,"Media Updated Successfully.")
          
    

    } catch (error) {
        return catchError(error)
        
    }
    
}
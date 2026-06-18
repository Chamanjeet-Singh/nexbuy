import mongoose from "mongoose"

const MONGOOSE_URI = process.env.MONGOOSE_URI

console.log("ALL ENV:", {
    MONGOOSE_URI: process.env.MONGOOSE_URI,
    NODE_ENV: process.env.NODE_ENV,
    SECRET_KEY: process.env.SECRET_KEY
})

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {
        conn: null,
        promise: null,
    }
}

export const connectDB = async () => {
    try {
        if(cached.conn) return cached.conn;
    
        if(!cached.promise){
            cached.promise = mongoose.connect(MONGOOSE_URI, {
                dbName: "nexbuy",
                bufferCommands:false
            
            })
    
        }
        cached.conn = await cached.promise;

        //  await mongoose.connection.collection("users").dropIndex("emaik_1")
        // console.log("Dropped emaik_1 index")

    
        return cached.conn
    } catch (error) {
        console.error(error)
        return error;
        
    }
    
}
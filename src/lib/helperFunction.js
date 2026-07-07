
import { NextResponse } from 'next/server'

export const response = (success, statusCode, message, data = {}) => {
    return NextResponse.json({ success, statusCode, message, data })
}

export const catchError = (error, customMessage) => {
    let message = customMessage || "Internal Server Error"

    // Handle duplicate key error
    if(error.code === 11000) {
        const keys = Object.keys(error.keyPattern).join(",")
        message = `Duplicate fields: ${keys}. These fields value must be unique`
    } else if(error.message) {
        message = error.message
    }

    // ✅ Don't spread the error object - extract only safe serializable fields
    const errorObj = process.env.NODE_ENV === "development"
        ? { message, stack: error.stack, code: error.code }
        : { message }

    return NextResponse.json({
        success: false,
        statusCode: Error.code,
        ...errorObj
    })
}


export const generateOtp =  () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    return otp;

}

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
export const isAuthenticated = async (role) => {
    try {
        const cookieStore = await cookies()


        if(!cookieStore.has("access_token")){
            return {
                isAuth: false
        }}
        const access_token = cookieStore.get("access_token")

        const {payload} = await jwtVerify(access_token.value,new TextEncoder().encode(process.env.SECRET_KEY))

        if(payload.role !== "admin"){
            return {
                isAuth: false,
               
        }
        }

        return {
                isAuth: true,
                 userId: payload._id
            }
    } 
    catch (error) {
        return {
                isAuth: false,
                error
            }
        
    }
}
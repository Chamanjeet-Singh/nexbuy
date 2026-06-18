// import { success } from "zod";
// import { NextResponse } from 'next/server'

// export const response = (success, statusCode, message, data = {})=> {
//     return NextResponse.json({
//         success, statusCode, message, data
//     })

// }

// export const catchError =  (error , customMessage) => {
//     //handeling duplicate key error 
//     if(error.code == 11000){
//         const keys = Object.keys(error.keyPattern).join(",")
//         error.message = `Duplicate fields: ${keys}. These fields value must be unique`
//     }

//     let errorObj = {}

//     if(process.env.NODE_ENV == "development"){
//         errorObj : {
//             message: error.message,
//             error
//         }
//     }else{
//         errorObj : {
//             message: customMessage || "Internal Server Error"
//         }
//     }

//     return response(false,error.code,...errorObj)
// }

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
    return otp

}
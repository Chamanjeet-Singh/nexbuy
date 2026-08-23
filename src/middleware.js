
import { NextResponse } from "next/server"
import {USER_DASHBOARD, WEBSITE_LOGIN} from "../src/routes/WebsiteRoute"
import {ADMIN_DASHBOARD} from "../src/routes/AdminPanelRoute"
import { jwtVerify } from "jose"


export async function middleware(request) {
    try {
        const pathname = request.nextUrl.pathname
        const hasToken = request.cookies.has("access_token") 
        console.log("hasToken", hasToken)

        if(!hasToken ){
            //IF USER IS NOT LOGGED IN AND TRYING TO ACCESS ANY PAGE OTHER THAN LOGIN PAGE THEN REDIRECT HIM TO LOGIN PAGE
            if(!pathname.startsWith("/auth")){
                return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url))
            }

            return NextResponse.next() //allow access to auth route if not logged in
        }

        //verify tokens
        const access_token = request.cookies.get("access_token").value
        const {payload} = await jwtVerify(access_token, new TextEncoder().encode(process.env.SECRET_KEY))


        const role = payload.role
        
        //prevend logged in user to access auth routes

        if(pathname.startsWith("/auth")){
            return NextResponse.redirect(new URL(
                role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD                ,
                request.nextUrl
            ))
        }

        //protect admin routes
        if(pathname.startsWith("/admin") && role !== "admin"){
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url))

        }

        //protect user routes
         if(pathname.startsWith("/my-account") && role !== "user"){
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url))

        }

        return NextResponse.next() //allow access to the route if all conditions are met

    } catch (error) {
        const response = NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url))
        response.cookies.delete("access_token")
        return response
        
    }
}

export const config = {
    matcher: ["/admin/:path*","/my-account/:path*","/auth/:path*"]
}
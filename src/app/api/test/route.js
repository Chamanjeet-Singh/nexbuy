import { connectDB } from "../../../lib/dbConnect";
import { NextResponse } from "next/server"

export async function GET() {
        await connectDB();
        console.log(NextResponse)
        return NextResponse.json({
            success: true,
            message: "Connection success"
        })
    
}
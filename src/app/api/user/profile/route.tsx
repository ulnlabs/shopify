import { connectDB } from "@/app/mongoose/db"
import User from "@/app/mongoose/models/User"
import { NextResponse } from "next/server"

export async function PUT(req: Request) {
    const { email } = await req.json();
    console.log(email);
    
    await connectDB()
    const profile = await User.findOne({ email }).select('profile')
    if (profile) {
        return NextResponse.json(profile, { status: 200 })
    }
    return NextResponse.json({}, { status: 400 })
}
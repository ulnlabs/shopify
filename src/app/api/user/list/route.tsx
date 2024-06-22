import { connectDB } from "@/app/mongoose/db";
import User from "@/app/mongoose/models/User";
import { Repeat1 } from "lucide-react"
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const { email } = await req.json();
    await connectDB();
    const userlist = await User.find({ email: { $ne: email } }).select('username phoneno email role status')
    return NextResponse.json(userlist, { status: 200 })
}
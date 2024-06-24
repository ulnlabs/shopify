import { connectDB } from "@/app/mongoose/db";
import User from "@/app/mongoose/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, status } = await req.json();
    await connectDB();
    const updatestatus = await User.findOneAndUpdate({ email: email }, { status: status })
    if (updatestatus) {
        return NextResponse.json({ msg: 'data updated' }, { status: 200 })
    }
    return NextResponse.json({ msg: 'Something went wrong' }, { status: 400 })
}
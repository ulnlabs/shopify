import { connectDB } from "@/app/mongoose/db";
import User from "@/app/mongoose/models/User";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const { email } = await req.json();
    try {
        connectDB()
        const status = await User.findOne({ email }).select('status')
        if (status) {
            return NextResponse.json(status, { status: 200 });
        }

    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({ msg: 'error in stutus api' }, { status: 400 })
}
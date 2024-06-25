import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import User from "@/app/mongoose/models/User";
export async function PUT(req: Request, res: Response) {
    const {
        username,
        email,
    } = await req.json();
    await connectDB()
    const emailExist = await User.findOne({email:email});
    const userExist = await User.findOne({username:username});
    console.log(email , username);
    if (emailExist != null) {
        return NextResponse.json({msg:'Email Already Exist!'},{status:400})
    }
    if (userExist != null) {
        return NextResponse.json({msg:'Username Already Exist!'},{status:400})
    }
    return NextResponse.json({msg:'Something Went Wrong!'}, { status: 200 })
}
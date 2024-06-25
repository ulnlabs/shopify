import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import User from "@/app/mongoose/models/User";
export async function POST(req: Request, res: Response) {
    const {
        username,
        phoneno,
        email,
        role,
        password,
    } = await req.json();
    await connectDB()
    try {
        if (username && phoneno && email && role && password) {
            const hashedpassword = await bcrypt.hash(password, 10);
            const useradd = await User.create({ username, phoneno, email, role, status: 'active', password: hashedpassword })
            if (useradd) {
                return NextResponse.json({ msg: 'User added Successfully' }, { status: 200 });
            }
            return NextResponse.json({ msg: 'error in server-side' }, { status: 400 });
        }
    } catch (err) {
        console.log(err);

        return NextResponse.json({ msg: 'error in server-side' }, { status: 400 });
    }
    return NextResponse.json({ msg: 'error in server-side' }, { status: 400 })
}
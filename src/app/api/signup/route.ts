import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcryptjs";
import User from "../../mongoose/models/User";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/mongoose/db";

export async function POST(req: Request) {
  const data = await req.formData();
  console.log(data);
  /*
  await connectDB();
  try {
    const existingUser = await User.findOne({ email }).select("_id");
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });*/
  return NextResponse.json({ message: "User created successfully" });
  /*} catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ message: "Server Error" });
  }*/
}

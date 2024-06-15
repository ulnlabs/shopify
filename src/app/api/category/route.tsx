import { connectDB } from "@/app/mongoose/db"
import Category from "@/app/mongoose/models/Category"
import { NextResponse } from "next/server"

export const PUT = async (req: Request) => {
    await connectDB()
    const category = await Category.find()
    return NextResponse.json(category, { status: 200 })
}

export const POST = async (req: Request) => {
    await connectDB()
    const { name, description } = await req.json();
    const category = await Category.create({ name, description })
    console.log(category);
    
    return NextResponse.json(category, { status: 200 })
}

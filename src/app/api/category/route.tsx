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
    const formdata = await req.formData()
    const name = formdata.get("name")
    const description = formdata.get("description")
    const category = await Category.create({ name, description })
    return NextResponse.json(category, { status: 200 })
}

import { connectDB } from "@/app/mongoose/db";
import Brand from "@/app/mongoose/models/Brand";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    await connectDB()
    const brand = await Brand.find()
    return NextResponse.json(brand, { status: 200 })
}

export async function POST(req: Request) {
    await connectDB()
    const formdata = await req.formData()
    const name = formdata.get("name")
    const desc = formdata.get("desc")
    const brand = await Brand.create({ name, desc })
    console.log(brand);
    
    return NextResponse.json(brand, { status: 200 })
}
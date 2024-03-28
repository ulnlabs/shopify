import { connectDB } from "@/app/mongoose/db"
import { taxModel } from "@/app/mongoose/models/Tax"
import { NextResponse } from "next/server"

export const PUT = async (req: Request) => {
    await connectDB()
    const tax = await taxModel.find()
    return NextResponse.json(tax, { status: 200 })
}

export const POST = async (req: Request) => {
    const {name,description}=await req.json();
    const Tax = await taxModel.create({name,description})
    return NextResponse.json(Tax, { status: 200 })
}


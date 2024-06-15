import { connectDB } from "@/app/mongoose/db"
import Unit from "@/app/mongoose/models/Unit"
import { NextResponse } from "next/server"

export const PUT = async (req: Request) => {
    await connectDB()
    const unit = await Unit.find()
    return NextResponse.json(unit, { status: 200 })
}

export const POST = async (req: Request) => {
    await connectDB()
    const formdata = await req.formData()
    const name = formdata.get("name")
    const description = formdata.get("description")
    const unit = await Unit.create({ name, description })
    return NextResponse.json(unit, { status: 200 })
}

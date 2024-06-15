import { connectDB } from "@/app/mongoose/db";
import Brand from "@/app/mongoose/models/Brand";
import { NextResponse } from "next/server";


export const DELETE = async (req: Request, res: Response) => {
    await connectDB()
    const { id } = await req.json();
    const response = await Brand.deleteOne({ _id: id })
    console.log(response);
    return NextResponse.json(response, { status: 200 })
}

export async function PUT(req: Request) {
    await connectDB()

    const { data } = await req.json();
    const header = data.header;
    console.log(header);
    if (header === "updateStatus") {
        const { id, status } = data
        const response = await Brand.updateOne({ _id: id }, { status: status })
        return NextResponse.json(response, { status: 200 })
    }
    else if (header === "update") {
        const { id } = data;
        const { name, description: desc } = data;
        const response = await Brand.updateOne({ _id: id }, { name, desc })
        return NextResponse.json(response, { status: 200 })
    }
    else {
        console.log("enterd");
        const brand = await Brand.find()
        console.log(brand);
        return NextResponse.json(brand, { status: 200 })
    }
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
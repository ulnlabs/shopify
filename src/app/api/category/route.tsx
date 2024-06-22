import { connectDB } from "@/app/mongoose/db"
import Category from "@/app/mongoose/models/Category"
import { NextResponse } from "next/server"

export const DELETE = async (req: Request, res: Response) => {
    await connectDB()
    const { id } = await req.json();
    console.log(id);
    const response = await Category.deleteOne({ _id: id })
    console.log(response);
    return NextResponse.json(response, { status: 200 })
}


export const PUT = async (req: Request) => {
    await connectDB()
    const { data } = await req.json();
    const header = data.header;
    console.log(header);
    if (header === "updateStatus") {
        const { id, status } = data;
        const response = await Category.updateOne({ _id: id }, { status: status })
        return NextResponse.json(response, { status: 200 })
    }
    else if (header === "update") {
        const { id } = data;
        const { name, description } = data;
        const response = await Category.updateOne({ _id: id }, { name, description })
        return NextResponse.json(response, { status: 200 })
    }
    else {
        console.log("enterd");
        const brand = await Category.find()
        console.log(brand);
        return NextResponse.json(brand, { status: 200 })
    }

}

export const POST = async (req: Request) => {
    await connectDB()
    const { name, description } = await req.json();
    const category = await Category.create({ name, description })
    console.log(category);

    return NextResponse.json(category, { status: 200 })
}

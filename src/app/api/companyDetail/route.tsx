import { connectDB } from "@/app/mongoose/db";
import companyDetail from "@/app/mongoose/models/companyProfile";
import { NextResponse } from "next/server";


export async function PUT(req: Request) {
    await connectDB();
    try {
        const Userdata = await companyDetail.find()
        return NextResponse.json(Userdata, { status: 200 })
    }
    catch (error) {
        console.log(error);
    }

}


export async function POST(req: Request) {
    await connectDB();
    try {
        const { data } = await req.json();
        await companyDetail.create(data)

        return NextResponse.json({ message: "Data saved successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ message: "Error saving data" }, { status: 500 });
    }
}

import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
    let data = await req.json();
    console.log(data);
    await connectDB();
    return NextResponse.json("done")

}
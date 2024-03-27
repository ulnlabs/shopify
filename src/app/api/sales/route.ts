import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { items } from "@/app/mongoose/models/item";
import { connectDB } from "@/app/mongoose/db";
/* const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.D_MONGODB_URI!);
    } catch (error: any) {
        console.error(`Error: ${error}`);
    }

} */

export const PUT = async (req: Request) => {
    try {
        const { data } = await req.json();
        console.log(data);
        let search = new RegExp( data, 'i');
        await connectDB();
        const value = await items.find({name:search});
        console.log(value);
        
            return NextResponse.json(value)
       
    }
    catch (err) {
        console.log(err);
    }
}

export async function POST(req: any) {

    let data = await req.json();
    console.log(data);


    return NextResponse.json({ res: "data success" })
}
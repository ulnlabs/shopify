import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";
import Item from "@/app/mongoose/models/Items";


export const GET = async (req: Request) => {
    try {
        await connectDB();
    }
    catch (err) {
        console.log(err);
        return new Response("Internal Server Error", { status: 500 })

    }
    const data = await Item.find({});
    console.log(data);
    return NextResponse.json(data);


}

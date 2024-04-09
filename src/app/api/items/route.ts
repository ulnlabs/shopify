import { connectDB } from "@/app/mongoose/db";
import Item from "@/app/mongoose/models/Items";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
    let data = await req.json();
    console.log(data.data);
    const { itemCode, itemName, brand, category, unit, expdate, barcode, description, price, } = data.data;

    await connectDB();

    const addItem = Item.create()



    console.log(data.data);
    return NextResponse.json("done")
}   
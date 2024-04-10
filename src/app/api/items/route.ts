import { connectDB } from "@/app/mongoose/db";
import Item from "@/app/mongoose/models/Items";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
    let data = await req.json();
    console.log(data.data);
    const { itemCode, itemName, brand, category, unit, expdate, barcode, description, price, tax, taxType, profitmargin: profitMargin, discount, discountType } = data.data;

    await connectDB();
    console.log("entered");
    try {

        const addItem = await Item.create({
            itemCode, itemName, brand, category, unit, expdate, barcode, description, price, tax, taxType, profitMargin, discount, discountType
        })
        console.log("add", addItem);
        console.log("entered");

        const getData = await Item.find({});

        console.log(getData);
        

        return NextResponse.json(addItem)
    }
    catch (err) {
        console.log(err);

        return new Response("Internal Server Error", { status: 500 })

    }

}   
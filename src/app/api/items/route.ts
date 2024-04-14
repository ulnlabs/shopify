import { connectDB } from "@/app/mongoose/db";
import Item from "@/app/mongoose/models/Items";
import { items } from "@/app/mongoose/models/item";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
    let data = await req.json();
    console.log(data.data);
    const { itemCode, itemName, brand, category, unit, expdate, barcode, description, price, tax, taxtype: taxType, profitmargin: profitMargin, discount, discountType, saleprice } = data.data;
    console.log(taxType);



    await connectDB();
    console.log("entered");
    try {

        const addItem = await Item.create({
            itemCode, itemName, brand, category, unit, expdate, barcode, description, price, tax, taxType, profitMargin, discount, discountType
        })

        console.log("add", addItem);
        console.log("entered");


        const addStocks = await items.create({
            itemCode, itemName, barcode, price: saleprice, tax, taxType, discount, discountType
        })
        console.log(addStocks);

        return NextResponse.json(addItem)
    }
    catch (err) {
        console.log(err);

        return new Response("Internal Server Error", { status: 500 })

    }

}   
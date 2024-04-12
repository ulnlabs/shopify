import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";
import Item from "@/app/mongoose/models/Items";


export const PUT = async (req: Request) => {
    try {
        await connectDB();
    }
    catch (err) {
        console.log(err);
        return new Response("Internal Server Error", { status: 500 })

    }
    const res = await Item.find();
  /*   const data = res.map((item: any) => {
        const taxAmount = item.taxType && item.taxType.toLowerCase() === "exclusive" ? item.tax : item.taxType === "" ? item.tax : 0
        console.log(taxAmount);
        console.log("a", item.taxType);


        return { ...item, taxAmount: taxAmount }
    })
    console.log(data[0].taxAmount);
    console.log(data); */
    return NextResponse.json(res);


}

import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
    let data = await req.json();
    console.log(data.data);
    
   const {itemCode,itemName,brand,category,unit,expdate,barcode,description,price,} = data.data
 /*  const iteData =  data.data.map((item:any) => item.itemCode)
    console.log(iteData.itemCode); */
    
    console.log(data.data);
    await connectDB();
    return NextResponse.json("done")

}   
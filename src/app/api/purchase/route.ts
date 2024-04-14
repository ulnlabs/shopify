import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";
import Item from "@/app/mongoose/models/Items";
import mongoose from "mongoose";
import { Purchase } from "@/app/mongoose/models/purchases"
import { items } from "@/app/mongoose/models/item";


export const PUT = async (req: Request) => {
    try {
        await connectDB();
    }
    catch (err) {
        console.log(err);
        return new Response("Internal Server Error", { status: 500 })

    }

    try {
        console.log("test");

        const res = await items.find();
        /*   const data = res.map((item: any) => {
              const taxAmount = item.taxType && item.taxType.toLowerCase() === "exclusive" ? item.tax : item.taxType === "" ? item.tax : 0
              console.log(taxAmount);
              console.log("a", item.taxType);
      
      
              return { ...item, taxAmount: taxAmount }
          })
          console.log(data[0].taxAmount);
          console.log(data); */
        console.log(res);
        return NextResponse.json(res);

    }
    catch (err) {
        console.log(err);

    }

}

export const POST = async (res: Request) => {
    const data = await res.json()
    console.log(data);

    await connectDB();
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        const counter = (await Purchase.find()).length;
        console.log(counter);

        const purchaseCode = "pu" + String(counter + 1).padStart(4, "0")
        console.log(purchaseCode);

        const { customerName: c_name, customerId: c_id, billDate: date, billPaymentType: paymentType } = data.purchase;

        const item = data.items.map(({ itemName, tax, taxType, quantity, price, discount, itemCode, discountType }: any) => ({
            itemName,
            tax,
            quantity,
            price,
            taxType,
            discount,
            discountType,
            itemCode
        }));

        const newPurchase = await Purchase.insertMany([{
            c_id,
            c_name,
            date,
            purchaseCode,
            items: item,
            paymentType
        }], { session });
        console.log("stored", newPurchase);

        for (const { itemCode, quantity } of item) {
            const updated = await items.updateOne({ itemCode: itemCode }, {
                $inc: {
                    quantity: +quantity
                }
            }, { session })
            console.log(updated);
        }



        console.log("items");


        await session.commitTransaction();

        return NextResponse.json("done")

    }
    catch (err) {
        await session.abortTransaction();
        console.error('Error creating sales:', err);
    }

    return NextResponse.json("done")


}

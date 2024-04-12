
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/app/mongoose/db";
import Sales from "@/app/mongoose/models/Sales";
import { format } from "date-fns";
import Item from "@/app/mongoose/models/Items";


/* export const PUT = async (req: Request) => {
    try {
        const { data } = await req.json();
        let search = new RegExp(data, 'i');
        await connectDB();
        const value = await items.find({ name: search });
        console.log(value);
        return NextResponse.json(value)
    }
    catch (err) {
        console.log(err);
        return new Response('Internal server error', { status: 500 })
    }
} */


export const GET = async (req: Request) => {
    const header = req.headers.get("data")
    console.log(header);

    const findOverall = (sale: any) => {
        const initial = 0;
        const overall = sale.items.map((item: any) => findTotal(item.price, item.quantity, item.tax, item.discountType, item.discount))
        return overall.reduce((prev: number, current: number) => prev + current, initial)

    }

    const findTotal = (price: number, quantity: number, tax: string, discountType: string, discount: number) => {

        const taxValue = (tax.match(/\d+/g)!.map(Number)[0] * price / 100) * quantity;
        const discountValue = discountType === "Fixed" ? discount * quantity : discountType === "Per %" ? (discount * price / 100) * quantity : 0;
        return taxValue + price + discountValue

    }
    try {
        await connectDB();
    }
    catch (err) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }

    try {
        if (header === "getItems") {
            const data = await Item.find({});
            return NextResponse.json(data);
        }
        else if (header === "getSales") {
            const data = await Sales.find({})
                .sort({ _id: -1 })
                .limit(10)
            const modified = data.map((sale: any) => {
                return ({
                    date: format(sale.date, "dd-MM-yy"),
                    c_name: sale.c_name,
                    salesCode: sale.salesCode,
                    total: /* sale.items.map((item: any) => findTotal(item.price,item.quantity,item.tax) ) */ findOverall(sale),

                })
            })


            console.log(data[0].items[0].discountType);

            return NextResponse.json(modified);

        }

    }
    catch (err) {
        console.log(err);
        return new Response('Internal Server Error', { status: 500 })

    }
}


export async function POST(req: any) {
    let data = await req.json();

    await connectDB();
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        const counter = (await Sales.find({})).length;



        const salesCode = "sl" + String(counter + 1).padStart(4, '0');
        console.log(salesCode);


        const { customerName: c_name, customerId: c_id, billDate: date, billPaymentType: paymentType } = data.sales;
        const item = data.items.map(({ name, tax, taxType, quantity, price, discount, itemCode, discountType }: any) => ({
            name,
            tax,
            quantity,
            price,
            taxType,
            discount,
            discountType,
            itemCode
        }));
        const newSales = await Sales.insertMany([{
            c_id,
            c_name,
            date,
            salesCode,
            items: item,
            paymentType
        }], { session });
        console.log('Sales created successfully:', newSales);
        for (const { id, quantity } of item) {
            const updated = await items.updateOne({ id: id }, { $inc: { quantity: -quantity } }, { session });
            console.log(updated);
        }
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        console.error('Error creating sales:', error);
    }
    finally {
        session.endSession();
    }
    return NextResponse.json({ res: "data success" })
}
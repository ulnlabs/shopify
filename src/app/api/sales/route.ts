import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { items } from "@/app/mongoose/models/item";
import { connectDB } from "@/app/mongoose/db";
import Sales from "@/app/mongoose/models/Sales";

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.D_MONGODB_URI!);
    } catch (error: any) {
        console.error(`Error: ${error}`);
    }

}


export const PUT = async (req: Request) => {
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
}

export async function POST(req: any) {
    let data = await req.json();
    console.log(data);
    const { customerName: c_name, customerId: c_id, billDate: date, billSubtotal: subtotal, billTotal: total, billPaymentType: paymentType } = data.sales;
    const item = data.items.map(({ name, tax_type, quantity, price, discount, id }: any) => ({
        name,
        tax_type,
        quantity,
        price,
        discount,
        id
    }));
    await connectDB();
    console.log(items);
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const newSales = await Sales.insertMany([{
            c_id,
            c_name,
            date,
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
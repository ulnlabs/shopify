
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/app/mongoose/db";
import Sales from "@/app/mongoose/models/Sales";
import { format } from "date-fns";
import Item from "@/app/mongoose/models/Items";
import { items } from "@/app/mongoose/models/item";
import { Purchase } from "@/app/mongoose/models/purchases";


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


export const PUT = async (req: Request) => {

    const findOverall = (sale: any) => {
        const initial = 0;
        const overall = sale.items.map((item: any) => {
            const { total } = findTotal(item.price, item.quantity, item.tax, item.discountType, item.discount, item.taxType)
            return total
        })
        return overall.reduce((prev: number, current: number) => prev + current, initial)

    }

    const findTotal = (price: number, quantity: number, tax: string, discountType: string, discount: number, taxType: string) => {

        const taxValue = (tax.match(/\d+/g)!.map(Number)[0] * price / 100) * quantity;
        const discountValue = discountType === "Fixed" ? discount * quantity : discountType === "Per %" ? (discount * price / 100) * quantity : 0;
        const total = taxType.toLocaleLowerCase() === "inclusive" ? price + discountValue : taxValue + price + discountValue
        return { total, taxValue };

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

    const data = await req.json()

    console.log(data);

    const { header,from,end } = data.data
    console.log(header);
    console.log(from,end);
    


    try {
        if (header === "getItems") {
            const data = await items.find().lean();


            const modified = data.map((item: any) => {

                const { total, taxValue } = findTotal(item.price, 1, item.tax, item.discountType, item.discount, item.taxType)
                return ({
                    ...item,
                    taxAmount: taxValue,
                    subtotal: total
                })
            })
            console.log(modified);


            return NextResponse.json(modified);
        }
        else if (header === "getSales") {
            const data = await Sales.find({date:{
                $gte: "2024-04-15T10:13:53.094+00:00",
                $lte: end
            }})
                
               
            const modified = data.map((sale: any) => {
                return ({
                    date: format(sale.date, "dd-MM-yy"),
                    c_name: sale.c_name,
                    salesCode: sale.salesCode,
                    total: findOverall(sale),
                })
            })
            console.log(modified );
            
            return NextResponse.json(modified);

        }

    }
    catch (err) {
        console.log(err);
        return new Response('Internal Servers Error', { status: 500 })

    }
}


export async function POST(req: any) {
    let data = await req.json();

    await connectDB();
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        const temp = (await Sales.find().sort({ 'createdAt': -1 }).limit(1));

        const counter = temp[0]?.salesCode.match(/\d+/g)!.map(Number)[0];
        console.log(counter);



        const codeValue = counter > 0 ? String(counter + 1) : "1"

        console.log("d", codeValue);

        const salesCode = "sl" + codeValue.padStart(4, '0');
        console.log("s", salesCode);


        const { customerName: c_name, customerId: c_id, billDate: date, billPaymentType: paymentType, billStatus: status } = data.sales;
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
        const newSales = await Sales.insertMany([{
            c_id,
            c_name,
            date,
            salesCode,
            items: item,
            paymentType,
            status
        }], { session });
        console.log('Sales created successfully:', newSales);
        for (const { itemCode, quantity } of item) {
            const updated = await items.updateOne({ itemCode: itemCode }, { $inc: { quantity: -quantity } }, { session });
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
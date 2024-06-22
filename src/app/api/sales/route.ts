import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/app/mongoose/db";
import Sales from "@/app/mongoose/models/Sales";
import { format } from "date-fns";
import { items as stocks } from "@/app/mongoose/models/item";




export const PUT = async (req: Request) => {

    const findOverall = (sale: any) => {
        const initial = 0;
        const overall = sale.items.map((item: any) => {
            const { total } = findTotal(item.price, sale.status.toLowerCase() === "returned".toLowerCase() ? item.returned_quantity : item.sold_quantity, item.tax, item.discountType, item.discount, item.taxType)
            console.log(total);
            console.log(item.returned_quantity);
            return total
        })
        const temp = overall.reduce((prev: number, current: number) => prev + current, initial);
        console.log(temp);
        const taxValue = sale.taxType ? (sale.taxType?.match(/\d+/g)!.map(Number)[0] * sale.otherCharges / 100) : 0
        const discount = sale.discountType && (sale.discountType).toLowerCase() === "Percentage".toLowerCase() ? Math.floor(((sale.discount / 100) * (temp + taxValue)) * 10) / 10 : sale.discount;
        return temp + taxValue - discount;
    }

    const findTotal = (price: number, quantity: number = 0, tax: string, discountType: string, discount: number, taxType: string,) => {
        console.log(quantity);

        const taxValue = (tax.match(/\d+/g)!.map(Number)[0] * price / 100) * quantity;
        console.log(taxValue);


        const discountValue = discountType.toLowerCase() === "Fixed".toLowerCase() ? discount * quantity : discountType.toLowerCase() === "Percentage".toLowerCase() ? (discount * price / 100) * quantity : 0;
        console.log(discountValue);

        const total = taxType.toLowerCase() === "Inclusive".toLowerCase() ? price * quantity - discountValue : taxValue + price * quantity - discountValue
        console.log(total);

        return { total, taxValue, discountValue };
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
    const { header } = data.data
    try {
        if (header === "getItems") {
            const data = await stocks.find().lean();
            const modified = data.map((item: any) => {
                const { total, taxValue, discountValue } = findTotal(item.price, 1, item.tax, item.discountType, item.discount, item.taxType)
                return ({
                    ...item,
                    taxAmount: taxValue,
                    subtotal: total,
                    discount: discountValue
                })
            })
            return NextResponse.json(modified);
        }
        else if (header === "getSales") {
            const { from, end } = data.data
            const fromDate = new Date(from);
            fromDate.setHours(fromDate.getHours() + 5)
            fromDate.setMinutes(fromDate.getMinutes() + 30)
            const endDate = new Date(end);
            endDate.setHours(endDate.getHours() + 5)
            endDate.setMinutes(endDate.getMinutes() + 30)
            if (fromDate.getDate() === endDate.getDate()) {
                const data = await Sales.find({
                    date: fromDate.setUTCHours(0, 0, 0, 0),
                    $or: [
                        { status: "Sold" },
                        { status: "Return Raised" }

                    ]
                }).sort({ 'createdAt': -1 }).lean();
                console.log(data);
                const modified = data.map((sale: any) => {
                    const itemList = sale.items.map((item: any) => {
                        const { total, taxValue, discountValue } = findTotal(item.price, sale.status.toLowerCase() === "returned".toLowerCase() ? item.returned_quantity : item.sold_quantity, item.tax, item.discountType, item.discount, item.taxType)
                        return ({
                            ...item,
                            taxAmount: taxValue,
                            subtotal: total,
                            quantity: item.sold_quantity,
                            discount: discountValue
                        })
                    })
                    return ({
                        ...sale,
                        date: format(sale.date, "dd-MM-yy"),
                        c_name: sale.c_name,
                        salesCode: sale.salesCode,
                        total: findOverall(sale),
                        status: sale.status,
                        items: itemList
                    })
                })
                console.log(modified);
                return NextResponse.json(modified);
            }
            else {
                const data = await Sales.find({
                    date: {
                        $gte: fromDate,
                        $lte: endDate,
                    },
                    $or: [
                        { status: "Sold" },
                        { status: "Return Raised" }

                    ]

                }).sort({ 'createdAt': -1 }).lean();


                const modified = data.map((sale: any) => {

                    const itemList = sale.items.map((item: any) => {
                        const { total, taxValue, discountValue } = findTotal(item.price, sale.status.toLowerCase() === "returned".toLowerCase() ? item.returned_quantity : item.sold_quantity, item.tax, item.discountType, item.discount, item.taxType)
                        return ({
                            ...item,
                            taxAmount: taxValue,
                            subtotal: total,
                            quantity: item.sold_quantity,
                            discount: discountValue
                        })
                    })

                    return ({
                        ...sale,
                        date: format(sale.date, "dd-MM-yy"),
                        c_name: sale.c_name,
                        salesCode: sale.salesCode,
                        total: findOverall(sale),
                        status: sale.status,
                        items: itemList
                    })
                })
                console.log(modified);
                return NextResponse.json(modified);
            }
        }
        else if (header === "getReturn") {
            const { from, end } = data.data
            const fromDate = new Date(from);
            fromDate.setHours(fromDate.getHours() + 5)
            fromDate.setMinutes(fromDate.getMinutes() + 30)
            const endDate = new Date(end);
            endDate.setHours(endDate.getHours() + 5)
            endDate.setMinutes(endDate.getMinutes() + 30)
            if (fromDate.getDate() === endDate.getDate()) {
                const data = await Sales.find({
                    date: fromDate.setUTCHours(0, 0, 0, 0),
                    status: "Returned"
                }).sort({ 'createdAt': -1 }).lean();
                console.log(data);
                const modified = data.map((sale: any) => {
                    const itemList = sale.items.map((item: any) => {
                        const { total, taxValue } = findTotal(item.price, item.sold_quantity, item.tax, item.discountType, item.discount, item.taxType)
                        return ({
                            ...item,
                            taxAmount: taxValue,
                            subtotal: total
                        })
                    })
                    return ({
                        ...sale,
                        date: format(sale.date, "dd-MM-yy"),
                        c_name: sale.c_name,
                        salesCode: sale.salesCode,
                        total: findOverall(sale),
                        status: sale.status,
                        items: itemList
                    })
                })
                console.log(modified);

                return NextResponse.json(modified);
            }
            else {
                const data = await Sales.find({
                    date: {
                        $gte: fromDate,
                        $lte: endDate
                    },
                    status: "Returned"

                }).sort({ 'createdAt': -1 }).lean();

                const modified = data.map((sale: any) => {
                    return ({
                        ...sale,
                        date: format(sale.date, "dd-MM-yy"),
                        c_name: sale.c_name,
                        salesCode: sale.salesCode,
                        total: findOverall(sale),
                        status: sale.status
                    })
                })
                console.log(modified);
                return NextResponse.json(modified);
            }
        }
        else if (header === "deleteSales") {
            const { salesCode } = data.data
            console.log(salesCode);

            const res = await Sales.findOneAndDelete({ salesCode: salesCode });
            console.log(res);


            return new Response("done", { status: 200 })
        }
    }
    catch (err) {
        console.log(err);
        return new Response('Internal Servers Error', { status: 500 })

    }
}


export async function POST(req: any) {
    let { header, data } = await req.json();

    console.log(header);
    console.log(data);

    const { salesCode: code } = data

    console.log(code);




    await connectDB();
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const temp = await Sales.find().sort({ 'createdAt': -1 }).limit(1);
        const counter = temp[0]?.salesCode.match(/\d+/g)!.map(Number)[0];
        const codeValue = counter > 0 ? String(counter + 1) : "1"
        const salesCode = "sl" + codeValue.padStart(4, '0');

        const { customerName: c_name, billDiscountType: discountType, billDiscount: discount, billCharges: otherCharges, customerId: c_id, billDate, billPaymentType: paymentType/* , billStatus: status */, billTaxType: taxType, billNote: note } = data.sales;



        const { status } = data
        console.log(status);


        const date = new Date(billDate);
        date.setHours(date.getHours() + 5);
        date.setMinutes(date.getMinutes() + 30);
        date.setUTCHours(0, 0, 0, 0)

        const items = data.items.map(({ itemName, tax, taxType, quantity, price, discount, itemCode, discountType }: any) => {
            const renamedQuantity = header === "sales" ? "sold_quantity" : header ===
                "return" ? "returned_quantity" : " quantity";

            const discountValue = (discount / quantity) / price * 100

            return {
                itemName,
                tax,
                [renamedQuantity]: quantity,
                price,
                taxType,
                discount: discountValue,
                discountType,
                itemCode
            };
        });

        console.log(typeof (items[0].sold_quantity));

        if (header === "sales") {


            const newSales = await Sales.create([{
                c_id,
                c_name,
                date,
                salesCode,
                taxType,
                discountType,
                discount,
                otherCharges,
                items,
                paymentType,
                status,
                note
            }], { session });

            console.log(newSales);


            for (const { itemCode, sold_quantity } of items) {
                const updated = await stocks.updateOne({ itemCode: itemCode }, { $inc: { quantity: -sold_quantity } }, { session });
                console.log(updated);
            }
            console.log('Sales created successfully:', newSales);
        }
        else if (header === "return") {
            const getSales = await Sales.find({ salesCode: code })
            console.log(getSales);
            for (const { itemCode, returned_quantity } of items) {
                const updated = await stocks.updateMany({ itemCode: itemCode }, { $inc: { quantity: +returned_quantity }, $set: { status: "returned" } }, { session });
                console.log(updated);
                console.log(returned_quantity);
                const changeSales = await Sales.updateOne(
                    {
                        'items.itemCode': { $regex: new RegExp(itemCode, 'i') },
                        salesCode: code
                    }, // Using case-insensitive regex
                    { $inc: { 'items.$.sold_quantity': -returned_quantity, 'items.$.returned_quantity': + returned_quantity } }
                );
                console.log(changeSales);

                /*  items.forEach(({ itemCode: tempCode, returned_quantity: tempQuantity, sold_quantity }: any) => {
 
                     if (tempCode === itemCode) {
                         return {
                             ...items,
                             sold_quantity: sold_quantity - tempQuantity,
                             returned_quantity: returned_quantity + tempQuantity
                         }
                     }
                     else {
                         return items;
                     }
 
                 }) */
                console.log(items);
            }
            const change = await Sales.updateOne({ salesCode: code }, { $set: { status: status } });
            console.log(change);
        }
        await session.commitTransaction();
        await session.endSession();
        return NextResponse.json({ res: "data success" });
    } catch (error) {
        console.error('Error creating sales:', error);
        if (session) {
            await session.abortTransaction();
            await session.endSession();
        }
        return NextResponse.json({ error: "An error occurred" });
    }
}
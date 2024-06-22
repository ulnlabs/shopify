import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Purchase } from "@/app/mongoose/models/purchases"
import { format } from "date-fns";
import Item from "@/app/mongoose/models/Items";
const findOverall = (purchase: any) => {
    const initial = 0;
    const overall = purchase.items.map((item: any) => {

        const { total } = findTotal(item.price, purchase.status.toLowerCase() === "returned".toLowerCase() ? item.returned_quantity : item.Purchase_quantity, item.tax, item.discountType, item.discount, item.taxType)
        console.log(total);

        return total
    })

    const temp = overall.reduce((prev: number, current: number) => prev + current, initial);
    console.log(temp);

    const taxValue = (purchase.taxType ? (purchase.taxType?.match(/\d+/g)!.map(Number)[0] * Number(purchase.otherCharges) / 100) : 0) + Number(purchase.otherCharges)
    console.log(purchase.discount);

    const discount = purchase.discountType && (purchase.discountType).toLowerCase() === "Percentage".toLowerCase() ? Math.floor(((purchase.discount / 100) * (temp + taxValue)) * 100) / 100 : purchase.discount;
    console.log(discount);

    console.log(taxValue);


    return temp + taxValue - discount;
}


const findTotal = (price: number, quantity: number = 0, tax: string, discountType: string, discount: number, taxType: string,) => {
    console.log(quantity);

    console.log(price);


    const taxValue = (tax.match(/\d+/g)!.map(Number)[0] * price / 100) * quantity;
    console.log(taxValue);


    const discountValue = discountType.toLowerCase() === "Fixed".toLowerCase() ? discount * quantity : discountType.toLowerCase() === "Percentage".toLowerCase() ? (discount * price / 100) * quantity : 0;
    console.log(price, discountValue);


    const total = taxType.toLowerCase() === "Inclusive".toLowerCase() ? price * quantity - discountValue : taxValue + price * quantity - discountValue
    console.log(total);

    return { total, taxValue, discountValue };
}



export const PUT = async (req: Request) => {


    try {
        await connectDB();
    }
    catch (err) {
        console.log(err);
        return new Response("Internal Server Error", { status: 500 })

    }
    const data = await req.json()
    const { header } = data.data
    try {
        console.log("test");

        if (header === "getItems") {
            const data = await Item.find().lean();
            const modified = data.map((item: any) => {
                const profitMargin = item.profitMargin ? item.profitMargin * item.price / 100 : 0
                console.log(profitMargin);

                console.log(profitMargin);
                const { total, taxValue, discountValue } = findTotal(item.price + profitMargin, 1, item.tax, item.discountType, item.discount, item.taxType);

                return ({
                    ...item,
                    price: item.price + profitMargin,
                    taxAmount: taxValue,
                    subtotal: total,
                    discount: discountValue,
                    discountPer: item.discount
                })
            })
            return NextResponse.json(modified);

        }
        else if (header === "getPurchase") {
            const { from, end } = data.data
            const fromDate = new Date(from);
            fromDate.setHours(fromDate.getHours() + 5)
            fromDate.setMinutes(fromDate.getMinutes() + 30)
            console.log(fromDate);

            const endDate = new Date(end);
            endDate.setHours(endDate.getHours() + 5)
            endDate.setMinutes(endDate.getMinutes() + 30)
            console.log(endDate);
            if (fromDate.getDate() === endDate.getDate()) {
                const data = await Purchase.find({
                    date: fromDate.setUTCHours(0, 0, 0, 0),
                    $or: [
                        { status: "Purchased" },
                        { status: "Return Raised" }

                    ]
                }).sort({ 'createdAt': -1 }).lean();
                console.log(data);
                const modified = data.map((purchase: any) => {
                    const itemList = purchase.items.map((item: any) => {
                        const { total, taxValue, discountValue } = findTotal(item.price, purchase.status.toLowerCase() === "returned".toLowerCase() ? item.returned_quantity : item.Purchase_quantity, item.tax, item.discountType, item.discount, item.taxType)
                        console.log(item.discountPer);

                        return ({
                            ...item,
                            taxAmount: Math.floor(taxValue * 100) / 100,
                            subtotal: total,
                            quantity: item.Purchase_quantity,
                            discount: Math.floor(discountValue * 100) / 100,
                            discountPer: item.discount
                        })
                    })
                    return ({
                        ...purchase,
                        date: format(purchase.date, "dd-MM-yy"),
                        c_name: purchase.c_name,
                        purchaseCode: purchase.purchaseCode,
                        total: findOverall(purchase),
                        status: purchase.status,
                        items: itemList
                    })
                })
                console.log(modified);
                return NextResponse.json(modified);
            }
            else {
                console.log(fromDate, endDate);

                const data = await Purchase.find({
                    date: {
                        $gte: fromDate,
                        $lte: endDate,
                    },
                    $or: [
                        { status: "Purchased" },
                        { status: "Return Raised" }

                    ]

                }).sort({ 'createdAt': -1 }).lean();

                console.log(data);


                const modified = data.map((purchase: any) => {

                    const itemList = purchase.items.map((item: any) => {
                        const { total, taxValue, discountValue } = findTotal(item.price, purchase.status.toLowerCase() === "returned".toLowerCase() ? item.returned_quantity : item.Purchase_quantity, item.tax, item.discountType, item.discount, item.taxType)
                        console.log(item.discount);
                        return ({
                            ...item,
                            taxAmount: Math.floor(taxValue * 100) / 100,
                            subtotal: total,
                            quantity: item.Purchase_quantity,
                            discount: Math.floor(discountValue * 100) / 100,
                            discountPer: item.discount
                        })
                    })

                    return ({
                        ...purchase,
                        date: format(purchase.date, "dd-MM-yy"),
                        s_name: purchase.s_name,
                        purchaseCode: purchase.purchaseCode,
                        total: findOverall(purchase),
                        status: purchase.status,
                        items: itemList
                    })
                })
                console.log(modified);
                return NextResponse.json(modified, { status: 200 });
            }
        }
        else if (header === "getReturn") {
            console.log("done");

            const { from, end } = data.data
            const fromDate = new Date(from);
            fromDate.setHours(fromDate.getHours() + 5)
            fromDate.setMinutes(fromDate.getMinutes() + 30)
            const endDate = new Date(end);
            endDate.setHours(endDate.getHours() + 5)
            endDate.setMinutes(endDate.getMinutes() + 30)
            if (fromDate.getDate() === endDate.getDate()) {
                const data = await Purchase.find({
                    date: fromDate.setUTCHours(0, 0, 0, 0),
                    status: "Returned"
                }).sort({ 'createdAt': -1 }).lean();
                console.log(data);
                const modified = data.map((purchase: any) => {
                    const itemList = purchase.items.map((item: any) => {
                        const { total, taxValue, discountValue } = findTotal(item.price, item.returned_quantity, item.tax, item.discountType, item.discount, item.taxType)
                        return ({
                            ...item,
                            taxAmount: Math.floor(taxValue * 100) / 100,
                            subtotal: total,
                            quantity: item.returned_quantity,
                            discount: Math.floor(discountValue * 100) / 100,
                            discountPer: item.discount
                        })
                    })
                    return ({
                        ...purchase,
                        date: format(purchase.date, "dd-MM-yy"),
                        s_name: purchase.s_name,
                        purchaseCode: purchase.purchaseCode,
                        total: findOverall(purchase),
                        status: purchase.status,
                        items: itemList
                    })
                })
                console.log(modified);

                return NextResponse.json(modified);
            }
            else {
                console.log(fromDate, endDate);

                const data = await Purchase.find({
                    date: {
                        $gte: fromDate,
                        $lte: endDate
                    },
                    status: "Returned"

                }).sort({ 'createdAt': -1 }).lean();

                const modified = data.map((purchase: any) => {
                    const itemList = purchase.items.map((item: any) => {
                        const { total, taxValue, discountValue } = findTotal(item.price, item.returned_quantity, item.tax, item.discountType, item.discount, item.taxType)
                        return ({
                            ...item,
                            taxAmount: Math.floor(taxValue * 100) / 100,
                            subtotal: total,
                            quantity: item.returned_quantity,
                            discount: Math.floor(discountValue * 100) / 100,
                            discountPer: item.discount
                        })
                    })
                    return ({
                        ...purchase,
                        date: format(purchase.date, "dd-MM-yy"),
                        s_name: purchase.s_name,
                        purchaseCode: purchase.purchaseCode,
                        total: findOverall(purchase),
                        status: purchase.status,
                        items: itemList
                    })
                })
                console.log(modified);
                return NextResponse.json(modified);
            }
        }

        else if (header === "deletePurchase") {
            const { purchaseCode } = data.data
            console.log(purchaseCode);

            const res = await Purchase.findOneAndDelete({ purchaseCode: purchaseCode });
            console.log(res);


            return new Response("done", { status: 200 })
        }
    }
    catch (err) {
        console.log(err);
        return new Response("Internal server Error", { status: 500 });

    }

}
export async function POST(req: any) {
    let { header, data } = await req.json();

    console.log(header);
    console.log(data);
    await connectDB();
    const session = await mongoose.startSession();
    try {
        const temp = await Purchase.find().sort({ 'createdAt': -1 }).limit(1);
        const counter = temp[0]?.purchaseCode.match(/\d+/g)!.map(Number)[0];
        const codeValue = counter > 0 ? String(counter + 1) : "1"
        const purchaseCode = "pu" + codeValue.padStart(4, '0');
        const { customerName: s_name, billDiscountType: discountType, billDiscount: discount, billCharges: otherCharges, customerId: s_id, billDate, billPaymentType: paymentType/* , billStatus: status */, billTaxType: taxType, billNote: note } = data.purchase;
        console.log();
        const { status } = data
        console.log(status);
        const date = new Date(billDate);
        date.setHours(date.getHours() + 5);
        date.setMinutes(date.getMinutes() + 30);
        console.log(date);
        date.setUTCHours(0, 0, 0, 0)
        console.log(date);
        const itemData = data.items.map(({ itemName, tax, taxType, quantity, price, discount, itemCode, discountType }: any) => {
            const renamedQuantity = header === "purchase" ? "Purchase_quantity" : header ===
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
        console.log(itemData[0].Purchase_quantity);
        if (header === "purchase") {
            session.startTransaction();
            const newPurchase = await Purchase.create([{
                s_id,
                s_name,
                date,
                purchaseCode,
                taxType,
                discountType,
                discount,
                otherCharges,
                items: itemData,
                paymentType,
                status,
                note
            }], { session });
            console.log("purchases", newPurchase);
            for (const { itemCode, Purchase_quantity } of itemData) {
                console.log(Purchase_quantity, itemCode);

                const updated = await Item.updateOne({ itemCode: itemCode }, { $inc: { quantity: +Purchase_quantity } }, { session });
                console.log(updated);
            }
            console.log('Purchase created successfully:', newPurchase);
            console.log(purchaseCode);
            await session.commitTransaction();
            await session.endSession();

            const data = [{
                s_id,
                s_name,
                date,
                purchaseCode,
                taxType,
                discountType,
                discount,
                otherCharges,
                items: itemData,
                paymentType,
                status,
                note
            }]
            console.log(data);
            const modified = data.map((purchase: any) => {
                const itemList = purchase.items.map((item: any) => {
                    const { total, taxValue, discountValue } = findTotal(item.price, purchase.status.toLowerCase() === "returned".toLowerCase() ? item.returned_quantity : item.Purchase_quantity, item.tax, item.discountType, item.discount, item.taxType)
                    console.log(item.discountPer);
                    return ({
                        ...item,
                        taxAmount: Math.floor(taxValue * 100) / 100,
                        subtotal: total,
                        quantity: item.Purchase_quantity,
                        discount: Math.floor(discountValue * 100) / 100,
                        discountPer: item.discount
                    })
                })
                return ({
                    ...purchase,
                    date: format(purchase.date, "dd-MM-yy"),
                    c_name: purchase.c_name,
                    purchaseCode: purchase.purchaseCode,
                    total: findOverall(purchase),
                    items: itemList
                })
            })

            return NextResponse.json(modified[0], { status: 200 });
        }
        else if (header === "return") {
            session.startTransaction();
            const { purchaseCode: code } = data
            console.log(code);
            const getPurchase = await Purchase.find({ purchaseCode: code })
            console.log(getPurchase);
            for (const { itemCode, returned_quantity } of itemData) {
                const updated = await Item.updateMany({ itemCode: itemCode }, { $inc: { quantity: +returned_quantity } }, { session });
                console.log(updated);
                console.log(returned_quantity);
                const changePurchase = await Purchase.updateOne(
                    {
                        'items.itemCode': { $regex: new RegExp(itemCode, 'i') },
                        purchaseCode: code
                    }, // Using case-insensitive regex
                    { $inc: { 'items.$.Purchase_quantity': -returned_quantity, 'items.$.returned_quantity': + returned_quantity } }
                );
                console.log(changePurchase);

                console.log(itemData);
            }
            const change = await Purchase.updateOne({ purchaseCode: code }, { $set: { status: status } });
            console.log(change);
            await session.commitTransaction();
            return NextResponse.json({ res: "data success" }, { status: 200 });
        }

    } catch (error) {
        console.error('Error creating purchases:', error);
        if (session) {
            await session.abortTransaction();
            await session.endSession();
        }
        return NextResponse.json({ error: "An error occurred" });
    }
}

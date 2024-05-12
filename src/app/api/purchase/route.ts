import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Purchase } from "@/app/mongoose/models/purchases"
import { items as stocks } from "@/app/mongoose/models/item";
import { format } from "date-fns";

export const PUT = async (req: Request) => {

    const findOverall = (purchase: any) => {
        const initial = 0;
        const overall = purchase.items.map((item: any) => {

            const { total } = findTotal(item.price, purchase.status.toLowerCase() === "returned".toLowerCase() ? item.returned_quantity : item.Purchase_quantity, item.tax, item.discountType, item.discount, item.taxType)
            console.log(total);
            console.log(item.returned_quantity);


            return total
        })

        const temp = overall.reduce((prev: number, current: number) => prev + current, initial);
        console.log(temp);

        const taxValue = purchase.taxType ? (purchase.taxType?.match(/\d+/g)!.map(Number)[0] * purchase.otherCharges / 100) : 0
        console.log(purchase.discount);

        const discount = purchase.discountType && (purchase.discountType).toLowerCase() === "Percentage".toLowerCase() ? Math.floor(((purchase.discount / 100) * (temp + taxValue)) * 10) / 10 : purchase.discount;
        console.log(discount);

        console.log(taxValue);


        return temp + taxValue - discount;
    }


    const findTotal = (price: number, quantity: number = 0, tax: string, discountType: string, discount: number, taxType: string,) => {
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
        console.log(err);
        return new Response("Internal Server Error", { status: 500 })

    }
    const data = await req.json()
    const { header } = data.data
    try {
        console.log("test");

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
                        return ({
                            ...item,
                            taxAmount: taxValue,
                            subtotal: total,
                            quantity: item.Purchase_quantity,
                            discount: discountValue
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
                console.log(fromDate,endDate);
                
                const data = await Purchase.find({
                    date: {
                        $gte: fromDate,
                        $lte: endDate,
                    },
                    $or: [
                        { status: "Sold" },
                        { status: "Return Raised" }

                    ]

                }).sort({ 'createdAt': -1 }).lean();

                console.log(data);
                

                const modified = data.map((purchase: any) => {

                    const itemList = purchase.items.map((item: any) => {
                        const { total, taxValue, discountValue } = findTotal(item.price, purchase.status.toLowerCase() === "returned".toLowerCase() ? item.returned_quantity : item.Purchase_quantity, item.tax, item.discountType, item.discount, item.taxType)
                        return ({
                            ...item,
                            taxAmount: taxValue,
                            subtotal: total,
                            quantity: item.Purchase_quantity,
                            discount: discountValue
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
        else if (header === "getReturn") {
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
                        const { total, taxValue } = findTotal(item.price, item.Purchase_quantity, item.tax, item.discountType, item.discount, item.taxType)
                        return ({
                            ...item,
                            taxAmount: taxValue,
                            subtotal: total
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
                console.log(fromDate,endDate);
                
                const data = await Purchase.find({
                    date: {
                        $gte: fromDate,
                        $lte: endDate
                    },
                    status: "Returned"

                }).sort({ 'createdAt': -1 }).lean();

                const modified = data.map((purchase: any) => {
                    return ({
                        ...purchase,
                        date: format(purchase.date, "dd-MM-yy"),
                        s_name: purchase.s_name,
                        purchaseCode: purchase.purchaseCode,
                        total: findOverall(purchase),
                        status: purchase.status
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

    const { purchaseCode: code } = data

    console.log(code);




    await connectDB();
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
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
                const updated = await stocks.updateOne({ itemCode: itemCode }, { $inc: { quantity: +Purchase_quantity } }, { session });
                console.log(updated);
            }
            console.log('Purchase created successfully:', newPurchase);
        }
        else if (header === "return") {
            const getPurchase = await Purchase.find({ purchaseCode: code })
            console.log(getPurchase);
            for (const { itemCode, returned_quantity } of itemData) {
                const updated = await stocks.updateMany({ itemCode: itemCode }, { $inc: { quantity: +returned_quantity }, $set: { status: "returned" } }, { session });
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

                /*  items.forEach(({ itemCode: tempCode, returned_quantity: tempQuantity, Purchase_quantity }: any) => {
 
                     if (tempCode === itemCode) {
                         return {
                             ...items,
                             Purchase_quantity: Purchase_quantity - tempQuantity,
                             returned_quantity: returned_quantity + tempQuantity
                         }
                     }
                     else {
                         return items;
                     }
 
                 }) */
                console.log(itemData);
            }
            const change = await Purchase.updateOne({ purchaseCode: code }, { $set: { status: status } });
            console.log(change);
        }
        await session.commitTransaction();
        await session.endSession();
        return NextResponse.json({ res: "data success" });
    } catch (error) {
        console.error('Error creating purchases:', error);
        if (session) {
            await session.abortTransaction();
            await session.endSession();
        }
        return NextResponse.json({ error: "An error occurred" });
    }
}

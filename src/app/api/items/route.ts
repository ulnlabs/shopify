import { connectDB } from "@/app/mongoose/db";
import Item from "@/app/mongoose/models/Items";
import { items } from "@/app/mongoose/models/item";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
    const { data } = await req.json();
    console.log(data);
    const { header } = data
    console.log(header);

    await connectDB();
    if (header === "updateStatus") {
        const { id, status } = data
        const response = await Item.updateOne({ _id: id }, { status: status })
        return NextResponse.json(response, { status: 200 })
    }
    else if (header === "update") { }

    else {
        console.log("enterd");
        const item = await Item.find().lean();

        const modified = item.map((item: any) => {
            console.log(item);

            console.log(item.taxType);
            const taxPer = item.tax ? item.tax.match(/\d+/g)!.map(Number)[0] : 0

            const taxValue = taxPer * item.price / 100;
            const discount = item?.discountType.toLowerCase() === "fixed" ? item.discount : item.discount * item.price / 100

            const purchasePrice = item.taxType.toLowerCase() === "inclusive" ? item.purchasePrice : item.purchasePrice + taxValue - discount

            return (
                {
                    ...item,
                    purchasePrice: purchasePrice
                }
            )
        })
        console.log(modified);


        console.log(item);
        return NextResponse.json(item, { status: 200 })
    }


}


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
            itemCode, itemName, barcode, price: saleprice, tax, taxType, discount, discountType, quantity: 0
        })
        console.log(addStocks);

        return NextResponse.json(addItem)
    }
    catch (err) {
        console.log(err);

        return new Response("Internal Server Error", { status: 500 })

    }

}   
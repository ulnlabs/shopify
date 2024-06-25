import { connectDB } from "@/app/mongoose/db";
import Item from "@/app/mongoose/models/Items";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, res: Response) => {
    await connectDB()
    const { id } = await req.json();
    console.log(id);
    const response = await Item.deleteOne({ _id: id })
    console.log(response);
    return NextResponse.json(response, { status: 200 })
}

export const PUT = async (req: Request) => {
    const { data } = await req.json();
    console.log(data);
    const { header } = data
    console.log(header);
    /* const findTotal = (price: number, quantity: number = 0, tax: string, discountType: string, discount: number, taxType: string,) => {
        const taxValue = (tax.match(/\d+/g)!.map(Number)[0] * price / 100) * quantity;
        const discountValue = discountType.toLowerCase() === "Fixed".toLowerCase() ? discount * quantity : discountType.toLowerCase() === "Percentage".toLowerCase() ? (discount * price / 100) * quantity : 0;
        const total = taxType.toLowerCase() === "Inclusive".toLowerCase() ? price * quantity - discountValue : taxValue + price * quantity - discountValue
        console.log(total);

        return { total, taxValue, discountValue };
    } */

    await connectDB();
    if (header === "updateStatus") {
        const { id, status } = data
        const response = await Item.updateOne({ _id: id }, { status: status })
        return NextResponse.json(response, { status: 200 })
    }
    else if (header === "update") {
        console.log(data);
        const { id } = data
        const { itemName, itemCode, brand, category, unit, barcode, description, price, tax, taxType, profitMargin, discountType, discount } = data.data
        console.log(id, itemName);
        const updated = { itemName, itemCode, brand, category, unit, barcode, description, price, tax, taxType, profitMargin, discountType, discount }
        const response = await Item.updateOne({ _id: id }, updated)
        console.log(response);
        const find = await Item.find({ _id: id })
        console.log(find);

        console.log();
        return NextResponse.json("done", { status: 200 })
    }
    /*  else if (header === "getItems") {
         const data = await Item.find().lean();
         const modified = data.map((item: any) => {
             const profitMargin = item.profitMargin ? item.profitMargin * item.price / 100 : 0
             console.log(profitMargin);
             console.log(profitMargin);
             const { total, taxValue, discountValue } = findTotal(item.price + profitMargin, 1, item.tax, item.discountType, item.discount, item.taxType)
             console.log(total);
             console.log(item.quantity, item.itemCode, item.discount);
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
     } */
    else {
        console.log("enterd");
        const item = await Item.find().lean();
        console.log(item);
        const modified = item.map((item: any) => {
            console.log(item);
            console.log(item?.taxType);
            const taxPer = item.tax ? item.tax.match(/\d+/g)!.map(Number)[0] : 0
            const taxValue = taxPer * item.price / 100;
            const purchasePrice = item.taxType.toLowerCase() === "inclusive" ? item.price : item.price + taxValue
            const profitMargin = item.profitMargin ? item.profitMargin * purchasePrice / 100 : 0
            console.log(item.profitMargin);
            console.log(purchasePrice, profitMargin, taxValue, item.quantity);
            return (
                {
                    ...item,
                    purchasePrice: Math.floor(purchasePrice * 100) / 100,
                    salesPrice: Math.floor((purchasePrice + profitMargin) * 100) / 100
                }
            )
        })
        console.log(modified);
        return NextResponse.json(modified, { status: 200 })
    }


}


export const POST = async (req: Request) => {
    let data = await req.json();
    console.log(data.data);
    const { itemCode, itemName, brand, category, unit, barcode, description, price, tax, taxtype: taxType, profitmargin: profitMargin, discount, discountType, saleprice } = data.data;
    console.log(taxType);

    console.log(price);


    await connectDB();
    console.log("entered");
    try {

        const addItem = await Item.create({
            itemCode, itemName, brand, category, unit, barcode, description, price, tax, taxType, profitMargin, discount, discountType
        })

        console.log("add", addItem);
        console.log("entered");

        const getData = await Item.find({});

        console.log(getData);
        


        /*  const addStocks = await items.create({
             itemCode, itemName, barcode, price: saleprice, tax, taxType, discount, discountType, quantity: 0
         })
         console.log(addStocks);
  */
        return NextResponse.json(addItem)
    }
    catch (err) {
        console.log(err);

        return new Response("Internal Server Error", { status: 500 })

    }

}   
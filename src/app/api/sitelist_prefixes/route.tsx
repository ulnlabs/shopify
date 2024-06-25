
import sitelist_prefixes from "@/app/mongoose/models/sitelist_prefixes"; 
import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        await connectDB();
        const {formdata} = await req.json();
        
        const existingsitelist_prefixes = await sitelist_prefixes.findOne();
        if (existingsitelist_prefixes) {
            existingsitelist_prefixes.Category = formdata.Category;
            existingsitelist_prefixes.Customer=formdata.Customer;
            existingsitelist_prefixes.Expense=formdata.Expense;
            existingsitelist_prefixes.Purchas=formdata.Purchas;
            existingsitelist_prefixes.PurchaseReturn=formdata.PurchaseReturn;
            existingsitelist_prefixes.Sales=formdata.Sales;
            existingsitelist_prefixes.SalesReturn=formdata.SalesReturn;
            existingsitelist_prefixes.Supplier=formdata.Supplier;
            existingsitelist_prefixes.item=formdata.item;
            await existingsitelist_prefixes.save();
        }
        else{

            const insertData = await sitelist_prefixes.insertMany(formdata)
        }
        
        
        return NextResponse.json({ message: "Document created successfully", alert:true}, { status: 200 });
    } catch (err) {
        console.error("Error occurred while creating document:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function PUT(req: Request) {
    try {
        await connectDB();
        const siteListFound = await sitelist_prefixes.find();
        return NextResponse.json({ data: siteListFound }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}


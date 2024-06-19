import mongoose from "mongoose";
import sitelist_sales from "@/app/mongoose/models/sitelist_Sales"; 
import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        await connectDB();
        const {formdata} = await req.json();
        const existingsitelist = await sitelist_sales.findOne();
        if (existingsitelist) {
            existingsitelist.defaultDiscount = formdata.defaultDiscount;
            existingsitelist.showPaidAmount=formdata.showPaidAmount;
            existingsitelist.showUpiCode=formdata.showUpiCode;
            existingsitelist.invoiceFormat=formdata.invoiceFormat;
            existingsitelist.footerText=formdata.footerText;
            existingsitelist.termsAndcondition=formdata.termsAndcondition;
            await existingsitelist.save();
        }
        else{

            const insertData = await sitelist_sales.insertMany(formdata)
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
        const siteListFound = await sitelist_sales.find();
        return NextResponse.json({ data: siteListFound }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}


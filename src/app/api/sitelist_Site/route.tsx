import mongoose from "mongoose";
import sitelist from "@/app/mongoose/models/Sitelist_Site"; // Assuming Sitelist is a Mongoose model
import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        await connectDB();
        const {formdata} = await req.json();
        const existingsitelist = await sitelist.findOne();
        if (existingsitelist) {
            existingsitelist.siteName = formdata.siteName;
            existingsitelist.currency=formdata.currency;
            existingsitelist.dateFormat=formdata.dateFormat;
            existingsitelist.enableRoundOff=formdata.enableRoundOff;
            existingsitelist.disableTax=formdata.disableTax;
            existingsitelist.language=formdata.language;
            await existingsitelist.save();
        }
        else{

            const insertData = await sitelist.insertMany(formdata)
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
        const siteListFound = await sitelist.find();
        if(siteListFound){

            return NextResponse.json({ data: siteListFound }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}


import { connectDB } from "@/app/mongoose/db";
import TaxList from "@/app/mongoose/models/TaxList";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { data } = await req.json();
        const taxId=uuidv4();
        data.taxId=taxId;
        

        // Create a new tax record using the TaxList model
        const newTax=await TaxList.create(data);

        // Return a successful response
        return NextResponse.json({ message: "done",taxListData:newTax }, { status: 201 });
    } catch (error) {
        console.error("Error saving tax data:", error);

        // Return an error response
        return NextResponse.json({ error: "Failed to save the tax data" }, { status: 500 });
    }
}
export async function PUT(req: Request) {
    try {
        await connectDB();
        const siteListFound = await TaxList.find();
        return NextResponse.json({ data: siteListFound }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

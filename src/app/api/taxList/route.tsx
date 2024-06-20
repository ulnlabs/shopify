import { connectDB } from "@/app/mongoose/db";
import TaxList from "@/app/mongoose/models/TaxList";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export async function PUT(req: Request) {
    try {
        await connectDB();
        const { taxId, taxName, taxPercentage, taxStatus } = await req.json();
        
        if (!taxId) {
            return NextResponse.json({ error: "Tax ID is required" }, { status: 400 });
        }

        const updateFields: any = {};
        if (taxStatus !== undefined) updateFields.taxStatus = taxStatus;
        if (taxName !== undefined) updateFields.taxName = taxName;
        if (taxPercentage !== undefined) updateFields.taxPercentage = taxPercentage;

        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ error: "No fields to update" }, { status: 400 });
        }

        const updatedTax = await TaxList.findOneAndUpdate(
            { taxId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedTax) {
            return NextResponse.json({ error: "Tax not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Tax updated successfully", updatedTax }, { status: 200 });
    } catch (error) {
        console.error("Error updating tax:", error);
        return NextResponse.json({ error: "Failed to update the tax" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const { data } = await req.json();
        const taxId=uuidv4();
        data.taxId=taxId;
        
        const newTax=await TaxList.create(data);

        return NextResponse.json({ message: "done",taxListData:newTax }, { status: 201 });
    } catch (error) {
        console.error("Error saving tax data:", error);

        // Return an error response
        return NextResponse.json({ error: "Failed to save the tax data" }, { status: 500 });
    }
}
export async function GET(req: Request) {
    try {
        await connectDB();
        const siteListFound = await TaxList.find();
        return NextResponse.json({ data: siteListFound }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}
export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { taxId } = await req.json();

        if (!taxId) {
            return NextResponse.json({ error: "Tax ID is required" }, { status: 400 });
        }

        const deletedTax = await TaxList.findOneAndDelete({ taxId });

        if (!deletedTax) {
            return NextResponse.json({ error: "Tax not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Tax deleted successfully", data: deletedTax }, { status: 200 });
    } catch (error) {
        console.error("Error deleting tax:", error);
        return NextResponse.json({ error: "Failed to delete the tax" }, { status: 500 });
    }
}

import { connectDB } from "@/app/mongoose/db";
import TaxList from "@/app/mongoose/models/TaxList";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export async function PUT(req: Request) {
    try {
        await connectDB();
        const { taxId, taxName, taxPercentage, taxStatus, header } = await req.json();
        if (header === "sales-pur") {
            const taxListFound = await TaxList.find({ taxStatus: true });
            console.log(taxListFound);

            return NextResponse.json(taxListFound, { status: 200 });
        }

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
        console.log("done");

        const { data } = await req.json();
        console.log(data);

        /*  const taxId = uuidv4();
         data.taxId = taxId; */

        const newTax = await TaxList.create(data);
        console.log(newTax);


        return NextResponse.json({ message: "done", taxListData: newTax }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        if (error.code === 11000)
            return NextResponse.json({ error: "Tax Already exist" }, { status: 500 });
        else {
            return NextResponse.json({ error: "Error Saving tax" }, { status: 500 });
        }
    }
}
export async function GET(req: Request) {
    try {
        await connectDB();
        console.log("done loading");

        const siteListFound = await TaxList.find().lean();
        const modified = siteListFound.map((item: any) => {
            return {
                ...item,
                value: (item.taxName + item.taxPercentage)

            }
        })
        console.log(modified);

        return NextResponse.json(modified, { status: 200 });
    } catch (error: any) {
        console.log(error);

        return NextResponse.json({ error: "Error fetching tax" }, { status: 500 });

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

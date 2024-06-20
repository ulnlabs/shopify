import { connectDB } from "@/app/mongoose/db";
import UnitList from "@/app/mongoose/models/UnitList";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export async function PUT(req: Request) {
    try {
        await connectDB();
        const { unitId, unitName, unitDescription, unitStatus } = await req.json();
        
        if (!unitId) {
            return NextResponse.json({ error: "unit ID is required" }, { status: 400 });
        }

        const updateFields: any = {};
        if (unitStatus !== undefined) updateFields.unitStatus = unitStatus;
        if (unitName !== undefined) updateFields.unitName = unitName;
        if (unitDescription !== undefined) updateFields.unitDescription = unitDescription;

        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ error: "No fields to update" }, { status: 400 });
        }

        const updatedunit = await UnitList.findOneAndUpdate(
            { unitId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedunit) {
            return NextResponse.json({ error: "unit not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "unit updated successfully", updatedunit }, { status: 200 });
    } catch (error) {
        console.error("Error updating unit:", error);
        return NextResponse.json({ error: "Failed to update the unit" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const { data } = await req.json();
        const unitId=uuidv4();
        data.unitId=unitId;
        
        const newunit=await UnitList.create(data);

        return NextResponse.json({ message: "done",unitListData:newunit }, { status: 201 });
    } catch (error) {
        console.error("Error saving unit data:", error);

        return NextResponse.json({ error: "Failed to save the unit data" }, { status: 500 });
    }
}
export async function GET(req: Request) {
    try {
        await connectDB();
        const siteListFound = await UnitList.find();
        return NextResponse.json({ data: siteListFound }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}
export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { unitId } = await req.json();

        if (!unitId) {
            return NextResponse.json({ error: "unit ID is required" }, { status: 400 });
        }

        const deletedunit = await UnitList.findOneAndDelete({ unitId });

        if (!deletedunit) {
            return NextResponse.json({ error: "unit not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "unit deleted successfully", data: deletedunit }, { status: 200 });
    } catch (error) {
        console.error("Error deleting unit:", error);
        return NextResponse.json({ error: "Failed to delete the unit" }, { status: 500 });
    }
}

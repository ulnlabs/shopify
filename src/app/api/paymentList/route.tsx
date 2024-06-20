import { connectDB } from "@/app/mongoose/db";
import PaymentList from "@/app/mongoose/models/PaymentList";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export async function PUT(req: Request) {
    try {
        await connectDB();
        const { paymentId, paymentName, paymentStatus } = await req.json();

        if (!paymentId) {
            return NextResponse.json({ error: "payment ID is required" }, { status: 400 });
        }

        const updateFields: any = {};
        if (paymentStatus !== undefined) updateFields.paymentStatus = paymentStatus;
        if (paymentName !== undefined) updateFields.paymentName = paymentName;

        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ error: "No fields to update" }, { status: 400 });
        }

        const updatedpayment = await PaymentList.findOneAndUpdate(
            { paymentId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedpayment) {
            return NextResponse.json({ error: "payment not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "payment updated successfully", updatedpayment }, { status: 200 });
    } catch (error) {
        console.error("Error updating payment:", error);
        return NextResponse.json({ error: "Failed to update the payment" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const { data } = await req.json();
        const paymentId = uuidv4();
        data.paymentId = paymentId;
        const newpayment = await PaymentList.create(data);

        return NextResponse.json({ message: "done", PaymentListData: newpayment }, { status: 201 });
    } catch (error) {
        console.error("Error saving payment data:", error);

        return NextResponse.json({ error: "Failed to save the payment data" }, { status: 500 });
    }
}
export async function GET(req: Request) {
    try {
        await connectDB();
        const siteListFound = await PaymentList.find();
        return NextResponse.json({ data: siteListFound }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}
export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { paymentId } = await req.json();

        if (!paymentId) {
            return NextResponse.json({ error: "payment ID is required" }, { status: 400 });
        }

        const deletedpayment = await PaymentList.findOneAndDelete({ paymentId });

        if (!deletedpayment) {
            return NextResponse.json({ error: "payment not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "payment deleted successfully", data: deletedpayment }, { status: 200 });
    } catch (error) {
        console.error("Error deleting payment:", error);
        return NextResponse.json({ error: "Failed to delete the payment" }, { status: 500 });
    }
}

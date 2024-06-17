// pages/api/company.js

import { connectDB } from "@/app/mongoose/db";
import companyDetail from "@/app/mongoose/models/companyProfile";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const companydetails = await companyDetail.find();
        return NextResponse.json({ data: companydetails }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export async function PUT(req:Request) {
    try {
        await connectDB();
        const { data } = await req.json();
        const updatedCompany = await companyDetail.findOneAndUpdate(
            { _id: data.id },
            {
                companyName: data.companyName,
                mobile: data.mobile,
                address: data.address,
                state: data.state,
                postalcode: data.postalcode,
                city: data.city,
                country: data.country,
                panNo: data.panNo,
                bankdetails: data.bankdetails,
                vatNo: data.vatNo,
                gstNo: data.gstNo,
                email: data.email
            },
            { new: true }
        );

        return NextResponse.json({ message: "Data updated successfully", data: updatedCompany }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error updating data" }, { status: 500 });
    }
}

export async function POST(req:Request) {
    await connectDB();
    try {
        const { data } = await req.json();
        const company = new companyDetail({
            companyName: data.companyName,
            mobile: data.mobile,
            address: data.address,
            state: data.state,
            postalcode: data.postalcode,
            city: data.city,
            country: data.country,
            panNo: data.panNo,
            bankdetails: data.bankdetails,
            vatNo: data.vatNo,
            gstNo: data.gstNo,
            email: data.email
        });
        const save = await company.save();

        return NextResponse.json({ message: "Data saved successfully", alert: true }, { status: 200 });
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ message: "Error saving data" }, { status: 500 });
    }
}

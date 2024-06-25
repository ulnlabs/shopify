// pages/api/company.js

import { connectDB } from "@/app/mongoose/db";
import companyDetail from "@/app/mongoose/models/companyProfile";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        await connectDB();
        const companydetails = await companyDetail.find();
        return NextResponse.json({ data: companydetails }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const {formData} = await req.json();

        const existingCompany = await companyDetail.findOne();
        
        if (existingCompany) {
            existingCompany.companyName = formData.companyName;
            existingCompany.mobile = formData.mobile;
            existingCompany.address = formData.address;
            existingCompany.state = formData.state;
            existingCompany.postalcode = formData.postalcode;
            existingCompany.city = formData.city;
            existingCompany.country = formData.country;
            existingCompany.panNo = formData.panNo;
            existingCompany.bankdetails = formData.bankdetails;
            existingCompany.vatNo = formData.vatNo;
            existingCompany.gstNo = formData.gstNo;
            existingCompany.email = formData.email;
            
            await existingCompany.save();
        } else {
      
            const companydetails = await companyDetail.insertMany(formData)
        }

        return NextResponse.json({ message: "Data saved successfully", alert: true }, { status: 200 });
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ message: "Error saving data" }, { status: 500 });
    }
}

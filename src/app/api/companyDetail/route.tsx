import { connectDB } from "@/app/mongoose/db";
import companyDetail from "@/app/mongoose/models/companyProfile";
import { NextResponse } from "next/server";


export async function PUT(req: Request) {
    await connectDB();
    try {


        const Userdata = await companyDetail.find()


        return NextResponse.json(Userdata, { status: 200 })
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data"  }, { status: 500 });
    }

}



export async function POST(req: Request) {
    await connectDB();
    try {
        const { data } = await req.json();

        const existingCompany = await companyDetail.findOne({ companyName: data.companyName });
       
        

        if (existingCompany) {
            await companyDetail.updateOne({ }, { $set: data });
            console.log("Updated existing document for company:", data.companyName);
        } else {
            await companyDetail.create(data);
            console.log("Created new document for company:", data.companyName);
        }

        return NextResponse.json({ message: "Data saved successfully", alert: true }, { status: 200 });

    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ message: "Error saving data" }, { status: 500 });
    }
}






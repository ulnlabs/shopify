import { connectDB } from "@/app/mongoose/db";
import SiteSales from "../../mongoose/models/SiteSales";
import { NextResponse } from "next/server";


export async function PUT(req:any){
    await connectDB();
    try {
        const Userdata = await SiteSales.find()
        return NextResponse.json(Userdata, { status: 200 })
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data"  }, { status: 500 });
    }
}

export async function POST(req:any) {

    await connectDB();
    try {
        const { data } = await req.json();
            await SiteSales.create(data);
            return NextResponse.json({ message: "Data saved successfully" ,alert:true }, { status: 200 });
        
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ message: "Error saving data" }, { status: 500 });
    }
}
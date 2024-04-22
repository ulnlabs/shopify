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
        const { data,edit } = await req.json();
        if(edit==true){
        
            await companyDetail.updateMany({},{ $set: data },{new:true });
    
            return NextResponse.json({ message: "Data saved successfully" ,alert:true }, { status: 200 });
        }
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ message: "Error saving data" }, { status: 500 });
    }
}

import { connectDB } from "@/app/mongoose/db";
import siteList from "../../mongoose/models/siteList";
import { NextResponse } from "next/server";


// export async function PUT(req) {
//     await connectDB();
//     try {


//         const Userdata = await Site.find()


//         return NextResponse.json(Userdata, { status: 200 })
//     }
//     catch (error) {
//         console.log(error);
//         return NextResponse.json({ message: "Error fetching data"  }, { status: 500 });
//     }

// }



export async function POST(req) {
    await connectDB();
    try {
        const { data } = await req.json();

        const existingCompany = await siteList.findOne({ siteName: data.siteName });
       
        

        if (existingCompany) {
            await siteList.updateOne({ }, { $set: data });
            console.log("Updated existing document for company:", data.siteName);
        } else {
            await siteList.create(data);
            console.log("Created new document for company:", data.siteName);
        }

        return NextResponse.json({ message: "Data saved successfully", alert: true }, { status: 200 });

    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ message: "Error saving data" }, { status: 500 });
    }
}






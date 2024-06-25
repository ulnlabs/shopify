import { connectDB } from "@/app/mongoose/db";
/* import siteDetails from "@/app/mongoose/models/Site";
 */import { NextResponse } from "next/server";

export async function PUT(req:Request){
   /*  await connectDB();
    const details=await siteDetails.find()
    if(details){
        return NextResponse.json(details,{status:200})
    } */
    return NextResponse.json({message:"DataNot Found"},{status:400})
}
export async function POST(req:Request){
    return NextResponse.json({})
}
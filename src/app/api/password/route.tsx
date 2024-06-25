// pages/api/password.js

import {connectDB} from "@/app/mongoose/db";
import Userpassword from "@/app/mongoose/models/password";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  try {
    await connectDB();
    console.log("Connected to database");
    const { currentPassword, newPassword, confirmPassword} = await req.json();
        
      
    if (newPassword !== confirmPassword) {
        return NextResponse.json({ message: "New password and confirm password do not match" }, { status: 400 });
      }

    const getcurrentpassword= await Userpassword.findOne({ currentPassword :{$eq:currentPassword} });

    if(getcurrentpassword){
    
        
        getcurrentpassword.currentPassword = confirmPassword;
        await getcurrentpassword.save();
    }


    return NextResponse.json({ message: "Password change process completed",alert: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 });
  }
}

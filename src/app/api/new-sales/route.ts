import { log } from "console";
import { NextResponse } from "next/server";

export async function POST(req:any, res:any) {

  try {
    let data = await req.json();
    console.log(data);
    
    return NextResponse.json("success", data);
  
  } catch (err) { log("error",err) }

}
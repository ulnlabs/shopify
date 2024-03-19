import { NextResponse } from "next/server"
import { connectMongoDB } from "../../../../mongo";
import customerDB from "@/modals/customer";
export async function GET():Promise<NextResponse<customerList[]>>{

  console.log("api/customer");
  try {
  await  connectMongoDB()
 await customerDB.create({file_name:"jking"})
  
  } catch (error) {
    
  }
  
const data:customerList[]=[
    {
        cid: "1234",
        name: "jking",
        mobile: "2222",
        email: "jk@gmail.com",
       
        paid: 500,
        status: "active",
        returndue: 0,
        salesdue: "0",
      }, {
        cid: "1234",
        name: "jking",
        mobile: "as;kjhkjsdf",
        email: "ak@gmail.com",
       
        paid: 500,
        status: "active",
        returndue: 0,
        salesdue: "0",
      } ,{
        cid: "1234",
        name: "jking",
        mobile: "as;kjhkjsdf",
        email: "sk@gmail.com",
       
        paid: 500,
        status: "active",
        returndue: 0,
        salesdue: "0",
      }
]
return NextResponse.json(data)
}
import { NextResponse } from "next/server"

export async function GET():Promise<NextResponse<customerList[]>>{

  console.log("api/customer");
  
const data:customerList[]=[
    {
        cid: "1234",
        name: "jking",
        mobile: "as;kjhkjsdf",
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
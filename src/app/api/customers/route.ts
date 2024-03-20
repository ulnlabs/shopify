import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";
import { customerModel } from "@/app/mongoose/models/customer";
export const POST = async (req: Request) => {
  const request = await req.json();
  console.log(request);
  
  try {
    if (request) {
      await connectDB();
      await customerModel.create(request);

      return NextResponse.json({ message: "true" });
    }
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ message: "error with connection db ", error });
  }
  return NextResponse.json({ message: "interanl server error" });
};

export const GET = async (req:Request) => {
  console.log("get customers");
  const header=req.headers.get("data")
  try {
    await connectDB();
if(header==="doc-count"){
  const response = await customerModel.find({},{id:1,_id:0})
  if(response.length){
    console.log(response);


    let array:any[] | number=response.sort()
    array=array.map(({id})=>id)
    console.log(array);
    
    for(let i=0;i<array.length;i++){
      console.log("array zero",array[0]);
      
     if(array[0]!=1){
      console.log(true);
      
      return NextResponse.json({id:1});
    } 
    const nextValue=array[i+1]
    if(nextValue!=array[i]+1){
      console.log(nextValue);
      
      return NextResponse.json({id:array[i]+1});
    
    
    }
    
    
    
    
    }
  }
  else{
    
    return NextResponse.json({id:1});
  }



  

return NextResponse.json(response);

}
else if(header==='get-data'){

  const response = await customerModel.find();

  return NextResponse.json(response);
}
  } catch (error) {
    return NextResponse.json({ message: "error with connection db ", error });
  }
};

export const DELETE= async (req: Request) => {
  const { id } = await req.json();
  try {
    if (id) {
      await connectDB();
      const response = await customerModel.deleteOne({ _id: id });
      if (response.acknowledged == true) {
        return NextResponse.json({ message: "customer deleted successfully" });
      }
      return NextResponse.json({ message: "customer not found" });
    }
  } catch (error) {
    return NextResponse.json({ message: "error with connecting database" });
  }

  return NextResponse.json({ message: "interanl server error" });
};

import { connectDB } from "@/app/mongoose/db";
import { NextResponse } from "next/server";
import { customerModel } from "@/app/mongoose/models/customer";
export const POST = async (req: Request) => {
  const request = await req.json();
  const header = req.headers.get("data");

  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
  try {
    if (header === "importcustlist") {
      const objectFilter = request.filter(
        (item: any) => (item.name || item.Name) && (item.mobile || item.Mobile)
      );
      const getId = await customerModel.find({}, { id: 1, _id: 0 });
      let arrayIndexId: any[] | number;
      if (getId.length) {
        arrayIndexId = getId.sort();
        arrayIndexId = arrayIndexId.map(({ id }) => id);
        arrayIndexId = arrayIndexId.pop();
        arrayIndexId = Number(arrayIndexId) + 1;
      } else {
        arrayIndexId = 1;
      }

      const objectCreate = objectFilter.map((i: any, index: any) => {
        let nameVal = i.name || i.Name;
        let idVal: any = arrayIndexId + index;
        return {
          name: nameVal,
          id: idVal,
          mobile: i.mobile || i.Mobile,
          email: i.email || i.Email,
          gst: i.gst || i.Gst || "-",
          tax: i.tax || i.Tax || "-",
          pincode: i.pincode || i.Pincode || "-",
          address: i.address || i.Address || "-",
          city: i.city || i.City || "-",
          state: i.state || i.State || "-",
          due: i.due || i.Due || "-",
        };
      });
      await customerModel.insertMany(objectCreate);

      return NextResponse.json({ message: "data Uploaded" });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
  if (header == "addcust") {
    try {
      if (request) {
        await customerModel.create(request);

        return NextResponse.json({ message: "true" });
      }
    } catch (error) {
      console.log(error);

      return NextResponse.json({ message: "error with connecting db ", error });
    }
  }
  return NextResponse.json({ message: "unauthenticated" }, { status: 401 });
};

export const GET = async (req: Request) => {
  console.log("get customers");
  const header = req.headers.get("data");
  try {
    await connectDB();
    if (header === "doc-count") {
      const response = await customerModel.find({}, { id: 1, _id: 0 });
      if (response.length) {
        console.log(response);

        let array: any[] | number = response.sort();
        array = array.map(({ id }) => id);
        console.log(array);

        for (let i = 0; i < array.length; i++) {
          console.log("array zero", array[0]);

          if (array[0] != 1) {
            console.log(true);

            return NextResponse.json({ id: 1 });
          }
          const nextValue = array[i + 1];
          if (nextValue != array[i] + 1) {
            console.log(nextValue);

            return NextResponse.json({ id: array[i] + 1 });
          }
        }
      } else {
        return NextResponse.json({ id: 1 });
      }

      return NextResponse.json(response);
    } else if (header === "get-data") {
      const response = await customerModel.find();

      return NextResponse.json(response);
    }
  } catch (error) {
    return NextResponse.json({ message: "error with connection db ", error });
  }
};

export const DELETE = async (req: Request) => {
console.log("api/customers/delete");

  const header=req.headers.get("data")
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
if(header=="deleterow"){
  const id=await req.json()
  try {
    const response=await customerModel.deleteMany({_id:{$in:id}})
    if(response){
      console.log(response);
      
      return NextResponse.json({ message: "customer(s) deleted successfully" });

    }
  } catch (error) {
    return NextResponse.json({ message: "An error occured " },{status:501});
    
  }
 
  
}
  
  /* try {
    const { id } = await req.json();
    if (id) {
      const response = await customerModel.deleteOne({ _id: id });
      if (response.acknowledged == true) {
        return NextResponse.json({ message: "customer deleted successfully" });
      }
      return NextResponse.json({ message: "customer not found" });
    }
  } catch (error) {
    return NextResponse.json({ message: "error with connecting database" });
  } */

  return NextResponse.json({ message: "interanl server error" });
};

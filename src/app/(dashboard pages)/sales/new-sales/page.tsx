"use client"
import NewSales from "@/app/components/sales-pur/addnew";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { FormState } from "../../../../../global";
import axios from "axios";
import { useAnimation } from "framer-motion";
import { ContextData } from "../../../../../contextapi";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import { useSession } from "next-auth/react";
const page = () => {


  const { stocks: item, customerDetails, setSalesRecord } = useContext(ContextData)
  const { data: session } = useSession();

  console.log(session?.user?.username);

  console.log(customerDetails);
  const router = useRouter();



  const [inputItem, setInputItem] = useState<String>("");
  const [product, setProduct] = useState<any>([])


  useEffect(() => {
    setProduct(item?.filter((item: any) => {


      return (inputItem === "" ? true : item.itemName?.toLowerCase().includes(inputItem.toLowerCase()) || inputItem === "" ? true : item.itemCode?.toLowerCase().includes(inputItem.toLowerCase()))
    }
    ))
  }, [inputItem])




  const [salesData, setSalesData] = useState<FormState>({
    customerName: "",
    customerId: 0,
    billDate: new Date,
    billQuantity: 0,
    billReturnQuantity: 0,
    billCharges: 0,
    billTaxType: "",
    billDiscount: 0,
    billDiscountType: "",
    billNote: "",
    billSubtotal: 0,
    billOtherCharge: 0,
    billOverallDis: 0,
    billTotal: 0,
    billPaymentType: "",
    billAmount: 0,
    createdBy: session?.user?.username ? session.user?.username : "Guest",
  })

  const controls = useAnimation();


  const handleClick = async () => {
    await controls.start({ y: 0, transition: { duration: 0.5, ease: "easeOut" } });

    // Scroll to top after animation completes
    window.scrollTo({ top: 0, behavior: "smooth" });



    if (salesData.customerName && itemList.length > 0 && salesData.billPaymentType) {


      try {
        const { data, status } = await axios.post("/api/sales", {
          header: "sales",
          data: {
            sales: salesData,
            items: itemList,
            status: "Sold"
          }
        })
        console.log("dataItem", data);
        if (status === 200) {
          setSalesRecord(data);
          router.push("/sales/invoice")
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      alert("Please Fill All The Field");

    }
  }


  const [cus, setCus] = useState<any>("");
  useEffect(() => {
    console.log(item.name);
    customerDetails &&
      setCus(customerDetails?.filter((item: any) => {
        console.log(customerDetails);
        console.log(item.name, item.id, item.mobile);


        return (item.name.toLowerCase().includes(salesData.customerName.toLowerCase()) || item.id.toString().includes(salesData.customerName) || item.mobile.toLowerCase().includes(salesData.customerName.toLowerCase()))
      })
      )
  }, [salesData.customerName])
  console.log(cus);



  const [itemList, setItemList] = useState<any>([]);
  console.log(salesData.customerId);


  return (
    <div className="w-full relative ">
      <DashboardHeader title="Sales" subtitle={"new"} />
      <NewSales
        placeholder="Search Customer"
        data={salesData}
        setData={setSalesData}
        inputItem={inputItem}
        setInputItem={setInputItem}
        Items={product}
        customerData={cus}
        isSales={true}
        itemList={itemList}
        setItemList={setItemList}
      />
      <div className="flex justify-center pt-5 pb-10 gap-10">
        <button onClick={handleClick} type="button" className="w-20 py-2 bg-primary-save rounded-md text-white">Save</button>
        <Link href={"/dashboard"} className="w-20 py-2 text-center bg-primary-close rounded-md text-white">Close</Link>
      </div>



    </div>
  );
};
export default page;

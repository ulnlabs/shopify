"use client"
import NewSales from "@/app/components/sales-pur/addnew";
import { useReturn } from "@/app/components/sales-pur/returnContext";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ContextData } from "../../../../../contextapi";



interface FormState {
  customerName: string,
  billDate: Date,
  billStatus: string,
  billQuantity: number,
  billCharges: any,
  billTaxType: string,
  billDiscount: any,
  billDiscountType: string,
  billNote: string,
  billSubtotal: number,
  billOtherCharge: number,
  billOverallDis: number
  billTotal: number,
  billPaymentType: string,
  billAmount: any,

}

const page = () => {

  const { salesRecord } = useContext(ContextData);
  console.log("jkj", salesRecord);

  const { c_name, items, paymentType } = salesRecord;


  const [salesReturnData, setSalesReturnData] = useState<FormState>({
    customerName: c_name,
    billDate: new Date,
    billStatus: "Returned",
    billQuantity: 0,
    billCharges: 0,
    billTaxType: "",
    billDiscount: 0,
    billDiscountType: "",
    billNote: "",
    billSubtotal: 0,
    billOtherCharge: 0,
    billOverallDis: 0,
    billTotal: 0,
    billPaymentType: paymentType,
    billAmount: 0,
  })

  console.log(paymentType);
  

  const handleClick = () => {


    console.log(salesReturnData);
  }
  const customerName = [
    {
      value: "Fire10",
      label: "Fire10",
    },
    {
      value: "deepath",
      label: "Deepath",
    },
    {
      value: "deepak",
      label: "Deepak",
    },
    {
      value: "999",
      label: "Dhilip",
    },
  ]

  const [cus, setCus] = useState<any>("");

  useEffect(() => {
    setCus(customerName.filter((item: any) => {
      return salesReturnData.customerName === "" ? true : item.value.toLowerCase().includes(salesReturnData.customerName.toLowerCase())
    })
    )

  }, [salesReturnData.customerName])

  const [item, setItem] = useState<any>([]);

  const [inputItem, setInputItem] = useState<String>("");
  const [product, setProduct] = useState<any>([])
  useEffect(() => {
    const fetchItem = async () => {

      const response = await axios.put("/api/sales",
        {
          data: { header: "getItems" }

        },);
      setItem(response.data)
      console.log(response.data);
    }
    fetchItem();
  }, []);


  useEffect(() => {
    setProduct(item?.filter((item: any) => {
      console.log("open");

      return inputItem === "" ? true : item.itemName?.toLowerCase().includes(inputItem.toLowerCase())
    }
    ))
  }, [inputItem])

  console.log(items);

  useEffect(()=>{
    setItemList(items)
  },[items])

  const [itemList, setItemList] = useState<any>([]);

  

  return (
    <div className="w-full ">
      <h1 className="px-10 pt-5 ">New Sales Return</h1>

      <NewSales
        placeholder="Search Customer"
        data={salesReturnData}
        setData={setSalesReturnData}
        inputItem={inputItem}
        setInputItem={setInputItem}
        Items={product}
        customerData={cus}
        isSales={true}
        itemList={itemList}
        setItemList={setItemList}
        isReturn
        searchPlaceholder="Search Sales Code"


      />      <div className="flex justify-center pt-5 pb-10 gap-10">
        <button onClick={handleClick} type="button" className="w-20 py-2 bg-primary-save rounded-md text-white">Save</button>
        <Link href={"/dashboard"} className="w-20 py-2 text-center bg-primary-close rounded-md text-white">Close</Link>
      </div>
    </div>
  );
};
export default page;

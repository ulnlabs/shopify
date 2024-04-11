"use client"
import NewSales from "@/app/components/sales-pur/addnew";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from 'swr'
import { FormState } from "@/app/components/sales-pur/global";
import axios from "axios";

const page = () => {


  const [purchaseData, setPurchaseData] = useState<FormState>({
    customerName: "",
    billDate: new Date,
    billStatus: "",
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
    billPaymentType: "",
    billAmount: 0,
  })

  const getItems = async () => {
    const res = await axios.get("/api/purchase");
    const data = await res.data;
    console.log(data);

    return data;
  }
  const [inputItem, setInputItem] = useState<any>("");

  const { data: Items, error: itemError } = useSWR("/api/purchase", getItems)
  console.log(Items);
  useEffect(() => {
    setProduct(Items ? Items.filter((item: any) => {
      return inputItem === "" ? true : item.itemName.toLowerCase().includes(inputItem.toLowerCase())
    })
      : [])
  }, [inputItem])
  const [product, setProduct] = useState<any>();
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
      return purchaseData.customerName === "" ? true : item.value.toLowerCase().includes(purchaseData.customerName.toLowerCase())
    })
    )

  }, [purchaseData.customerName])


  /*  const Items = [
     {
 
       name: "Deepath",
       quantity: 10,
       price: 200,
       discount: 0,
       tax_type: "VAT 5%",
       tax: 10,
       tax_category: "Exclusive",
       dis_type: "Fixed",
       taxPer: 5,
       unitcost: 200,
       subtotal: 210,
     },
     {
 
       name: "fire10",
       quantity: 5,
       price: 200,
       discount: 0,
       tax_type: "VAT 5%",
       tax: 10,
       taxPer: 5,
       tax_category: "Exclusive",
       dis_type: "Fixed",
       unitcost: 200,
       subtotal: 210,
     },
     {
 
       name: "dhilip",
       quantity: 2,
       price: 200,
       discount: 0,
       tax_type: "VAT 5%",
       dis_type: "Fixed",
       tax: 10,
       taxPer: 5,
       unitcost: 200,
       subtotal: 210,
       tax_category: "Exclusive",
     }
   ]
 
  */

  const [itemList, setItemList] = useState<any>([]);



  const handleClick = () => {
    console.log(purchaseData);
    console.log(itemList);


  }


  return (
    <div className="w-full ">
      <h1 className="px-10 pt-5 ">New Purchase</h1>

      <NewSales
        isSales={false}
        placeholder="Search Customer"
        data={purchaseData}
        setData={setPurchaseData}
        inputItem={inputItem}
        setInputItem={setInputItem}
        Items={product}
        customerData={cus}
        itemList={itemList}
        setItemList={setItemList}
      />
      <div className="flex justify-center pt-5 pb-10 gap-10">
        <button onClick={handleClick} type="button" className="w-20 py-2 bg-primary-save rounded-md text-white">Save</button>
        <Link href={"../../dashboard"} className="w-20 py-2 text-center bg-primary-close rounded-md text-white">Close</Link>
      </div>
    </div>
  );
};
export default page;
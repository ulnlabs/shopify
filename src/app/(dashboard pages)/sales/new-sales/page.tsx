"use client"
import NewSales from "@/app/components/sales-pur/addnew";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  item:{
    name: string[],
    quantity: number[],
    price:number[],
    discount: number[],
    tax: number[],
    subtotal: number[],

  }



}

const page = () => {


  const [salesData, setSalesData] = useState<FormState>({
    customerName: "",
    billDate: new Date,
    billStatus: "",
    billQuantity: 0,
    billCharges: 0,
    billTaxType: "",
    billDiscount: 0,
    billDiscountType: "",
    billNote: "",
    billSubtotal: 100000000,
    billOtherCharge: 0,
    billOverallDis: 0,
    billTotal: 0,
    billPaymentType: "",
    billAmount: 0,
    item:{
      name:[] ,
      quantity: [],
      price:[],
      discount: [],
      tax: [],
      subtotal: [],
    }
  })

  const handleClick = async () =>{
      setSalesData({...salesData,item:{...,name:"value"}})
     console.log(salesData);
     
   
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
      value: "999",
      label: "Dhilip",
    },
  ]

  const [cus,setCus] = useState<any>("");
   
  useEffect(()=>{
    setCus(customerName.filter((item:any) => {
      return salesData.customerName === "" ? true : item.value.toLowerCase().includes(salesData.customerName.toLowerCase())
    })
    )
    
  },[salesData.customerName])

  



  const [items,setItems] = useState<any>("");
  const Items = [
    {
      name: 'Customer',
      value: 'Customer'
    },
    {
      name: 'Customer 1',
      value: 'Customer 1'
    },
     {
      name: 'Customer 2',
      value: 'Customer 2'
    },
     {
      name: 'Customer 3',
      value: 'Customer 3'
    },
    {
      name: 'Cuomer 3',
      value: '32325 3'
    }
  ]


  const [newItem,setNewItem] = useState<any>("");


  useEffect(()=>{
    setNewItem(Items.filter((item:any) => {
      return items === "" ? true : item.value.toLowerCase().includes(items.toLowerCase())
    })
    )
    
  },[items])

  return (
    <div className="w-full ">
      <h1 className="px-10 pt-5 ">New Sales</h1>

      <NewSales data={salesData} setData={setSalesData} item={items} Items={newItem} setItem={setItems} customerData={cus} placeholder="Search Customer" isSales={true} />
      <div className="flex justify-center pt-5 pb-10 gap-10">
        <button onClick={handleClick} type="button" className="w-20 py-2 bg-primary-save rounded-md text-white">Save</button>
        <Link href={"../../dashboard"} className="w-20 py-2 text-center bg-primary-close rounded-md text-white">Close</Link>
      </div>
    </div>
  );
};
export default page;

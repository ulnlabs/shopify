"use client"
import NewSales from "@/app/components/sales/addnew";
import Link from "next/link";
import { useState } from "react";

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
  billPayNote: string,


}

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
    billSubtotal: 100000000,
    billOtherCharge: 0,
    billOverallDis: 0,
    billTotal: 0,
    billPaymentType: "",
    billAmount: 0,
    billPayNote: "",
  })

  const handleClick = () =>{
    console.log(purchaseData);  
  }


  return (
    <div className="w-full ">
      <h1 className="px-10 pt-5 ">New Purchase</h1>

      <NewSales data={purchaseData} setData={setPurchaseData} placeholder="Select Supplier" isSales={false} />
      <div className="flex justify-center pt-5 pb-10 gap-10">
        <button onClick={handleClick} type="button" className="w-20 py-2 bg-primary-save rounded-md text-white">Save</button>
        <Link href={"../../dashboard"} className="w-20 py-2 text-center bg-primary-close rounded-md text-white">Close</Link>
      </div>
    </div>
  );
};
export default page;
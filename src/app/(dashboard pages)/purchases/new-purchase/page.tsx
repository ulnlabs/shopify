"use client"
import NewSales from "@/app/components/sales-pur/addnew";
import Link from "next/link";
import { useState, useEffect } from "react";

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
    billTaxType: "none",
    billDiscount: 0,
    billDiscountType: "none",
    billNote: "",
    billSubtotal: 0,
    billOtherCharge: 0,
    billOverallDis: 0,
    billTotal: 0,
    billPaymentType: "",
    billAmount: 0,
    billPayNote: "",
  })

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

  const [inputItem, setInputItem] = useState<any>("");

  const Items = [
    {

      name: "Deepath",
      quantity: 10,
      price: 200,
      discount: 10,
      tax_type: "tax 15",
      tax: 20,
      unitcost: 200,
      subtotal: 10,
    },
    {

      name: "fire10",
      quantity: 5,
      price: 200000000,
      discount: 10,
      tax_type: "tax 15",
      tax: 20,
      unitcost: 200,
      subtotal: 10,
    },
    {

      name: "dhilip",
      quantity: 2,
      price: 200000000,
      discount: 10,
      tax_type: "tax 15",
      tax: 20,
      unitcost: 200,
      subtotal: 10,
    }
  ]

  const [product, setProduct] = useState<any>("")
  const [itemList, setItemList] = useState<any>([]);
  useEffect(() => {
    setProduct(Items.filter((item: any) => {
      return inputItem === "" ? true : item.name.toLowerCase().includes(inputItem.toLowerCase())
    })
    )
  }, [inputItem])


  const handleClick = () => {
    console.log(purchaseData);
    console.log(itemList);


  }


  return (
    <div className="w-full ">
      <h1 className="px-10 pt-5 ">New Purchase</h1>

      <NewSales
        data={purchaseData}
        setData={setPurchaseData}
        placeholder="Select Supplier"
        isSales={false}
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
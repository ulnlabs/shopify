"use client"
import NewReturn from "@/app/components/sales-pur/return";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ContextData } from "../../../../../contextapi";
import { useRouter } from "next/navigation";


interface FormState {
  customerName: string,
  billDate: Date,
  billStatus?: string,
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
  billPaymentType: string | "",
  billAmount: any,
  customerId: number

}

const page = () => {
  const { salesRecord, customerDetails } = useContext(ContextData);
  const { push } = useRouter();
  console.log("jkj", salesRecord);
  const { c_name, items, paymentType, otherCharges, discount, discountType, taxType, note, c_id, salesCode } = salesRecord;
  console.log(salesCode);

  const [salesReturnData, setSalesReturnData] = useState<FormState>({
    customerName: c_name,
    customerId: c_id,
    billDate: new Date,
    billQuantity: 0,
    billCharges: otherCharges | 0,
    billTaxType: taxType || "",
    billDiscount: discount || "",
    billDiscountType: discountType || "",
    billNote: note || "",
    billSubtotal: 0,
    billOtherCharge: 0,
    billOverallDis: 0,
    billTotal: 0,
    billPaymentType: paymentType || "",
    billAmount: 0,
  })

  console.log(paymentType);

  useEffect(() => {
    setItemList(items)
  }, [items])

  const [status, setStatus] = useState<string>("")

  const handleClick = async () => {

    const data = await axios.post("/api/sales", {
      header: "return",
      data: {
        sales: salesReturnData,
        items: itemList,
        salesCode: salesCode,
        status: status
      }
    })
    if (data.status === 200) {
      alert("Sales Return Successfull");
      if (status === "Return Raised")
        push("/sales/sales-list")
      else if (status === "Returned")
        push("/sales/return-list")
    }
    console.log("res", data);

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

    customerDetails &&
      setCus(customerDetails?.filter((item: any) => {
        console.log(customerDetails);
        console.log(item.name, item.id, item.mobile);


        return (item.name.toLowerCase().includes(salesReturnData.customerName.toLowerCase()) || item.id.toString().includes(salesReturnData.customerName) || item.mobile.toLowerCase().includes(salesReturnData.customerName.toLowerCase()))
      })
      )
  }, [salesReturnData.customerName])
  console.log(cus);


  const [inputItem, setInputItem] = useState<String>("");
  const [product, setProduct] = useState<any>([])

  useEffect(() => {
    setProduct(items?.filter((item: any) => {
      return inputItem === "" ? true : item.itemName?.toLowerCase().includes(inputItem.toLowerCase())
    }
    ))
  }, [inputItem])

  const [itemList, setItemList] = useState<any>([]);

  useEffect(() => {
    if (items != itemList) {
      setStatus("Return Raised")
    }

    else if (items == itemList) {
      setStatus("Returned");
    }

  }, [itemList])

  console.log(salesReturnData);

  return (
    <div className="w-full ">
      <h1 className="px-10 pt-5 ">New Sales Return</h1>

      <NewReturn
        placeholder="Search Customer"
        data={salesReturnData}
        setData={setSalesReturnData}
        inputItem={inputItem}
        setInputItem={setInputItem}
        Items={product}
        products={items}
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

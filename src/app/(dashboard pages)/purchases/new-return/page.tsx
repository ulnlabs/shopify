"use client"
import NewReturn from "@/app/components/sales-pur/return";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FormState } from "../../../../../global";
import { ContextData } from "../../../../../contextapi";
import axios from "axios";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";


const page = () => {
  const { push } = useRouter();

  const { purhcaseRecord, supplierDetails } = useContext(ContextData);

  const { s_name, items, paymentType, otherCharges, discount, discountType, taxType, note, s_id, purchaseCode } = purhcaseRecord;

  console.log(purhcaseRecord);


  const [purchaseReturnData, setPurchaseReturnData] = useState<FormState>({
    customerName: s_name,
    customerId: s_id,
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

  useEffect(() => {
    setItemList(items)
  }, [items])

  const [status, setStatus] = useState<string>("")

  const handleClick = async () => {

    const data = await axios.post("/api/purchase", {
      header: "return",
      data: {
        purchase: purchaseReturnData,
        items: itemList,
        purchaseCode: purchaseCode,
        status: status
      }

    })
    console.log("res", data);
    if (data.status === 200) {
      alert("Purchase Return Successfull");
      if (status === "Return Raised")
        push("/purchases/purchase-list")
      else if (status === "Returned")
        push("/purchases/return-list")
    }

    console.log(purchaseReturnData);
  }


  const [cus, setCus] = useState<any>("");

  useEffect(() => {
    setCus(supplierDetails.filter((item: any) => {
      return (item.name.toLowerCase().includes(purchaseReturnData.customerName.toLowerCase()) || item.id.toString().includes(purchaseReturnData.customerName) || item.mobile.toLowerCase().includes(purchaseReturnData.customerName.toLowerCase()))
    })
    )

  }, [purchaseReturnData.customerName])


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

  console.log(purchaseReturnData);


  return (
    <div className="w-full ">
      <DashboardHeader title="Purchasae" subtitle={"New Return"} />

      <NewReturn
        isSales={false}
        placeholder="Search Customer"
        data={purchaseReturnData}
        setData={setPurchaseReturnData}
        inputItem={inputItem}
        setInputItem={setInputItem}
        Items={product}
        products={items}
        customerData={cus}
        itemList={itemList}
        setItemList={setItemList}
      />      <div className="flex justify-center pt-5 pb-10 gap-10">
        <button onClick={handleClick} type="button" className="w-20 py-2 bg-primary-save rounded-md text-white">Save</button>
        <Link href={"../../dashboard"} className="w-20 py-2 text-center bg-primary-close rounded-md text-white">Close</Link>
      </div>
    </div>
  );
};
export default page;

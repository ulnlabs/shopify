"use client"
import NewPurchase from "@/app/components/sales-pur/addnew";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { FormState } from "../../../../../global";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ContextData } from "../../../../../contextapi";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";

const page = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [purchaseData, setPurchaseData] = useState<FormState>({
    customerName: "",
    customerId: 0,
    billDate: new Date,
    billStatus: "Purchased",
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
    billUserName: "",
  })

  const { stocks: Items, supplierDetails, setPurchaseRecord } = useContext(ContextData)
  console.log(supplierDetails);


  const [inputItem, setInputItem] = useState<any>("");

  useEffect(() => {
    setProduct(Items ? Items.filter((item: any) => {
      return inputItem === "" ? true : item.itemName.toLowerCase().includes(inputItem.toLowerCase())
    })
      : [])
  }, [inputItem])
  const [product, setProduct] = useState<any>();


  const [cus, setCus] = useState<any>("");

  useEffect(() => {
    setCus(supplierDetails.filter((item: any) => {
      return (item.name.toLowerCase().includes(purchaseData.customerName.toLowerCase()) || item.id.toString().includes(purchaseData.customerName) || item.mobile.toLowerCase().includes(purchaseData.customerName.toLowerCase()))
    })
    )

  }, [purchaseData.customerName])

  const [itemList, setItemList] = useState<any>([]);



  const handleClick = async () => {
    console.log(purchaseData);
    console.log(itemList);
    //sending data to purchase backend
    try {
      const { data, status } = await axios.post("/api/purchase", {
        header: "purchase",
        data: {
          purchase: purchaseData,
          items: itemList,
          status: "Purchased"
        }
      });
      console.log(status);
      if (status === 200) {
        console.log(data);
        setPurchaseRecord(data);
        router.push("/purchases/invoice")
      }

    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="w-full ">
      <DashboardHeader title="Purchasae" subtitle={"New"} />


      <NewPurchase
        isSales={false}  //false parameter used to behave as purchase
        placeholder="Search supplier"
        data={purchaseData}
        setData={setPurchaseData}
        inputItem={inputItem} //input field value
        setInputItem={setInputItem}
        Items={product} //all products
        customerData={cus} //all customer data
        itemList={itemList}  //item cart data
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
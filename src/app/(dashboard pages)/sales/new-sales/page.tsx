"use client"
import NewSales from "@/app/components/sales-pur/addnew";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FormState } from "../../../../../global";
import axios from "axios";
import { useAnimation } from "framer-motion";


const page = () => {




  const [item, setItem] = useState<any>([]);

  const [inputItem, setInputItem] = useState<String>("");
  const [product, setProduct] = useState<any>([])
  useEffect(() => {
    const fetchItem = async () => {

      const response = await axios.get("/api/sales",
        {
          headers: {
            data: "getItems"
          }
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


  const [salesData, setSalesData] = useState<FormState>({
    customerName: "",
    customerId: 0,
    billDate: new Date,
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

  const controls = useAnimation();

  const [isComfirm, setIsComfirm] = useState<boolean>(false)
  const handleClick = async () => {
    await controls.start({ y: 0, transition: { duration: 0.5, ease: "easeOut" } });

    // Scroll to top after animation completes
    window.scrollTo({ top: 0, behavior: "smooth" });



    if (salesData.customerName && itemList.length > 0 && salesData.billPaymentType) {


      try {
        const { data } = await axios.post("/api/sales", {
          sales: salesData,
          items: itemList
        })
        console.log(data);

      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      console.log("Please Fill All The Field");

    }
  }

  const customerName = [
    {
      value: "Fire10",
      label: "Fire10",
      id: 1,
    },
    {
      value: "deepath",
      label: "Deepath",
      id: 2,
    },
    {
      value: "deepak",
      label: "Deepak",
      id: 3,
    },
    {
      value: "999",
      label: "Dhilip",
      id: 4,
    },
  ]

  const [cus, setCus] = useState<any>("");
  useEffect(() => {
    setCus(customerName.filter((item: any) => {
      return item.value.toLowerCase().includes(salesData.customerName.toLowerCase())
    })
    )
  }, [salesData.customerName])



  const [itemList, setItemList] = useState<any>([]);


  return (
    <div className="w-full ">
      <h1 className="px-10 pt-5 ">New Sales</h1>
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

      {/* <button onClick={() => {
        const text = "Vat 5%";
        const tex = text.match(/\d+/g)!.map(Number);
        console.log(tex[0] * 5);


        console.log(new Date);


      }}>test</button> */}

    </div>
  );
};
export default page;

/* 
const items = [
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
  ] */







/* 
  const [item, setItem] = useState<any>([])
  const [isExist,setIsExist] = useState(false) */
/*
  useEffect(() => {
    const getData = async () => {
      try {
        if(inputItem) {

 
          const data = await axios.put("/api/sales/",{data:inputItem});
          setProduct(data.data);
 
        } 
        
      }
      catch (err) {
      }
    }  
    getData();
  },[inputItem]) */

/* 

  const getData = async (url: string) => {
    const response = await axios.put(url, { data: inputItem });
    return response.data;
  }

  const { data, error } = useSWR(!isExist ? "/api/sales" : null, getData);

  useEffect(() => {
    if (data !== undefined) {

      setItem((prevData: any) => prevData.concat(data));
    }
  }, [data])


 */
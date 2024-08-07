"use client";
import React, { createContext, useEffect, useState } from "react";
import { customerAdd } from "./global";
import axios from "axios";
import useSWR from "swr";
import { children } from "./global";
import { useToast } from "@/components/ui/use-toast";
//if some types are not seen here they are mentioned in the global.d.ts file


export const ContextData = createContext<any>({});
const ContextContent = ({ children }: children) => {
  const {toast}=useToast()
  const [customerData, setCustomerData] = useState<customerAdd>({
    name: "",
    mobile: "",
    email: "",

    state: "",
    city: "",
    pincode: "",
    address: "",
    id: 0
  });
  const [selectedRow, setSelectedRow] = useState<string[]>([]);


  const [stocks, setStocks] = useState<any>([]);
  const [companyDetail, setCompanyDetail] = useState<any>({});


  useEffect(() => {
   try {
    const fetchData = async () => {

      const response = await axios.put("/api/sales",
        {
          data: { header: "getItems" }
        },);
      const { data: company } = await axios.put("/api/companyDetail");
      console.log(company.data[0]);

      setCompanyDetail(company.data[0])
      setStocks(response.data)
      console.log(response.data);
    }
    fetchData();
   } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong",
    })
   }
  }, []);
  /* 
    const getItems = async () => {
      const res = await axios.put("/api/purchase", {
        data: { header: "getItems" }
      },);
      const data = await res.data;
      console.log(data);
      return data;
    }
  
  
    const { data: purchaseStocks, error: itemError } = useSWR("/api/purchase", getItems) */



  const [supplierData, setSupplierData] = useState({
    name: "",
    mobile: "",
    email: "",
    gst: "",
    tax: "",
    openingbalance: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  })

  const [salesRecord, setSalesRecord] = useState<any>([]);
  const [purhcaseRecord, setPurchaseRecord] = useState<any>([])
  const [editItem, setEditItem] = useState<any>([]);

  const [customerDetails, setCustomerDetails] = useState<any>([]);
  const [supplierDetails, setSupplierDetails] = useState<any>([]);


  return (
    <>
      <ContextData.Provider value={{
        selectedRow, customerDetails, setCustomerDetails, companyDetail, supplierDetails, setSupplierDetails, editItem, setEditItem, setSelectedRow, purhcaseRecord, stocks, setPurchaseRecord, customerData, setCustomerData, supplierData, setSupplierData, salesRecord, setSalesRecord
      }}>
        {children}
      </ContextData.Provider>
    </>
  );
};
export default ContextContent;

"use client";
import { createContext, useState } from "react";
//if some types are not seen here they are mentioned in the global.d.ts file

export const ContextData = createContext<any>({});
const ContextContent = ({ children }: children) => {
  const [customerData, setCustomerData] = useState<customerAdd>({
    name: "",
    mobile: "",
    email: "",
    gst: "",
    tax: "",
    due: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    id:0
  });
const [supplierData,setSupplierData] =useState({
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

  return (
    <>
      <ContextData.Provider value={{ customerData, setCustomerData ,supplierData,setSupplierData}}>
        {children}
      </ContextData.Provider>
    </>
  );
};
export default ContextContent;

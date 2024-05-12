"use client";
import { createContext, useState } from "react";
import { customerAdd } from "./global";
//if some types are not seen here they are mentioned in the global.d.ts file

export const ContextData = createContext<any>({});
const ContextContent = ({ children }: children) => {
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

  return (
    <>
      <ContextData.Provider value={{ selectedRow, setSelectedRow, purhcaseRecord, setPurchaseRecord, customerData, setCustomerData, supplierData, setSupplierData, salesRecord, setSalesRecord }}>
        {children}
      </ContextData.Provider>
    </>
  );
};
export default ContextContent;

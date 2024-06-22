'use client'

import { Inter } from "next/font/google";
import SideBar from "../components/navigation/SideBar";
import Header from "../components/navigation/Header";
import { UserProvider } from "@/UserContext";
import { Toaster } from "@/components/ui/toaster"
import axios from "axios";
import { useContext, useEffect } from "react";
import { ContextData } from "../../../contextapi";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout
  ({



    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  const { setCustomerDetails } = useContext(ContextData);

  const { setSupplierDetails } = useContext(ContextData);

  useEffect(() => {
    async function getData(): Promise<void> {
      const responseCustomer = await axios.get(`/api/customers`, {
        headers: {
          data: "get-data",
        },
      });
      const data = responseCustomer.data;

      setCustomerDetails(data);
      console.log(data);
      const responseSupplier = await axios.get(`/api/suppliers`, {
        headers: {
          data: "get-data",
        },
      });
      console.log(responseSupplier.data);

      setSupplierDetails(responseSupplier.data)
    }
    getData();
  }, []);
  return (
    <UserProvider>

      <div className="min-h-screen max-w-screen flex justify-between">
        <SideBar />
        <div className="w-full max-h-screen overflow-hidden">
          <Header />
          <div className="w-full max-h-[calc(100vh_-_60px)] overflow-y-scroll flex flex-col items-center justify-start scrollbar-hide">
            {children}
          </div>
        </div>
      </div>
      <Toaster />
    </UserProvider>

  );
}

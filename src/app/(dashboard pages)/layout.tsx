'use client'

import { Inter } from "next/font/google";
import SideBar from "../components/navigation/SideBar";
import Header from "../components/navigation/Header";
import { UserProvider } from "@/UserContext";
import { Toaster } from "@/components/ui/toaster"
import axios from "axios";
import { useContext, useEffect } from "react";
import { ContextData } from "../../../contextapi";
import { signOut, useSession } from "next-auth/react";
import useSWR from "swr";

export default function RootLayout
  ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  const { setCustomerDetails } = useContext(ContextData);
  const { setSupplierDetails } = useContext(ContextData);
  const { data: session } = useSession()
  const { data: status } = useSWR('status', async () => {
    const res = await fetch('/api/user/status', {
      method: 'PUT',
      body: JSON.stringify({ email: session?.user?.email })
    })
    if (res.ok) {
      const { status } = await res.json();
      return status
    }
  })
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
      {
        session?.user?.email ? (
          status === 'active' ? (
            <>
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
            </>
          ) : (
            <>
              <div className="flex h-screen w-screen items-center justify-center flex-col gap-6">
                  <h1>Your Account as been suspended by admin</h1>
                  <button className="text-white font-semibold px-6 py-2 rounded bg-[--primary]" onClick={()=>signOut()}>Exit Account</button>
              </div>
            </>
          )
        ) : (
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex space-x-2 animate-pulse">
              <div className="w-8 h-8 bg-[--primary] rounded-full"></div>
              <div className="w-8 h-8 bg-[--primary] rounded-full"></div>
              <div className="w-8 h-8 bg-[--primary] rounded-full"></div>
            </div>
          </div>
        )
      }
    </UserProvider>

  );
}

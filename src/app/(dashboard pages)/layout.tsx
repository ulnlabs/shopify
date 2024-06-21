'use client'
import { Inter } from "next/font/google";
import SideBar from "../components/navigation/SideBar";
import Header from "../components/navigation/Header";
import { UserProvider } from "@/UserContext";
import { Toaster } from "@/components/ui/toaster"
import { useSession } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  return (
    <UserProvider>
      {
        session?.user?.email ? (
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

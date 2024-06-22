'use client'
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { COLUMNS_DATA, InventoryItem } from "./columns";
import { useSession } from "next-auth/react";
import useSWR from "swr";

function page() {
  const { data: session } = useSession();
  const [userlist, setUseeList] = useState<Object>();
  const userfetcher = async () => {
    const handler = await fetch('/api/user/list', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: session?.user?.email })
    });
    if (handler.status == 200) {
      const data = handler.json();
      return data
    }
    return {}
  }
  const { data: userdata } = useSWR("/api/user/list", userfetcher);
  return (
    <div className="w-full px-2 py-4">
      <DashboardHeader title="User List" />
      <div className="py-4 px-2">
        {
          userdata ? (
            <DataTable columns={COLUMNS_DATA} data={userdata} paginater filter />
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin border-t-4 border-[--primary] rounded-full w-12 h-12"></div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default page;

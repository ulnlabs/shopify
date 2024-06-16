'use client'
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import React from "react";
import { DataTable } from "./data-table";
import { COLUMNS_DATA, InventoryItem } from "./columns";
import axios from "axios";
import useSWR from "swr";

function page() {

  const fetchItem = async () => {
    console.log("entered");

    const response = await axios.put("/api/items", {
      data: {
        header: "getItems"
      }
    })
    console.log(response.data);
    return response.data;

  }

  const { data } = useSWR("api/items", fetchItem);
  console.log(data);



  return (
    <div className="w-full px-2 py-4">
      <DashboardHeader title="Items List" />
      <div className="py-4 px-2">
        <DataTable columns={COLUMNS_DATA} data={data ? data : []} filter paginater />
      </div>
    </div>
  );
}

export default page;

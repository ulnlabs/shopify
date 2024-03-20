import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import React from "react";
import { DataTable } from "./data-table";
import { COLUMNS_DATA, InventoryItem } from "./columns";

function page() {
  const exampleData: InventoryItem[] = [
    {
      select: false,
      brandName:'hp',
      brandCode:'hp9023',
      description:'laptops',
      status: "In Stock",
    },
    // Add more sample data here
  ];
  return (
    <div className="w-full px-2 py-4">
      <DashboardHeader title="Brand List" />
      <div className="py-4 px-2">
        <DataTable columns={COLUMNS_DATA} data={exampleData} filter paginater/>
      </div>
    </div>
  );
}

export default page;

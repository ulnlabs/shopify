import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import React from "react";
import { DataTable } from "./data-table";
import { COLUMNS_DATA, InventoryItem } from "./columns";

function page() {
  const exampleData: InventoryItem[] = [
    {
      userName:"gowdaman",
      email:'damangowdaman@gmail.com',
      mobile:'9838723578',
      role:'admin',
      status: "active",
    }
    // Add more sample data here
  ];
  return (
    <div className="w-full px-2 py-4">
      <DashboardHeader title="User List" />
      <div className="py-4 px-2">
        <DataTable columns={COLUMNS_DATA} data={exampleData}  paginater filter />
      </div>
    </div>
  );
}

export default page;

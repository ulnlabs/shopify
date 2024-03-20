import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import React from "react";
import { DataTable } from "./data-table";
import { COLUMNS_DATA, InventoryItem } from "./columns";
import { AiOutlineDownload } from "react-icons/ai";

function page() {
  const exampleData: InventoryItem[] = [
    {
      roleName:"gowdaman",
      description:'damangowdaman@gmail.com',
      status: "active",
    }
    // Add more sample data here #	Role Name	Description	Status	Action
  ];
  return (
    <div className="w-full px-2 py-4">
      <DashboardHeader title="Role List" />
      <div className="py-4 px-2"><div className="p-3 border rounded">
          <AiOutlineDownload/>
        </div>
        <DataTable columns={COLUMNS_DATA} data={exampleData}  paginater filter />
      </div>
    </div>
  );
}

export default page;

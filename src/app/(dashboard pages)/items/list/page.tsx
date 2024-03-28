import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import React from "react";
import { DataTable } from "./data-table";
import { COLUMNS_DATA, InventoryItem } from "./columns";

function page() {
  const exampleData: InventoryItem[] = [
    {
      select: false,
      itemCode: "ABC",
      itemName: "Example Item",
      brand: "XYZ Brand",
      category: "Electronic Devices",
      unit: "Piece",
      stockQty: 100,
      minQty: 50,
      purchaseprice: 120,
      finalsalesprice: 200,
      tax: 15,
      status: "In Stock",
    },
    {
      select: false,
      itemCode: "ABgtC",
      itemName: "Example Itejyygm",
      brand: "XYZ Bralknd",
      category: "Electron.kn.ic Devices",
      unit: "Piece",
      stockQty: 800,
      minQty: 90,
      purchaseprice: 100,
      finalsalesprice: 900,
      tax: 35,
      status: "In Stock",
    },
    // Add more sample data here
  ];
  return (
    <div className="w-full px-2 py-4">
      <DashboardHeader title="Items List" />
      <div className="py-4 px-2">
        <DataTable columns={COLUMNS_DATA} data={exampleData} filter paginater/>
      </div>
    </div>
  );
}

export default page;

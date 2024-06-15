"use client";
import React from "react";
import DataTable from "@/app/components/datatable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { columnHeader_dataTable } from "../../../../../global";
function List() {
  return (
    
    <>

    <div className="container mx-auto py-3">
      <DataTable
        columns={listColumn}
        data={[]}
        column={true}
        filter={true}
        rows={true}
        paginater={true}
      />
    </div>
  </>
  );
}
const CTG_SELECT = {
  id: "select",
  header: ({ table }: any) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }: any) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
};
const CATEGORY_NAME: columnHeader_dataTable = {
  accessorKey: "category_name",
  header: "Category Name",
};
const DESCRIPTION: columnHeader_dataTable = {
  accessorKey: "description",
  header: "Description",
};
const STATUS: columnHeader_dataTable = {
  accessorKey: "status",
  header: "Status",
};
const ACTION: columnHeader_dataTable = {
  accessorKey: "action",
  header: "Action",
};
export default List;
const listColumn: ColumnDef<any>[] = [
  CTG_SELECT,
  CATEGORY_NAME,
  DESCRIPTION,
  STATUS,
  ACTION,
];

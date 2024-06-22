"use client";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/app/components/datatable/DataTable";

import { columnHeader_dataTable } from "../../../../../global";
import { ColumnDef } from "@tanstack/react-table";
export default function Page() {
  const EXP_SELECT = {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value:any) => table.toggleAllPageRowsSelected(!!value)}
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
  }
  const DATE: columnHeader_dataTable = {
    accessorKey: "date",
    header: "Date"
  
  }
  const CATEGORY: columnHeader_dataTable = {
    accessorKey: "Category",
    header: "Category"
  }
  const REFERENCE_NO: columnHeader_dataTable = {
    accessorKey: "reference_no",
    header: "Reference_no"
  }
  const EXPENSE_FOR: columnHeader_dataTable = {
    accessorKey: "expense_for",
    header: "Expense for"
  }
  const AMOUNT: columnHeader_dataTable = {
    accessorKey: "amount",
    header: "Amount"
  }
  const NOTE: columnHeader_dataTable = {
    accessorKey: "note",
    header: "Note"
  }
  const CREATED_BY: columnHeader_dataTable = {
    accessorKey: "created_by",
    header: "Created by"
  }
  const ACTION: columnHeader_dataTable = {
    accessorKey: "action",
    header: "Action"
  }
  
   const expColumn: ColumnDef<any>[] = [
    DATE,
    CATEGORY,
    REFERENCE_NO,
    EXPENSE_FOR,
    AMOUNT,
    NOTE,
    CREATED_BY,
    ACTION
  ]
  return (

        <>
          <DashboardHeader title="customers" />

          <div className="container mx-auto py-3">
            <DataTable
              columns={expColumn}
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

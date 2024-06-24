"use client";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/app/components/datatable/DataTable";

import { columnHeader_dataTable } from "../../../../../global";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
export default function Page() {
  const EXP_SELECT = {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "category",
    header: "Category"
  }
  const REFERENCE_NO: columnHeader_dataTable = {
    accessorKey: "refno",
    header: "Reference_no"
  }
  const EXPENSE_FOR: columnHeader_dataTable = {
    accessorKey: "expfor",
    header: "Expense for"
  }
  const AMOUNT: columnHeader_dataTable = {
    accessorKey: "amount",
    header: "Amount"
  }
  const NOTE: any = {
    accessorKey: "note",
    header: "Note",
    cell: (({ row }: any) => row.original.note ? row.original.note : "-")
  }
  const CREATED_BY: columnHeader_dataTable = {
    accessorKey: "createdBy",
    header: "Created by"
  }
  const fetchExpense = async () => {
    console.log("done");

    const { data } = await axios.get('/api/expenses',
      {
        headers: {
          data: "get-expenses",
        },
      });
    console.log(data);

    return data;
  }

  const { data, mutate } = useSWR("/api/expenses", fetchExpense)
  const handleDelete = (row: any): void => {

    axios.delete("/api/expenses", {
      headers: {
        data: "delete-expense"
      },
      data: { id: row._id },
    }).then((res) => {
      mutate();
      toast({
        title: "New PopUp !",
        description: "Expense is deleted"
      })
    }).catch((err) => {
      toast({
        title: "New PopUp !",
        description: "something went wrong",
      })
    })
  }
  const ACTION: any = {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }: any) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                handleDelete(row.original);
              }}
            >
              Delete Expense
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
      <DashboardHeader title="Expenses" />

      <div className="container mx-auto py-3">
        <DataTable
          columns={expColumn}
          data={data ? data : []}
          column={true}
          filter={true}
          rows={true}
          paginater={true}
        />
      </div>
    </>

  );
}

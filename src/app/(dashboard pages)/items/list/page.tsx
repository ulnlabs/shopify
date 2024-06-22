'use client'
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import React, { useContext } from "react";
import { DataTable } from "./data-table";
import axios from "axios";
import useSWR from "swr";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AiOutlineMore } from "react-icons/ai";
import { ContextData } from "../../../../../contextapi";
import { useRouter } from "next/navigation";


export interface InventoryItem {
  select: boolean;
  itemCode: string;
  itemName: string;
  brand: string;
  category: string;
  unit: string;
  stockQty: number;
  minQty: number;
  purchaseprice: number;
  finalsalesprice: number;
  tax: number;
  status: string;
}



function page() {

  const { setEditItem } = useContext(ContextData);

  const router = useRouter();

  const COLUMNS_DATA: ColumnDef<InventoryItem>[] = [
    /*  {
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
     }, */
    {
      accessorKey: "itemCode",
      header: "Item Code",
    },
    {
      accessorKey: "itemName",
      header: "Item Name",
    },
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "unit",
      header: "Unit",
    },
    {
      accessorKey: "quantity",
      header: "Stock Quantity",
    },

    {
      accessorKey: "purchasePrice",
      header: "Purchase Price",
    },
    {
      accessorKey: "salesPrice",
      header: "Final Sales Price",

    },
    {
      accessorKey: "tax",
      header: "Tax (%)",
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => {


        const active = row.original.status

        return (
          <button className={`  ${active ? "bg-green-500 p-2 rounded-md text-white" : "bg-red-500 p-2 rounded-md text-white"}`} onClick={async () => {
            await axios.put("/api/items", {
              data: {
                id: row.original._id,
                status: !active,
                header: "updateStatus",
              }
            })
            mutate();
          }
          } >
            {active ? "Active" : "Inactive"}
          </button>
        )
      }
    }, {
      id: "actions",
      header: 'action',
      enableHiding: false,
      cell: ({ row }: any) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-fit px-4 p-0">
                <span className="sr-only">Open menu</span>
                <AiOutlineMore className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={async () => {
                setEditItem(row.original);
                router.push("/items/edit")
              }
              }
              >Edit</DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await axios.delete("/api/items", {
                    data: { id: row.original._id },
                  })
                  mutate();
                }}
              >Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu >
        )
      },
    },
  ];


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

  const { data, mutate } = useSWR("api/items", fetchItem);
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

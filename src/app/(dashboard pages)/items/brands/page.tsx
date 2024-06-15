'use client'
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import axios from "axios";
import useSWR from "swr";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";





export interface InventoryItem {
  _id?: number,
  select: boolean;
  name: string;
  desc: string;
  status: string;
}
function page() {



  const fetchBrand = async () => {
    const response = await axios.put("/api/brand",
      { data: { header: "brand", } }
    )

    return response.data;
  }

  const { data, mutate } = useSWR("api/brand", fetchBrand)

  console.log(data);


  const [isOpen, setIsopen] = useState<boolean>(false);
  const [row, setRow] = useState<InventoryItem>()
  const BrandEditPopUp = () => {
    const [name, setName] = useState<string>(row?.name || "")
    const [description, setDescription] = useState<string>(row?.desc || "")
    const editBrand = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        await axios.put("/api/brand", {
          data: {
            id: row?._id,
            name: name,
            description: description,
            header: "update",
          }
        })
      }
      catch (error) {
        console.log(error);
        setIsopen(false);
      }
      finally {
        setIsopen(false);
      }
    }
    return (
      <div className='flex h-screen absolute z-50 w-full top-0 left-0 backdrop-blur-[1px]  items-center justify-center' >
        <motion.div
          exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, type: "tween" }} >
          <motion.div
            exit={{ opacity: 0, y: -50 }} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .5, type: "tween" }}
            className='bg-white p-4 rounded-lg shadow-lg'>
            <form method="post" onSubmit={editBrand} className='w-fit flex flex-col gap-4'>
              <h1 className='text-xl font-semibold'>Edit Brand</h1>
              <input type="text" name='name' id='name' value={name} onChange={(e: any) => setName(e.target.value)} placeholder='Category Name' className='border p-2 outline-none text-gray-800' />
              <input type="text" name='description' value={description} onChange={(e: any) => setDescription(e.target.value)} id='description' placeholder='Description' className='border p-2 outline-none text-gray-800' />
              <button type='submit' className='bg-green-400 w-full px-4 py-2 rounded-lg text-white'>Save</button>
              <button type='reset' onClick={() => setIsopen(false)} className='bg-red-400 w-full px-4 py-2 rounded-lg text-white'>Close</button>
            </form>
          </motion.div>
        </motion.div>
      </div >
    )
  }




  // 	Brand Code	Brand Name	Description	Status	Action
  const COLUMNS_DATA: ColumnDef<InventoryItem>[] = [
    {
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
    },

    {
      accessorKey: "name",
      header: "Brand Name",
    },
    {
      accessorKey: "desc",
      header: "description",
      cell: ({ row }: any) =>
        <p>{row.original.desc ? row.original.desc : "-"}</p>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {


        const active = row.original.status

        return (
          <button className={`  ${active ? "bg-green-500 p-2 rounded-md text-white" : "bg-red-500 p-2 rounded-md text-white"}`} onClick={async () => {
            console.log("done");

            axios.put("/api/brand", {
              data: {
                id: row.original._id,
                status: !active,
                header: "updateStatus"
              }
            })
            mutate()
          }
          } >
            {active ? "Active" : "Inactive"}
          </button>
        )
      }
    },
    {
      id: "actions",
      header: 'action',
      enableHiding: false,
      cell: ({ row }: any) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-fit px-4 p-0">
                <span className="sr-only">Open menu</span>
                <p>action</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={async () => {
                setRow(row.original)
                setIsopen(true)
              }
              }
              >Edit</DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await axios.delete("/api/brand", {
                    data: { id: row.original._id },
                  })
                }}
              >Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu >
        )
      },
    },
  ];





  return (
    <div className="w-full px-2 py-4">
      {isOpen && <BrandEditPopUp />}
      <DashboardHeader title="Brand List" />
      <div className="py-4 px-2">
        <DataTable columns={COLUMNS_DATA} data={data ? data : []} filter paginater />
      </div>
    </div>
  );
}

export default page;

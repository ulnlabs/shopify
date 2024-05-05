"use client"
import React from 'react'
import { useState } from 'react';
import Taxdata from "@/app/components/settings/taxlist/DT_Tax/Taxdata"
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";
//for hint how do make your custom columns see line 137 or below to comment
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import AddTax from '../popup/AddTax';
import { AnimatePresence, motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { columnHeader_dataTable } from '../../../../../global';
export const data =
  [
    {
      id: 1,
      taxname: "SGST 9%",
      taxpercentage: "9.00"
    },
    {
      id: 2,
      taxname: "IGST 9%",
      taxpercentage: "9.00"
    },
    {
      id: 3,
      taxname: "SGST 4.5%",
      taxpercentage: "4.50"
    },
  ]



function Taxlist() {

  const Tax_percentage: columnHeader_dataTable = {
    accessorKey: "taxpercentage",
    header: "Tax(%)",
  };
  const Tax_name: columnHeader_dataTable = {
    accessorKey: "taxname",
    header: "Tax Name",
  };

  const C_SELECT = {
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
  const status = {
    accessorKey: "status",
    cell: ({ row }: any) => {
      const [active, Deactive] = useState(true);
      var status: string;
      if (active == true) {
        status = "active";
      }
      else {
        status = "Inactive";
      }
      return (
        <button className={`  ${active ? "bg-green-500 p-2 rounded-md text-white" : "bg-red-500 p-2 rounded-md text-white"}`} onClick={() => Deactive(!active)} >
          {status}
        </button>
      )
    }



  }
  const C_ACTION = {
    accessorKey: "action",
    cell: ({ row }: any) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-9  bg-blue-300 p-2 rounded-md">
              <h1 className=" "> Action</h1>
              <BiCaretDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex justify-between" onClick={() => {
              handleDelete(row.original);
            }}>
              <h1>

                Edit
              </h1>
              <div className="">
                <RiEdit2Fill />
              </div>
            </DropdownMenuItem>


            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-between" onClick={() => {
              handleDelete(row.original);
            }}>
              <h1>

                Delete
              </h1>
              <div className="">
                <MdDelete className=" text-red-600" size={20} />
              </div>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
  const c_columns: ColumnDef<any>[] = [
    C_SELECT,
    Tax_name,
    Tax_percentage,
    status,
    C_ACTION,
  ];


  const [Tax, setTax] = useState(data);
  function handleDelete(row: any): void {


    setTax(Tax.filter((item) => item.id !== row.id));


  }

  const [popup, setpopup] = useState<boolean | null>(false)
  return (
    <div className="relative">
      <div className=" h-screen ">
        <AnimatePresence mode='wait'>
          {
            popup && <AddTax close={setpopup} />
          }
        </AnimatePresence>
        <div className="mx-auto w-[95%] p-5 mt-3">
          <div className=" border-t-2 border-violet-500 border-b-2   rounded-md">

            <div className="flex justify-between p-3">
              <h1 className='text-sm tracking-[.2rem] font-medium'>Tax List</h1>
              <button onClick={() => setpopup(true)} type='submit' className='p-2  font-bold rounded-md text-black border  hover:bg-violet-200 text-sm' > <span className='text-lg'>+</span>Add Tax</button>
            </div>

            <div className=" ">
              <Taxdata columns={c_columns} data={Tax} />



            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Taxlist

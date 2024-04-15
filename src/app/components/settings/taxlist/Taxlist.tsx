"use client"
import React, { use } from 'react'
import { useState } from 'react';
import DataTable from "@/app/components/datatable/DataTable"
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";
//for hint how do make your custom columns see line 137 or below to comment
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import AddTax from '../popup/AddTax';
import { AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import Edit from "@/app/components/settings/popup/Edit"
 interface initial{
  id:number|null,
  taxname:string,
  taxpercentage:string
    
}
export const data  =
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
              setEdit(true);
             
              
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

  const user=(NewTax:any)=>{
    NewTax.id=Tax.length+1;
    setTax([...Tax,NewTax])
   
  }
  const [Tax, setTax] = useState(data);
  function handleDelete(row: any): void {
    setTax(Tax.filter((item) => item.id !== row.id));

  }
  const [popup, setpopup] = useState<boolean | null>(false)
  const [edit, setEdit] = useState<boolean | null>(false)
  const [initial,setinitial]=useState<initial>({id:null,taxname:"",taxpercentage:""})
  
  return (
    <div className="relative ">
      <div className=" h-screen ">
        <AnimatePresence mode='wait'>
          {
            popup && <AddTax close={setpopup} dataset={user}  />||edit&&<Edit close={setpopup} setinitial={setinitial} />
          }
        </AnimatePresence>
        <div className="mx-auto w-[98%] bg-slate-100  mt-3">
          <div className=" border rounded-md p-2 ">

            <div className="flex justify-between items-center p-3">
              <h1 className='text-md tracking-[.2rem] font-extralight'>Tax List :-</h1>
              <button onClick={() => setpopup(true)} type='submit' className='px-1 font-normal rounded-md  text-black border  hover:bg-white text-sm' > <span className='text-lg'>+</span>Add Tax</button>
            </div>

            <div className=" ">
              <DataTable columns={c_columns} data={Tax} />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Taxlist


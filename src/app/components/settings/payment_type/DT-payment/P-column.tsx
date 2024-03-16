"use client";
import { RiEdit2Fill } from "react-icons/ri"; 
import { MdDelete } from "react-icons/md"; 
import { MdOutlineDeleteForever } from "react-icons/md"; 
import { BiCaretDown } from "react-icons/bi"; 
//for hint how do make your custom columns see line 137 or below to comment
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { MoreHorizontal, ArrowUpDown, Currency } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

/* //delete the data or update here you have to use your custom function import it from your area */
function handleDelete(row: customerList): void {}



const Payment_type: columnHeader_dataTable = {
  accessorKey: "payment_type",
  header: "Payment Type Name",
};

const status={
    accessorKey: "status",
    cell: ({ row }: any) => {
      const [active,Deactive]=useState(true);
      var status:string;
      if(active==true){
       status="active";
      }
      else{
        status="Inactive";
      }
      return(
        <button className={`  ${active?"bg-green-500 p-2 rounded-md text-white":"bg-red-500 p-2 rounded-md text-white"}`} onClick={()=>Deactive(!active)} >
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
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className=" bg-blue-300 p-2 rounded-md ">{`Action ->`} </span>
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
export const c_columns: ColumnDef<any>[] = [
 Payment_type,
  status,
  C_ACTION,
];

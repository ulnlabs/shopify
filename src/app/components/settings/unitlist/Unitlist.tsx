"use client"
import React from 'react'
import { useState } from 'react';
import DataTable from "@/app/components/datatable/DataTable"
import Addunit from "@/app/components/settings/popup/Addunit"
import { RiEdit2Fill } from "react-icons/ri"; 
import { MdDelete } from "react-icons/md"; 
import { BiCaretDown } from "react-icons/bi"; 
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { AnimatePresence } from 'framer-motion';

function Unitlist() {
 



function handleDelete(row: customerList): void {}


const Unit_description: columnHeader_dataTable = {
  accessorKey: "Description",
  header: "Description",
};
const Unit_name: columnHeader_dataTable = {
  accessorKey: "Unitname",
  header: "Unit Name",
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
          <Button variant="ghost" className="h-9   bg-blue-300  rounded-md">
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
  Unit_name,
  Unit_description,
  status,
  C_ACTION,
];
const [Unit, setUnit] = useState([
    {
        id: 1,
        Unitname: "Packets",
        Description: "Packet Information"
    },
    {
        id: 2,
        Unitname: "Grams",
        Description: "Grams Information"
    }
]);
const [popup,setPopup]=useState(false)
const user=(newUnit:any)=>{
    newUnit.id=Unit.length+1;
    setUnit([...Unit,newUnit])

}

   
    return (
        <div className="">
            <div className=" h-screen ">
                <AnimatePresence mode="wait" >

                {popup && <Addunit setPopup={setPopup}  user={user} />}
                </AnimatePresence>
               
           
                <div className="mx-auto w-[98%] bg-slate-100    mt-3">
                    <div className=" border p-3   rounded-md">
                        <div className="flex justify-between items-center p-3">
                            <h1 className='text-md tracking-[.2rem] font-extralight'>Unit List :-</h1>
                            <button onClick={()=>{setPopup(true)}}  type='submit' className='px-1 font-normal rounded-md  text-black border  hover:bg-white text-sm' > <span className='text-lg'>+</span>Add Unit</button>
                        </div>
                        <div className=" ">
                            <DataTable columns={c_columns} data={Unit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Unitlist
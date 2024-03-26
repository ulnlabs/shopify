"use client"
import React from 'react'
import DataTable from "@/app/components/settings/payment_type/DT-payment/PaymentData"
import { RiEdit2Fill } from "react-icons/ri"; 
import { MdDelete } from "react-icons/md"; 
import { BiCaretDown } from "react-icons/bi"; 
//for hint how do make your custom columns see line 137 or below to comment
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
import { useState } from "react";
import { Item } from '@radix-ui/react-accordion';

export const data=[
 {
     id: 1,
     payment_type:"Cash",
     status:"active"
},
{
   id: 2,
   payment_type:"Card",
   status:"active"
},
{
   id: 3,
   payment_type:"Paytm",
   status:"active"
},
{
   id: 4,
   payment_type:"Finance",
   status:"active"
},
{
   id: 5,
   payment_type:"UPI",
   status:"active"
},

]
function PaymentType() {

        
        
      
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
       Payment_type,
        status,
        C_ACTION,
      ];
    
      const [payment, setPayment] = useState(data);
      function handleDelete(row: any): void {
     setPayment(payment.filter((item)=>item.id==row.id))
   
        
        
       
        
    
      }
    
    return (
        <div className="">
            <div className=" h-screen ">
                
                <div className="mx-auto w-[95%] p-5 mt-3">
                    <div className=" border-t-2 border-violet-500 border-b-2   rounded-md">
                        <div className="flex justify-between p-3">
                            <h1 className='text-sm tracking-[.2rem] font-medium'>Payment Type List</h1>
                            <button type='button' className='p-2  font-medium rounded-md text-black border  hover:bg-violet-200 text-sm' > <span className='text-lg'>+</span>New Payment</button>
                        </div>
                        <div className=" ">
                            <DataTable columns={c_columns} data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default PaymentType
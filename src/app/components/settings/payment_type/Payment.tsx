"use client"
import React from 'react'
import DataTable from "../datatableforsettings/DataTable"
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
import { AnimatePresence } from 'framer-motion';
import AddPayment from '../popup/AddPayment';


function PaymentType() {

  const Payment_type: columnHeader_dataTable = {
    accessorKey: "payment_type",
    header: "Payment Type Name",
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

  const [payment, setPayment] = useState([{
    id: 1,
    payment_type: "Cash",
    status: "active"
  },
  {
    id: 2,
    payment_type: "Card",
    status: "active"
  },
  {
    id: 3,
    payment_type: "Paytm",
    status: "active"
  },

  ]
  );
  function handleDelete(row: any): void {
    setPayment(payment.filter((item) => item.id !== row.id))


  }

  const [Popup, setPopup] = useState(false);

  const newPayment = (newType: any) => {
    newType.id = payment.length + 1;
    setPayment([...payment, newType])

  }

  return (
    <div className="">
      <div className=" h-screen ">
        <AnimatePresence mode='wait'>
          {Popup && <AddPayment setPopup={setPopup} data={newPayment} />}
        </AnimatePresence>

        <div className="mx-auto w-[98%] p-5 mt-3">
          <div className=" border p-2  rounded-md">
            <div className="flex justify-between items-center p-3">
              <h1 className='text-md tracking-[.2rem] font-extralight'>Payment Type List :-</h1>
              <button type='button' onClick={() => { setPopup(true) }} className='px-1 font-normal rounded-md  text-black border  hover:bg-white text-sm' > <span className='text-lg'>+</span>New Payment</button>
            </div>
            <div className=" ">
              <DataTable columns={[Payment_type,
                status,
                C_ACTION,]} data={payment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentType
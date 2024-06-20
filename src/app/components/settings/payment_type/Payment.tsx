"use client"
import React, { useEffect } from 'react'
import DataTable from "../datatableforsettings/DataTable"
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
import { useState } from "react";
import { AnimatePresence } from 'framer-motion';
import AddPayment from '../popup/AddPayment';
import axios from 'axios';
import Edit_Payment from "@/app/components/settings/popup/EDit_Payment"


interface PaymentType {
  paymentId: String,
  paymentName: String,
  paymentStatus: boolean

}
function PaymentType() {
  const [payment, setpayment] = useState<PaymentType[]>([]);
  const [popup, setpopup] = useState<boolean | null>(false)
  const [edit, setEdit] = useState<boolean | null>(false)
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/paymentList");
        if (response.data) {
          setpayment(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const updatepaymentStatus = async (paymentId: string, status: boolean) => {

    try {
      const response = await axios.put('/api/paymentList', {
        paymentId,
        paymentStatus: status
      });

      if (response.status === 200) {
        setpayment(prevpayment =>
          prevpayment.map(payment =>
            payment.paymentId === paymentId ? { ...payment, paymentStatus: status } : payment
          )
        );
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };


  const handleDelete = async (paymentId: String) => {
    try {
      const response = await axios.delete('/api/paymentList', {
        data: { paymentId }
      });

      if (response.status === 200) {
        setpayment(prevpayment => prevpayment.filter(payment => payment.paymentId !== paymentId));
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };


  const handleEdit = async (paymentId: string, paymentName: string, paymentStatus: boolean) => {
    const paymentData = { paymentId, paymentName, paymentStatus };
    setSelectedPayment(paymentData);
    setEdit(true);
  }
  const updatepayment = async (paymentId: String, updatedData: any) => {
    try {
      console.log(paymentId, updatedData);

      const response = await axios.put('/api/paymentList', {
        paymentId,
        ...updatedData
      });

      if (response.status === 200) {
        setpayment(prevpayment =>
          prevpayment.map(payment =>
            payment.paymentId === paymentId ? { ...payment, ...updatedData } : payment
          )
        );
      }
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const Payment_type: columnHeader_dataTable = {
    accessorKey: "paymentName",
    header: "Payment Type Name",
  };

  const status = {
    accessorKey: "paymentStatus",
    cell: ({ row }: any) => {
      return (
        <button
          className={` ${row.original.paymentStatus ? "bg-green-500 p-2 rounded-md text-white" : "bg-red-500 p-2 rounded-md text-white"}`}
          onClick={() => updatepaymentStatus(row.original.paymentId, !row.original.paymentStatus)}
        >
          {row.original.paymentStatus ? "Active" : "Inactive"}
        </button>
      )
    }
  };
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
              handleEdit(row.original.paymentId, row.original.paymentName, row.original.paymentStatus)
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
              handleDelete(row.original.paymentId);
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
  const user = (Newpayment: PaymentType) => {
    setpayment([...payment, Newpayment as PaymentType]);
    console.log("payment data :", payment);
  }



  return (
    <div className="">
      <div className=" h-screen ">
        <AnimatePresence mode='wait'>
          {popup && <AddPayment close={setpopup} dataset={user} /> || edit && <Edit_Payment close={setEdit} selectedpayment={selectedPayment} updatedData={updatepayment} />}
        </AnimatePresence>

        <div className="mx-auto w-[98%] p-5 mt-3">
          <div className=" border p-2  rounded-md">
            <div className="flex justify-between items-center p-3">
              <h1 className='text-md tracking-[.2rem] font-extralight'>Payment Type List :-</h1>
              <button type='button' onClick={() => { setpopup(true) }} className='px-1 font-normal rounded-md  text-black border  hover:bg-white text-sm' > <span className='text-lg'>+</span>New Payment</button>
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
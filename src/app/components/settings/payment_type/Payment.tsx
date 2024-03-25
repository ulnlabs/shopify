"use client"
import React from 'react'
import { useState } from 'react';
import DataTable from "@/app/components/settings/taxlist//DT_Tax/Taxdata"
import { c_columns } from "@/app/components/settings/payment_type/DT-payment/P-column";


function PaymentType() {
    const [Payment, setPayment] = useState([
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
        
      ]);
    
    return (
        <div className="">
            <div className=" h-screen ">
                
                <div className="mx-auto w-[95%] p-5 mt-3">
                    <div className=" border-t-2 border-violet-500 border-b-2   rounded-md">
                        <div className="flex justify-between p-3">
                            <h1 className='text-sm tracking-[.2rem] font-medium'>Payment Type List</h1>
                            <button type='submit' className='p-2  font-medium rounded-md text-black border  hover:bg-violet-200 text-sm' > <span className='text-lg'>+</span>New Payment</button>
                        </div>
                        <div className=" ">
                            <DataTable columns={c_columns} data={Payment} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default PaymentType
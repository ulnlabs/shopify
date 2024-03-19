"use client"
import React from 'react'
import { useState } from 'react';
import DataTable from "@/app/components/settings/taxlist/DT_Tax/Taxdata"
import { c_columns } from "@/app/components/settings/taxlist/DT_Tax/T-column";


  // Function to delete a currency from the list

function Taxlist() {
    const [Tax, setTax] = useState([
        {
          id: 1,
          taxname:"SGST 9%",
          taxpercentage:"9.00"
        },
        {
          id: 2,
          taxname:"IGST 9%",
          taxpercentage:"9.00"
        },
        {
          id: 3,
          taxname:"SGST 4.5%",
          taxpercentage:"4.50"
        },
      ]);
    
      
    return (
        <div className="">
            <div className=" h-screen ">
                
                <div className="mx-auto w-[95%] p-5 mt-3">
                    <div className=" border-t-2 border-violet-500 border-b-2   rounded-md">

                        <div className="flex justify-between p-3">
                            <h1 className='text-sm tracking-[.2rem] font-medium'>Tax List</h1>
                            <button type='submit' className='p-2  font-bold rounded-md text-black border  hover:bg-violet-200 text-sm' > <span className='text-lg'>+</span>Add Tax</button>
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
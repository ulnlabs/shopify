"use client"
import React from 'react'
import { useState } from 'react';
import DataTable from "@/app/components/settings/taxlist/DT_Tax/Taxdata"
import { c_columns } from "@/app/components/settings/unitlist/DT_unit/U-column";


function Unitlist() {
    const [Unit, setUnit] = useState([
        {
              id: 1,
              unitname:"Packets",
              description:"Packet Information"
        },
        {
            id: 2,
            unitname:"Grams",
            description:"Grams Information"
      }
        
      ]);
    
    return (
        <div className="">
            <div className=" h-screen ">
                
                <div className="mx-auto w-[95%] p-5 mt-3">
                    <div className=" border-t-2 border-violet-500 border-b-2   rounded-md">
                        <div className="flex justify-between p-3">
                            <h1 className='text-sm tracking-[.2rem] font-medium'>Unit List</h1>
                            <button type='submit' className='p-2  font-medium rounded-md text-black border  hover:bg-violet-200 text-sm' > <span className='text-lg'>+</span>Add Unit</button>
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
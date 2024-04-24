"use client"
import React from 'react'
import { c_columns } from './Expired_col';
import DataTable from '../purchasereport/Datatable';
import DateCalender from "@/app/components/calender/DateCalender"

import { useState } from 'react';
import { MdOutlineMenuOpen } from "react-icons/md";


function Purchasereprot() {
    const [Payment, setPayment] = useState([
      
    ]
    )

    return (
        <div className="w-[100%] flex justify-center items-center flex-col">
            <div className="w-[98%] border border-t-2 border-t-violet-300">
                <div className="p-2 font-medium  border-b-[1px]  border-b-slate-400/10 ">
                    <h2>Please Enter Correct Information</h2>
                </div>
                <div className="">
                    <form action="" className=' border-b-[1px] border-b-slate-400/10 grid  grid-col-1 lg:grid-cols-2 gap-y-1  p-2'>
                    <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
                            <label htmlFor="" className='mr-2 md:col-span-5 col-span-12 '>
                                Item Name :
                            </label>
                            <input type="text" className=' border rounded-md h-9 md:col-span-6 col-span-12 ' />

                        </div>
                       
                        <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-10 ">
                            <label htmlFor="" className='mr-2 md:col-span-5 col-span-12 '>
                                To Date:
                            </label>
                            <div className=" h-8 md:col-span-6 col-span-12 ">
                                
                            <DateCalender  />
                            </div>

                        </div>
                       

                    </form>
                    <div className=" w-full flex gap-5 justify-center  p-2">
                        <button className='p-2 bg-green-400 rounded-md w-[120px]'>
                            Show
                        </button>
                        <button className='p-2 bg-orange-400 rounded-md w-[120px]'>
                            Close
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 border-t-[2px] p-2 w-full">
                <div className="flex justify-between ">
                    <div className=""></div>
                    <div className="flex items-center hover:bg-blue-300  cursor-pointer bg-blue-400 px-2 py-1 text-white rounded-md">
                        <MdOutlineMenuOpen />
                        <button className=''><span></span> Export</button>
                    </div>
                </div>
                <div className=" mt-3">

                    <DataTable columns={c_columns} data={Payment} />
                </div>



            </div>
        </div>

    )
}

export default Purchasereprot
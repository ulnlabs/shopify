"use client"
import React from 'react'
import DataTable from "@/app/components/datatable/DataTable"

function Taxlists() {
    return (
        <div className="">
            <div className=" h-screen ">
                
                <div className="mx-auto w-[95%] mt-3">
                    <div className=" border-t-2 bg-slate-300 border-violet-500   rounded-md">

                        <div className="flex justify-between p-3">
                            <h1 className='text-sm tracking-[.2rem]'>Unit List</h1>
                            <button type='submit' className='p-1 bg-[var(--button)] rounded-md text-white text-sm' > + New Unit</button>
                        </div>
                        <div className="flex justify-between p-2">
                            <div className=""></div>
                            <div className="flex gap-2 ">
                                <label htmlFor="" className='text-sm'>
                                    Search :
                                </label>
                                <input type="text" className='border w-[10rem] rounded-sm border-gray-3' />
                            </div>
                        </div>
                        <div className=" ">
                           



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Taxlists
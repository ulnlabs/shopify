import React from 'react'
import { useState } from 'react';
import { MdOutlineMenuOpen } from "react-icons/md";
import DataTable from '@/app/components/reports/purchasereport/Datatable'
import { c_columns } from './Item_col';


function SupplierPayments() {
    const [Payment, setPayment] = useState([
       
    ]
    )
    return (
        <div className="">
                <div className="">
                    <form action="" className='flex items-center gap-2'>
                        <label htmlFor="ItemName" className='text-base font-normal'>
                            Item Name :

                        </label>
                        <input type="text" id='ItemName' className='border h-9 rounded-md'/>

                    </form>
                </div>
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
    )
}

export default SupplierPayments
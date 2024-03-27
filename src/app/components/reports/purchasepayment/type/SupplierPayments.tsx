import React from 'react'
import { useState } from 'react';
import { MdOutlineMenuOpen } from "react-icons/md";
import DataTable from '@/app/components/reports/purchasereport/Datatable'
import { c_columns } from './Supplier_col';


function SupplierPayments() {
    const [Payment, setPayment] = useState([
       
    ]
    )
    return (
        <div className="">
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
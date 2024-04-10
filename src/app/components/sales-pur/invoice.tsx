'use client'
import React from 'react'
import DataTable from '../datatable/DataTable'
interface invoiceType {
    date: Date | any
    customer: string | number | any
    invoiceId:string | any
}
function invoice({date,customer,invoiceId}:invoiceType) {
    const DATE: columnHeader_dataTable = {
        accessorKey: "date",
        header: "DATE",
    };
    const 
  return (
    <div>
        <div className='bg-blue-300 w-[100%] p-3 flex  justify-between'>
           <h1>Sales Invoice</h1> 
           <p>Date:{date}</p>
        </div>
        <div className='w-[100%] p-2 flex  justify-between'>
            <div>
                <p>From</p>
                <p>{customer.name}</p>
                <p>{customer.address}</p>
                <p>{customer.mobile}</p>
                <p>{customer.email}</p>
                <p>{customer.gstNumber}</p>
                <p>{customer.vatNumber}</p>
            </div>
            <div>
                <p>Invoice #{invoiceId}</p>
            </div>
            <div>
                <DataTable 
                
                />
            </div>
        </div>
    </div>
  )
}

export default invoice
'use client'
import React from 'react'
import DataTable from '../datatable/DataTable'
interface invoiceType {
    date: Date | any
    customer: string | number | any
    invoiceId:string | any
}
function invoice({date,customer,invoiceId}:invoiceType) {
    const sampleData = [
        {
            s_no: 1,
            item_name: "Item 1",
            unit_price: 100,
            quantity: 2,
            net_cost: 200,
            tax: 10,
            tax_amount: 20,
            discount: 5,
            discount_amount: 10,
            unit_cost: 50,
        },
        {
            s_no: 2,
            item_name: "Item 2",
            unit_price: 500,
            quantity: 1,
            net_cost: 800,
            tax: 10,
            tax_amount: 60,
            discount: 5,
            discount_amount: 10,
            unit_cost: 90,
        },
        {
            s_no: 2,
            item_name: "Item 2",
            unit_price: 500,
            quantity: 1,
            net_cost: 800,
            tax: 10,
            tax_amount: 60,
            discount: 5,
            discount_amount: 10,
            unit_cost: 90,
        },


       
    ]
    const S_NO: columnHeader_dataTable = {
        accessorKey: "s_no",
        header: "S.No",
    };
    const ITEM_NAME: columnHeader_dataTable = {
        accessorKey: "item_name",
        header: "Item Name",
      };
      const UNIT_PRICE: columnHeader_dataTable = {
        accessorKey: "unit_price",
        header: "Unit Price",
      };
      const QUANTITY: columnHeader_dataTable = {
        accessorKey: "quantity",
        header: "Quantity",
      };
      const NET_COST: columnHeader_dataTable = {
        accessorKey: "net_cost",
        header: "Net Cost",
      };
      const TAX: columnHeader_dataTable = {
        accessorKey: "tax",
        header: "Tax",
      };
      const TAX_AMOUNT: columnHeader_dataTable = {
        accessorKey: "tax_amount",
        header: "Tax Amount",
      };
      const DISCOUNT: columnHeader_dataTable = {
        accessorKey: "discount",
        header: "Discount",
      };
       const DISCOUNT_AMOUNT: columnHeader_dataTable = {
        accessorKey: "discount_amount",
        header: "Discount Amount",
      }; 
      const UNIT_COST: columnHeader_dataTable = {
        accessorKey: "unit_cost",
        header: "Unit Cost",
      };
  return (
    <div className=''>
        <div className='bg-blue-300 w-[100%] p-3 flex  justify-between'>
           <h1>Sales Invoice</h1> 
           <p>Date:{date}</p>
        </div>
        <div className="flex w-[100%] flex-col">
            <div className="w-full flex justify-between">
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
            </div>
            <div>
               <DataTable columns={[S_NO,ITEM_NAME,UNIT_PRICE,QUANTITY,NET_COST,TAX,TAX_AMOUNT,DISCOUNT,DISCOUNT_AMOUNT,UNIT_COST]} final data={sampleData}  />
            </div>
        </div>
    </div>
  )
}

export default invoice
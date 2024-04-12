'use client'
import React from 'react'
import DataTable from '../datatable/DataTable'
import totalAmount from "../datatable/DataTable"
interface invoiceType {
  date: Date | any
  customer: string | number | any
  invoiceId: string | any
  discountAll: number | any
  otherCharges: number | any
}
function invoice({ date, customer, invoiceId, discountAll, otherCharges }: invoiceType) {
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
      total_amount: 3747,
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
      total_amount: 4500,
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
      total_amount: 450,
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
  const TOTAL_AMOUNT: columnHeader_dataTable = {
    accessorKey: "total_amount",
    header: "Total Amount",
  }
  const totalPrice = sampleData.reduce((total, Item: any) => total + Item.unit_price, 0)
  const totalQuantity = sampleData.reduce((total, Item: any) => total + Item.quantity, 0)
  const totalTaxAmount = sampleData.reduce((total, Item: any) => total + Item.tax_amount, 0)
  const totalDisAmount = sampleData.reduce((total, Item: any) => total + Item.discount_amount, 0)
  const totalAmount = sampleData.reduce((total, Item: any) => total + Item.total_amount, 0)
  const discountamount=totalAmount / 100 * discountAll;
  const grandTotal = totalAmount -discountamount + otherCharges

  return (
    <div className="">
      <div className=" w-full p-3  text-xl font-medium">
        <h1>Invoice :-</h1>
      </div>

      
    <div className='flex justify-center mt-3'>
     
      <div className="w-[95%]">

      <div className='border-b-2 w-[100%] p-3 flex  justify-between'>
        <h1>Sales Invoice</h1>
        <p>Date:{date}</p>
      </div>
      <div className="flex w-[100%] p-4 flex-col">
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
          <DataTable columns={[S_NO, ITEM_NAME, UNIT_PRICE, QUANTITY, NET_COST, TAX, TAX_AMOUNT, DISCOUNT, DISCOUNT_AMOUNT, UNIT_COST, TOTAL_AMOUNT]} final data={sampleData} totalPrice={totalPrice} totalQuantity={totalQuantity} totalTaxAmount={totalTaxAmount} totalDisAmount={totalDisAmount} totalAmount={totalAmount} />
        </div>
        <div className="w-full flex flex-col gap-2 text-base font-semibold mt-4">
          <div className="">
            <p>Discount on All :{discountAll}%</p>
            <p>Note :{}</p>
          </div>
          <div className="">
            <p>SubTotal : ₹{totalAmount}</p>
            <p>Other Charges : ₹{otherCharges}</p>
            <p>Discount on All :{discountAll}%</p>
            <p>Grand Total : ₹{grandTotal}</p>
          </div>
          <div className="flex gap-3 p-2">

          <button className='bg-blue-400 p-2 rounded-md'>Edit</button>
          <button className='bg-green-400  p-2 rounded-md'>Print</button>
          <button className='bg-red-400  p-2 rounded-md'>PDF</button>
          <button className='bg-yellow-400  p-2 rounded-md'>Sales Return</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default invoice
'use client'
import React from 'react'
import DataTable from '../datatable/DataTable'
import totalAmount from "../datatable/DataTable"
import { columnHeader_dataTable } from '../../../../global'
interface invoiceType {
  date: Date | any
  customer: string | number | any
  invoiceId: string | any
  discountAll: number | any
  otherCharges: number | any
  itemList: [any]
}
function invoice({ date, customer, invoiceId, discountAll, otherCharges, itemList }: invoiceType) {
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
      item_name: "Item 3",
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
    accessorKey: "itemName",
    header: "Item Name",
  };
  const UNIT_PRICE: columnHeader_dataTable = {
    accessorKey: "price", 
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
  const SI_NO: columnHeader_dataTable = {
    accessorKey: "si_no",
    header : "SI.NO"
  };
  const DATE: columnHeader_dataTable = {
    accessorKey: "date",
    header: "Date"
  };
  const PAYMENT_TYPE: columnHeader_dataTable = {
    accessorKey: "payment_type",
    header: "Payment Type"
  };
  const PAYMENT_NOTE: columnHeader_dataTable = {
    accessorKey: "payment_note",
    header: "Payment Note"
  };
  const PAYMENT: columnHeader_dataTable ={
    accessorKey: "payment",
    header: "Payment"
  };
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  console.log(year);
  
  
  const totalPrice = sampleData.reduce((total, Item: any) => total + Item.unit_price, 0)
  const totalQuantity = sampleData.reduce((total, Item: any) => total + Item.quantity, 0)
  const totalTaxAmount = sampleData.reduce((total, Item: any) => total + Item.tax_amount, 0)
  const totalDisAmount = sampleData.reduce((total, Item: any) => total + Item.discount_amount, 0)
  const totalAmount = sampleData.reduce((total, Item: any) => total + Item.total_amount, 0)
  const discountamount=totalAmount / 100 * discountAll;
  const grandTotal = totalAmount -discountamount + otherCharges


  const sampleInformation = [
    {
      si_no: 1,
      date: `${day}/${month}/${year}`,
      payment_type: "Cash",
      payment_note: "Paid By Cash",
      payment: totalAmount,
    },
  ]


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
        <div className="w-full flex md:flex-row flex-col justify-between md:gap-0 gap-3">
          <div>
            <p>From</p>
            <p>{customer.name}</p>
            <p>{customer.address}</p>
            <p>{customer.mobile}</p>
            <p>{customer.email}</p>
            <p>{customer.gstNumber}</p>
            <p>{customer.vatNumber}</p>
          </div>
          <div className="">
            <p>Customer Details</p>
            <p>Walk-in Customer</p>
          </div>
          <div>
            <p>Invoice #{invoiceId}</p>
          </div>
        </div>
        <div>
          <DataTable columns={[S_NO, ITEM_NAME, UNIT_PRICE, QUANTITY, NET_COST, TAX, TAX_AMOUNT, DISCOUNT, DISCOUNT_AMOUNT, UNIT_COST, TOTAL_AMOUNT]} data={sampleData} />
        </div>
        <div className="w-full flex flex-col gap-2 text-base font-semibold mt-4">
          <div className="">
            <p>Discount on All :{discountAll}%</p>
            <p>Note :{}</p>
          </div>
          <div className="">
            <h3 className="text-xl">Payment Information :</h3>
            <DataTable columns={[SI_NO, DATE, PAYMENT_TYPE, PAYMENT_NOTE, PAYMENT]} data={sampleInformation} />
          </div>
          <div className="pt-3">
            <p>SubTotal : ₹{totalAmount}</p>
            <p>Other Charges : ₹{otherCharges}</p>
            <p>Discount on All :{discountAll}%</p>
            <p>Grand Total : ₹{grandTotal}</p>
          </div>
          <div className="w-full flex gap-3 flex-wrap mt-2 ">

          <button className='bg-blue-400 px-2 py-3 rounded-md'>Edit</button>
          <button className='bg-green-400  px-2 py-3 rounded-md'>Print</button>
          <button className='bg-red-400  px-2 py-3 rounded-md'>PDF</button>
          <button className='bg-yellow-400  px-2 py-3 rounded-md'>Sales Return</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default invoice
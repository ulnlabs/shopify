'use client'

import React, { useContext } from 'react'
import Invoice from '@/app/components/sales-pur/invoice'
import { ContextData } from '../../../../../contextapi';
import DashboardHeader from '@/app/components/dashboard/DashboardHeader';
import Link from 'next/link';

function page() {

  const { salesRecord } = useContext(ContextData)

  const { s_id, items: itemList, paymentType, otherCharges, discount: discountAll, discountType, taxType, note, c_id, salesCode: invoiceId, date, total, status } = salesRecord;

  console.log(status);

  console.log(itemList);




  return (
    <div className='w-[100%] h-fit'>
      <DashboardHeader title="Sales" subtitle={"Invoice"} />
      {salesRecord && itemList && status && c_id ?
        <Invoice date={date} total={total} status={status} c_id={c_id} isSales={true} discountType={discountType} taxType={taxType} paymentType={paymentType} note={note} itemList={itemList} invoiceId={invoiceId} discountAll={discountAll} otherCharges={otherCharges} />
        : <div className=" bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold text-red-500">Something Went Wrong</h1>
          <p className="text-gray-700 mt-2">Please Checkout the sale Details in sales List</p>
          <Link href="/sales/sales-list" className="bg-blue-500 hover:bg-blue-700 mt-4 text-white px-2 py-1 rounded-md font-medium">Okay</Link>
        </div>
      }
    </div>
  )
}

export default page
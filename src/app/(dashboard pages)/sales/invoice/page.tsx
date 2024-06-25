'use client'

import React, { useContext } from 'react'
import Invoice from '@/app/components/sales-pur/invoice'
import { ContextData } from '../../../../../contextapi';
import DashboardHeader from '@/app/components/dashboard/DashboardHeader';

function page() {

  const { salesRecord } = useContext(ContextData)

  const { c_name, s_id, items: itemList, paymentType, otherCharges, discount: discountAll, discountType, taxType, note, c_id, salesCode: invoiceId, _id, date, total, status } = salesRecord;

  console.log(status);

  console.log(itemList);
  console.log(c_name);



  return (
    <div className='w-[100%] h-fit'>
      <DashboardHeader title="Sales" subtitle={"Invoice"} />
      <Invoice date={date} total={total} status={status} c_id={c_id}  isSales={true} discountType={discountType} customerName={c_name} taxType={taxType} paymentType={paymentType} note={note} itemList={itemList} invoiceId={invoiceId} discountAll={discountAll} otherCharges={otherCharges} />
    </div>
  )
}

export default page
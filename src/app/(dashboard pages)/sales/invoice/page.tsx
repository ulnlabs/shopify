'use client'

import React, { useContext } from 'react'
import Invoice from '@/app/components/sales-pur/invoice'
import { ContextData } from '../../../../../contextapi';

function page() {

  const { salesRecord } = useContext(ContextData)

  const { c_name, items: itemList, paymentType, otherCharges, discount: discountAll, discountType, taxType, note, c_id, salesCode: invoiceId, _id, date, total } = salesRecord;


  console.log(itemList);
  console.log(c_name);



  return (
    <div className='w-[100%] h-fit'>
      <Invoice date={date} total={total} isSales={true} discountType={discountType} customerName={c_name} taxType={taxType} paymentType={paymentType} note={note} itemList={itemList} invoiceId={invoiceId} discountAll={discountAll} otherCharges={otherCharges} />
    </div>
  )
}

export default page
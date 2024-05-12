'use client'

import React, { useContext } from 'react'
import Invoice from '@/app/components/sales-pur/invoice'
import { ContextData } from '../../../../../contextapi';

function page() {

  const { salesRecord } = useContext(ContextData)

  const { c_name, items:itemList, paymentType, otherCharges, discount: discountAll, discountType, taxType, note, c_id, salesCode:invoiceId } = salesRecord;


  const date = "12-12-2022";
  const customer = {
    name: "Deepath",
    address: "Hyderabad",
    mobile: 1234567890,
    email: "g7vRb@example.com",
    gstNumber: "1234567890",
    vatNumber: "1234567890",
  }



  return (
    <div className='w-[100%] h-fit'>
      <Invoice date={date} customer={customer} itemList={itemList} invoiceId={invoiceId} discountAll={discountAll} otherCharges={otherCharges} />
    </div>
  )
}

export default page
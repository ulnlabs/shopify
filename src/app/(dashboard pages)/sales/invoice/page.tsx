import React from 'react'
import Invoice from '@/app/components/sales-pur/invoice'

function page() {

    const date = "12-12-2022";
    const customer = {
        name : "Deepath",
        address : "Hyderabad",
        mobile : 1234567890,
        email : "g7vRb@example.com",
        gstNumber : "1234567890",
        vatNumber : "1234567890",
    }
    const invoiceId = "SL077687";
  return (
    <div className='w-[100%] h-fit'>
     <Invoice date={date} customer={customer} invoiceId={invoiceId} />
    </div>
  )
}

export default page
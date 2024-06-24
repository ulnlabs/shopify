'use client'

import React, { useContext } from 'react'
import Invoice from '@/app/components/sales-pur/invoice'
import { ContextData } from '../../../../../contextapi';
import DashboardHeader from '@/app/components/dashboard/DashboardHeader';
import Link from 'next/link';

function page() {

    const { purhcaseRecord } = useContext(ContextData)

    const { s_name, items: itemList, paymentType, otherCharges, discount: discountAll, discountType, taxType, note, s_id, purchaseCode: invoiceId, _id, date, total, status } = purhcaseRecord;
    console.log(purhcaseRecord);
    console.log(status);
    console.log(itemList);
    console.log(s_name);
    return (
        <div className='w-[100%] h-fit'>
            <DashboardHeader title="Purchasae" subtitle={"Invoice"} />
            {purhcaseRecord && itemList && status && s_id ? <Invoice date={date} total={total} status={status} s_id={s_id} isSales={false} discountType={discountType} taxType={taxType} paymentType={paymentType} note={note} itemList={itemList} invoiceId={invoiceId} discountAll={discountAll} otherCharges={otherCharges} />
                : <div className=" bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-semibold text-red-500">Something Went Wrong</h1>
                    <p className="text-gray-700 mt-2">Please Checkout The Purchase Details in Purchase List</p>
                    <Link href="/purchases/purchase-list" className="bg-blue-500 hover:bg-blue-700 mt-4 text-white px-2 py-1 rounded-md font-medium">Okay</Link>
                </div>
            }
        </div>
    )
}

export default page
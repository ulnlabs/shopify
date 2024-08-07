'use client'

import React, { useContext } from 'react'
import Invoice from '@/app/components/sales-pur/invoice'
import { ContextData } from '../../../../../contextapi';
import DashboardHeader from '@/app/components/dashboard/DashboardHeader';

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
            <Invoice date={date} total={total} status={status} s_id={s_id} isSales={false} discountType={discountType} customerName={s_name} taxType={taxType} paymentType={paymentType} note={note} itemList={itemList} invoiceId={invoiceId} discountAll={discountAll} otherCharges={otherCharges} />
        </div>
    )
}

export default page
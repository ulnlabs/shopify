"use client"
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'

function page() {
  const [showCustomer, setShowCustomer] = useState<boolean | undefined>(false)
  const [customer, setCustomer] = useState<string | undefined>("")
  return (
    <div className='w-full min-h-screen px-4 py-2'>
      <DashboardHeader title='Sales Invoice' breadcrumb={[{ title: "new-sales", path: '/sales/new-sales' }, { title: 'pos', path: '/sales/pos' }]} />
      <div className="flex justify-between">
        <div className="w-1/2 h-fit">
          <div className="flex item-center justify-between py-4">
            <div className="flex items-center gap-2 ">
              <AiOutlineUser className='text-xl' />
              <div className="relative px-1 flex flex-col items-center w-fit rounded-md border">
                <input type="text" name="customersearch" onChange={(e) => { setShowCustomer(true); setCustomer(e.target.value) }} id="" className='w-full p-1 px-2  outline-none ' />
                {
                  (showCustomer && customer) && (
                    <div className="flex flex-col rounded-md bg-white border absolute top-full mt-2 z-[10] w-[100%] h-fit p-2 text-sm">
                      jjhfuy
                    </div>
                  )
                }
              </div>
              <Link href={""}>
                <AiOutlineUserAdd className='text-xl' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
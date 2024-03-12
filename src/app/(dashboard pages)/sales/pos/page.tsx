"use client"
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineBarcode, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
const customerData = [
  {
    name: 'Customer',
    value: 'Customer'
  },
  {
    name: 'Customer 1',
    value: 'Customer 1'
  }, {
    name: 'Customer 2',
    value: 'Customer 2'
  }, {
    name: 'Customer 3',
    value: 'Customer 3'
  }
]
function page() {
  const [showCustomer, setShowCustomer] = useState<boolean | undefined>(false)
  const [customer, setCustomer] = useState<string | undefined>("")
  return (
    <div className='w-full min-h-screen px-4 py-2'>
      <DashboardHeader title='Sales Invoice' breadcrumb={[{ title: "new-sales", path: '/sales/new-sales' }, { title: 'pos', path: '/sales/pos' }]} />
      <div className="flex justify-between">
        <div className="w-1/2 h-fit">
          <div className="flex justify-evenly items-center py-4">
            <div className="flex items-center gap-2 w-fit  border rounded-lg">
              <AiOutlineUser className='text-xl' />
              <div className="relative px-1 flex flex-col items-center w-fit rounded-md ">
                <input type="text" name="customersearch" onChange={(e) => { setShowCustomer(true); setCustomer(e.target.value) }} id="" className='w-full p-1 px-2  outline-none bg-gray-100 m-1 ' />
                {
                  (showCustomer && customer) && (
                    <div className="flex flex-col rounded-md bg-white border absolute top-full mt-2 z-[10] w-[100%] h-fit p-2 text-sm">
                      {
                        customerData.filter((item, i) => {
                          return item.value.toLowerCase().includes(customer.toLowerCase())
                        }).map((item, index) => {
                          return (
                            <button key={index} onClick={() => {
                              setCustomer(item.value.toLowerCase())
                              setShowCustomer(false)
                            }}>
                              {item.name}
                            </button>
                          )
                        })
                      }
                    </div>
                  )
                }
              </div>
              <Link href={""}>
                <AiOutlineUserAdd className='text-xl' />
              </Link>
            </div>
            <div className="flex items-center gap-2 w-fit  border rounded-lg">
              <AiOutlineBarcode className='text-xl' />
              <div className="relative px-1 flex flex-col items-center w-fit rounded-md ">
                <input type="text" name="customersearch" onChange={(e) => { setShowCustomer(true); setCustomer(e.target.value) }} id="" className='w-full p-1 px-2  outline-none bg-gray-100 m-1 ' />
                {
                  (showCustomer && customer) && (
                    <div className="flex flex-col rounded-md bg-white border absolute top-full mt-2 z-[10] w-[100%] h-fit p-2 text-sm">
                      {
                        customerData.filter((item, i) => {
                          return item.value.toLowerCase().includes(customer.toLowerCase())
                        }).map((item, index) => {
                          return (
                            <button key={index} onClick={() => {
                              setCustomer(item.value.toLowerCase())
                              setShowCustomer(false)
                            }}>
                              {item.name}
                            </button>
                          )
                        })
                      }
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
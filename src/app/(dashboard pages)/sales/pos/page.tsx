"use client"
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineBarcode, AiOutlineMinus, AiOutlinePlus, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import { Selector } from '@/app/components/Custom-shadcn-components/Selector'
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
const cols: string[] = ['Item name', 'Quantity', 'Price', 'Discount', 'Tax', 'Sub Total ', 'remove']
const product: string[] = ['Item name', 'Price']
const data: any[] = [
  {
    itemname: 'iphone',
    discount: 20,
    quantity: 2,
    price: 800,
    subtotal: 3900,
    tax: 30
  },
  {
    itemname: 'iphone',
    discount: 20,
    quantity: 2,
    price: 800,
    subtotal: 3900,
    tax: 30
  }
  ,
  {
    itemname: 'iphone',
    discount: 20,
    quantity: 2,
    price: 800,
    subtotal: 3900,
    tax: 30
  }
]
function page() {
  const [showCustomer, setShowCustomer] = useState<boolean | undefined>(false)
  const [customer, setCustomer] = useState<string | undefined>("")
  const [categories, setCategories] = useState<string>("")
  useEffect(() => {
    console.log(categories);

  }, [categories])
  return (
    <div className='w-full min-h-screen px-4 py-2'>
      <div className="py-2">
        <DashboardHeader title='Sales Invoice' breadcrumb={[{ title: "new-sales", path: '/sales/new-sales' }, { title: 'pos', path: '/sales/pos' }]} />
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="h-fit">
          <div className="flex justify-evenly items-center gap-2 py-4">
            <div className="flex items-center gap-2 w-fit  border rounded-lg px-2">
              <AiOutlineUser className='text-xl' />
              <div className="relative px-1 flex flex-col items-center w-fit rounded-md ">
                <input type="text" name="customersearch" onChange={(e) => { setShowCustomer(true); setCustomer(e.target.value) }} id="" className='w-full p-1 px-2  outline-none bg-gray-100 m-1 rounded-lg ' />
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
            <div className="flex items-center gap-2 w-fit  border rounded-lg px-2">
              <AiOutlineBarcode className='text-xl' />
              <div className="relative px-1 flex flex-col items-center w-fit rounded-md ">
                <input type="text" name="customersearch" onChange={(e) => { setShowCustomer(true); setCustomer(e.target.value) }} id="" className='w-full p-1 px-2  outline-none bg-gray-100 m-1 rounded-lg ' />
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
          <div className="grid grid-cols-1 gap-4 items-center">
            <div className="bg-gray-50 border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className='bg-white'>
                    {
                      cols.map((item, index) => {
                        return (
                          <TableHead key={index}>{item}</TableHead>
                        )
                      })
                    }
                  </TableRow>
                </TableHeader>
                <TableBody className='overflow-y-scroll scrollbar-hide '>
                  {
                    data.map((data, index) => {
                      return (
                        <TableRow key={index} className='h-fit'>
                          <TableCell>{data.itemname}</TableCell>
                          <TableCell className='w-fit'>
                            <div className="flex items-center justify-between gap-1 border rounded p-1">
                              <AiOutlinePlus className='cursor-pointer' />
                              <p>{data.quantity}</p>
                              <AiOutlineMinus className='cursor-pointer' />
                            </div>
                          </TableCell>
                          <TableCell>₹{data.price}</TableCell>
                          <TableCell>{data.discount}%</TableCell>
                          <TableCell>₹{data.tax}</TableCell>
                          <TableCell>₹{data.subtotal}</TableCell>
                          <TableCell><button className='flex w-full items-center text-red-600 justify-center'><FaTrashAlt /></button></TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </div>
            <div className="w-full py-2 px-2 border bg-gray-50 grid grid-cols-3">
              <div className="flex flex-col items-center justify-center gap-1 px-2">
                <h1 className='text-md font-medium'>Quantity</h1>
                <h1 className=''>{0}</h1>
                <button className='w-full py-2 px-2 text-center bg-red-400 rounded-lg text-white'>Hold</button>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-2">
                <h1 className='text-md font-medium'>Total Discount</h1>
                <h1 className=''>₹{0}</h1>
                <button className='w-full py-2 px-2 text-center bg-green-400 rounded-lg text-white'>Cash</button>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-2">
                <h1 className='text-md font-medium'>Grant Total</h1>
                <h1 className=''>₹{0}</h1>
                <button className='w-full py-2 px-2 text-center bg-purple-400 rounded-lg text-white'>Pay All</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-4 py-4 flex-col items-center justify-start">
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="w-full">
              <Selector data={["goe", "ytfyuv", "iugkiuy"]} changeState={setCategories} currentstate={categories} commonTitle='All Catogories' />
            </div>
            <div className="w-full">
              <Selector data={["goe", "ytfyuv", "iugkiuy"]} changeState={setCategories} currentstate={categories} commonTitle='All Brand' />
            </div>
          </div>
          <div className="flex items-center justify-center border rounded-lg w-full py-1 mt-4 px-2 gap-2">
            <AiOutlineBarcode />
            <input type="text" placeholder='item name' className='w-full rounded bg-gray-100 px-2 py-1' />
          </div>
          <div className="bg-gray-100 rounded-lg w-full border mt-2">
            <Table>
              <TableHeader>
                <TableRow className='bg-white'>
                  {
                    product.map((item, index) => {
                      return (
                        <TableHead className='' key={index}>{item}</TableHead>
                      )
                    })
                  }
                  <TableHead className='text-center'>product</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='overflow-y-scroll scrollbar-hide'>
                {
                  data.map((data, index) => {
                    return (
                      <TableRow key={index} className='h-fit'>
                        <TableCell>{data.itemname}</TableCell>
                        <TableCell>₹{data.price}</TableCell>
                        <TableCell><button className='flex w-full items-center text-green-600 justify-center'><FaPlusCircle /></button></TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
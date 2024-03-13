'use client'
import { Selector } from '@/app/components/Custom-shadcn-components/Selector'
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React, { useState } from 'react'

export default function page() {
    const [brand, setBrand] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [unit, setUnit] = useState<string>("")
    const [tax, setTax] = useState<string>("")
    const [discountType, setDiscountType] = useState<string>("")
    return (
        <div className='w-full py-2 px-4'>
            <div className="py-2 w-full">
                <DashboardHeader title='New Item' subtitle='Add/Update Items' breadcrumb={[{ title: 'Dashboard', path: '/dashboard' }, { title: 'item List', path: '/items/list' }, { title: 'New item', path: '/items/new' },]} />
                <form action="" method="post" className='w-full'>
                    <div className="grid grid-cols-1 grid-row-4 w-full min-h-fit mt-4 border-t-2 border-[--primary] rounded-sm shadow p-4 place-items-stretch w-full">
                        <div className="grid lg:grid-cols-12 grid-cols-1 grid-rows-min border-b gap-6 py-4 ">
                            <div className=" grid-cols-1 lg:col-start-1 auto-rows-min  lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="itemcode">Item Code <span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Code' id='itemcode' className='border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="itemname">Item Name<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Name' id='itemname' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5 auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="brand">Brand</label>
                                <Selector commonTitle='Select Brand' changeState={setBrand} currentstate={brand} data={[]} />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="category">Category<span className='text-red-400'>*</span></label>
                                <Selector commonTitle='Select category' changeState={setCategory} currentstate={category} data={[]} />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="unit">Unit<span className='text-red-400'>*</span></label>
                                <Selector key={'unit'} commonTitle='Select Unit' changeState={setUnit} currentstate={unit} data={[]} />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5 auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="minimumQty">Minimum Qty.<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Qty.' id='minimumQty' className='border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="expireDate">Expire Date</label>
                                <input type="date" id='expireDate' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="barcode">Barcode</label>
                                <input type="text" placeholder='Barcode' id='barcode' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5 auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="description">Description</label>
                                <textarea id='description' placeholder='Description' className='border resize-none rounded-lg py-2 px-2 outline-none text-gray-800' ></textarea>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-12 grid-cols-1 grid-rows-3 border-b gap-6 py-4 ">
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="price">Price<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Price' id='price' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="tax">Tax<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Tax' id='tax' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="purchasePrice">Purchase Price<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Purchase Price' id='purchasePrice' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="taxType">Tax Type<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Tax Type' id='taxType' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="profitMargin">Profit Margin(%)<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Profit Margin(%)' id='profitMargin' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="salesPrice">Sales Price<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Sales Price' id='salesPrice' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="finalPrice">Final Price<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Final Price' id='finalPrice' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-12 grid-cols-1 grid-rows-min border-b gap-6 py-4 ">
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="discountType">Discount Type<span className='text-red-400'>*</span></label>
                                <Selector data={['Percentage', 'Fixed']} changeState={setDiscountType} currentstate={discountType} commonTitle='select discount type' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="discount">Discount<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Discount' id='discount' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-12 grid-cols-1 grid-rows-min border-b gap-6 py-4 ">
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="openingStock">Current Opening Stock<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Opening Stock' id='openingStock' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="adjustStock">Adjust Stock<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Adjust Stock' id='adjustStock' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="note">Adjustment Note<span className='text-red-400'>*</span></label>
                                <textarea id='note' className=' border resize-none  rounded-lg py-2 px-2 outline-none text-gray-800' rows={5} placeholder='Adjustment Note'></textarea>
                            </div>
                        </div>
                        <div className="w-full py-4">
                            <div className='w-full'>
                                <button onClick={() => alert('Saved')} className='bg-green-400 w-full px-4 py-2 rounded-lg text-white'>Save</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='w-full overflow-x-scroll  p-4 mt-4 rounded-lg shadow-md'>
                    <h1 className='text-2xl font-bold'>Opening Stock Adjustment Records</h1>
                    <table className='w-full mt-4 table-auto'>
                        <thead>
                            <tr className='border-b border-gray-100 rounded-lg'>
                                <th className='border px-4 py-2'>Date</th>
                                <th className='border px-4 py-2'>Opening Stock</th>
                                <th className='border px-4 py-2'>Adjustment</th>
                                <th className='border px-4 py-2'>Current Stock</th>
                                <th className='border px-4 py-2'>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Render records here */}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

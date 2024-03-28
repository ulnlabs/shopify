'use client'
import { Selector } from '@/app/components/Custom-shadcn-components/Selector'
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import useSWR from 'swr'
import { AnimatePresence, motion } from 'framer-motion'
export default function page() {
    const [brand, setBrand] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [unit, setUnit] = useState<string>("")
    const [tax, setTax] = useState<string>("")
    const [discountType, setDiscountType] = useState<string>("")
    type InventoryItem = {
        itemCode?: string
        itemName?: string
        brand?: string
        category?: string
        unit?: string
        minQty?: number
        expdate?: Date
        barcode?: string
        description?: string
        price?: number
        tax?: number
        purchaseprice?: number
        taxtype?: string
        profitmargin?: number
        saleprice?: number
        discountType?: number
        discount?: number
        currentstock?: number
    }
    const [formDetails, setFormDetails] = useState<InventoryItem>()

    const brandRoute = async () => {
        const res = await fetch('/api/brand', {
            method: 'PUT'
        })
        const data = await res.json()
        const brand = data.map((item: any) => {
            return item.name
        })
        console.log("arr", brand);
        return brand
    }
    const { data: brandData, error: brandError } = useSWR(
        '/api/brand', brandRoute
    )
    const [BrandPopupState, setBrandPopupState] = useState<boolean>(false)
    const addItemEvent = async (event:React.FormEvent) => {
        event.preventDefault();
        console.log(formDetails)
    }
    return (
        <div className='w-full py-2 px-4'>
            <div className="py-2 w-full relative">
                <AnimatePresence mode='wait'>
                    {
                        BrandPopupState && <BrandAddPopup close={setBrandPopupState} />
                    }
                </AnimatePresence>
                <DashboardHeader title='New Item' subtitle='Add/Update Items' breadcrumb={[{ title: 'Dashboard', path: '/dashboard' }, { title: 'item List', path: '/items/list' }, { title: 'New item', path: '/items/new' },]} />
                <form onSubmit={addItemEvent} action="" method="post" className='w-full'>
                    <div className="grid grid-cols-1 grid-row-4 min-h-fit mt-4 border-t-2 border-[--primary] rounded-sm shadow p-4 place-items-stretch w-full">
                        <div className="grid lg:grid-cols-12 grid-cols-1 grid-rows-min border-b gap-6 py-4 ">
                            <div className=" grid-cols-1 lg:col-start-1 auto-rows-min  lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="itemcode">Item Code <span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Code' id='itemcode' onChange={(e: any) => setFormDetails({ ...formDetails, itemCode: e.target.value })} className='border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="itemname">Item Name<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Name' onChange={(e: any) => setFormDetails({ ...formDetails, itemName: e.target.value })} id='itemname' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5 auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="brand">Brand</label>
                                <div className="w-full flex items-center justify-center">
                                    <Selector commonTitle='Select Brand' changeState={setBrand} currentstate={brand} data={brandData ? brandData : []} />
                                    <div className=" flex-1 p-3 border rounded cursor-pointer" onClick={() => setBrandPopupState(true)}>
                                        <AiOutlinePlus className='' />
                                    </div>
                                </div>
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
                                <input type="text" placeholder='Qty.' onChange={(e: any) => setFormDetails({ ...formDetails, minQty: e.target.value })} id='minimumQty' className='border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="expireDate">Expire Date</label>
                                <input type="date" id='expireDate' onChange={(e: any) => setFormDetails({ ...formDetails, expdate: e.target.value })} className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="barcode">Barcode</label>
                                <input type="text" onChange={(e: any) => setFormDetails({ ...formDetails, barcode: e.target.value })} placeholder='Barcode' id='barcode' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5 auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="description">Description</label>
                                <textarea id='description' onChange={(e: any) => setFormDetails({ ...formDetails, description: e.target.value })} placeholder='Description' className='border resize-none rounded-lg py-2 px-2 outline-none text-gray-800' ></textarea>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-12 grid-cols-1 grid-rows-3 border-b gap-6 py-4 ">
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="price">Price<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Price' onChange={(e: any) => setFormDetails({ ...formDetails, price: e.target.value })} id='price' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="tax">Tax<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Tax' onChange={(e: any) => setFormDetails({ ...formDetails, tax: e.target.value })} id='tax' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="purchasePrice">Purchase Price<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Purchase Price' onChange={(e: any) => setFormDetails({ ...formDetails, purchaseprice: e.target.value })} id='purchasePrice' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="taxType">Tax Type<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Tax Type' onChange={(e: any) => setFormDetails({ ...formDetails, taxtype: e.target.value })} id='taxType' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="profitMargin">Profit Margin(%)<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Profit Margin(%)' onChange={(e: any) => setFormDetails({ ...formDetails, profitmargin: e.target.value })} id='profitMargin' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="salesPrice">Sales Price<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Sales Price' onChange={(e: any) => setFormDetails({ ...formDetails, saleprice: e.target.value })} id='salesPrice' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>

                        </div>
                        <div className="grid lg:grid-cols-12 grid-cols-1 grid-rows-min border-b gap-6 py-4 ">
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="discountType">Discount Type<span className='text-red-400'>*</span></label>
                                <Selector data={['Percentage', 'Fixed']} changeState={setDiscountType} currentstate={discountType} commonTitle='select discount type' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="discount">Discount<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Discount' onChange={(e: any) => setFormDetails({ ...formDetails, discount: e.target.value })} id='discount' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1  lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="openingStock">Current Opening Stock<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Opening Stock' value={""} disabled id='openingStock' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
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
const BrandAddPopup = ({ close }: { close: Dispatch<SetStateAction<boolean>> }) => {
    const addBrand = async (e: React.FormEvent) => {
        e.preventDefault()
        const formDetails = new FormData(e.target as HTMLFormElement)
        await fetch('/api/brand', {
            method: 'POST',
            body: formDetails
        }).then((res) => {
            if (res.status === 200) {
                close(false)
                alert('Saved')
            }
        }).catch((err) => {
            console.log(err)
            alert('Something went wrong')
        })
    }
    return (
        <div className='flex h-screen absolute z-50 w-full top-0 left-0 backdrop-blur-[1px]  items-center justify-center' >
            <motion.div
                exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, type: "tween" }}
                className='flex justify-center items-center'>
                <motion.div
                    exit={{ opacity: 0, y: -50 }} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .5, type: "tween" }}
                    className='bg-white p-4 rounded-lg shadow-lg'>
                    <form method="post" onSubmit={addBrand} className='w-fit flex flex-col gap-4'>
                        <h1 className='text-xl font-semibold'>Add New Brand</h1>
                        <input type="text" name='name' id='name' placeholder='Brand Name' className='border p-2 outline-none text-gray-800' />
                        <input type="text" name='desc' id='desc' placeholder='Description' className='border p-2 outline-none text-gray-800' />
                        <button type='submit' className='bg-green-400 w-full px-4 py-2 rounded-lg text-white'>Save</button>
                        <button onClick={() => close(false)} className='bg-red-400 w-full px-4 py-2 rounded-lg text-white'>Close</button>
                    </form>
                </motion.div>
            </motion.div>
        </div >
    )

}

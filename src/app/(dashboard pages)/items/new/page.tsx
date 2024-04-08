'use client'
import { Selector } from '@/app/components/Custom-shadcn-components/Selector'
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import useSWR from 'swr'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'


const taxFetch = async () => {
    const res = await fetch('/api/tax', {
        method: 'PUT'
    })
    const data = await res.json()
    const tax = data.map((item: any) => {
        return `${item.value}`
    })
    console.log("arr", tax);
    return tax
}


export default function page() {
    const [brand, setBrand] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [unit, setUnit] = useState<string>("")
    const [taxValue, setTaxValue] = useState<string>("")
    const [discountType, setDiscountType] = useState<string>("")
    const [CategoryPopupState, setCategoryPopupState] = useState<boolean>(false)
    const [UnitPopupState, setUnitPopupState] = useState<boolean>(false)
    const [TaxPopupState, setTaxPopupState] = useState<boolean>(false)
    const [taxType, setTaxType] = useState<string>("");
    type InventoryItem = {
        itemCode?: string
        itemName?: string
        brand?: string
        category?: string
        unit?: string
        minQty: number
        expdate?: Date
        barcode?: string
        description?: string
        price: number
        tax?: string
        purchaseprice: number
        taxtype?: string
        profitmargin: number
        saleprice: number
        discountType: string
        discount: number
        currentstock?: number
    }
    const [formDetails, setFormDetails] = useState<InventoryItem>({
        itemCode: "",
        itemName: "",
        brand: "",
        category: "",
        unit: "",
        minQty: 1,
        expdate: new Date,
        barcode: "",
        description: "",
        price: 0,
        tax: "",
        purchaseprice: 0,
        taxtype: "Exclusive",
        profitmargin: 0,
        saleprice: 0,
        discountType: "Percentage",
        discount: 0,
        currentstock: 0,
    })

    useEffect(() => {
        setFormDetails({
            ...formDetails,
            unit: unit

        })
    }, [unit])

    useEffect(() => {
        setFormDetails({
            ...formDetails,
            category: category
        })
    }, [category]);

    useEffect(() => {
        setFormDetails({
            ...formDetails,
            brand: brand,
        })
    }, [brand])

    useEffect(() => {
        setFormDetails({
            ...formDetails,
            discountType: discountType
        })
    }, [discountType])

    const brandRoute = async () => {
        const res = await fetch('/api/brand', {
            method: 'PUT'
        })
        const data = await res.json()
        const brand = data.map((item: any) => {
            return item.name
        })
        console.log(brand);

        return brand
    }
    const { data: brandData, error: brandError } = useSWR(
        '/api/brand', brandRoute
    )

    const categoryFetch = async () => {
        const res = await fetch('/api/category', {
            method: 'PUT'
        })
        const data = await res.json()
        const category = data.map((item: any) => {
            return item.name
        })
        console.log(category);

        return category
    }
    const { data: categoryData, error: categoryError } = useSWR(
        '/api/category', categoryFetch
    )
    const unitFetch = async () => {
        const res = await fetch('/api/unit', {
            method: 'PUT'
        })
        const data = await res.json()
        const unit = data.map((item: any) => {
            return item.name
        })
        console.log(unit);

        return unit
    }
    const { data: unitData, error: unitError } = useSWR(
        '/api/unit', unitFetch
    )
    const [BrandPopupState, setBrandPopupState] = useState<boolean>(false)

    const addItemEvent = async (event: React.FormEvent) => {
        event.preventDefault();
        if (formDetails.itemCode === "" || formDetails.itemName === "" || formDetails.category === "" || formDetails.unit === "" || formDetails.price === 0 || formDetails.tax === "") {
            alert("Please Fill All The Filed");
            return
        }
        const data = await axios.post("/api/items", { formDetails })
        alert("Item Added")
        return
    }
    const { data: taxData, error: taxError } = useSWR(
        '/api/tax', taxFetch
    )
    useEffect(() => {
        const onChangeEvent = () => {
            const taxes = taxValue ? taxValue.match(/\d+/g)!.map(Number)[0] : 0
            const taxValues = (taxType.toLowerCase() === "exclusive" || taxType === "") ? (formDetails?.price * taxes) / 100 : 0
            const price = (formDetails?.price + taxValues);
            const profit = Math.round(((formDetails?.profitmargin * formDetails.price ) / 100));
            const salePrice = profit ? profit + formDetails.price : formDetails.price ;
            setFormDetails({
                ...formDetails,
                purchaseprice: price,
                saleprice: salePrice,
                tax: taxValue,
                taxtype: taxType
            })
        }
        onChangeEvent();
    }, [taxValue, taxType, formDetails.price, formDetails.profitmargin])
    return (
        <div className='w-full py-2 px-4'>
            <div className="py-2 w-full relative">
                <AnimatePresence mode='wait'>
                    {
                        BrandPopupState && <BrandAddPopup close={setBrandPopupState} />
                    }
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                    {
                        CategoryPopupState && <CategoryAddPopup close={setCategoryPopupState} />
                    }
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                    {
                        UnitPopupState ? <UnitPopUp close={setUnitPopupState} /> : null
                    }
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                    {
                        TaxPopupState && <TaxAddPopUp close={setTaxPopupState} />
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
                                <div className="w-full flex items-center justify-center">
                                    <Selector commonTitle='Select Category' changeState={setCategory} currentstate={category} data={categoryData ? categoryData : []} />
                                    <div className=" flex-1 p-3 border rounded cursor-pointer" onClick={() => setCategoryPopupState(true)}>
                                        <AiOutlinePlus className='' />
                                    </div>
                                </div>
                            </div>
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="unit">Unit<span className='text-red-400'>*</span></label>
                                <div className="w-full flex items-center justify-center">
                                    <Selector commonTitle='Select Unit' changeState={setUnit} currentstate={unit} data={unitData ? unitData : []} />
                                    <div className=" flex-1 p-3 border rounded cursor-pointer" onClick={() => setUnitPopupState(true)}>
                                        <AiOutlinePlus className='' />
                                    </div>
                                </div>
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5 auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="minimumQty">Minimum Qty.<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Qty.' onChange={(e: any) => setFormDetails({ ...formDetails, minQty: Number(e.target.value) })} id='minimumQty' className='border  rounded-lg py-2 px-2 outline-none text-gray-800' />
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
                                <input type="text" /* value={formDetails.price || ""}  */ placeholder='Price' onChange={e => {
                                    setFormDetails({
                                        ...formDetails,
                                        price: Number(e.target.value)
                                    })
                                }} id='price' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="tax">Tax<span className='text-red-400'>*</span></label>
                                <div className="w-full flex items-center justify-center">
                                    <Selector commonTitle='Select Tax' changeState={setTaxValue} currentstate={taxValue} data={taxData ? taxData : []} />
                                    <div className=" flex-1 p-3 border rounded cursor-pointer" onClick={() => setTaxPopupState(true)}>
                                        <AiOutlinePlus className='' />
                                    </div>
                                </div>
                            </div>
                            <div className=" grid-cols-1 lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="purchasePrice">Purchase Price<span className='text-red-400'>*</span></label>
                                <input value={formDetails?.purchaseprice || ""} type="text" placeholder='Purchase Price' disabled
                                    id='purchasePrice' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="taxType">Tax Type (%)<span className='text-red-400'>*</span></label>
                                <Selector commonTitle='Select Tax Type' changeState={setTaxType} currentstate={taxType} data={['inclusive', 'exclusive']} />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="profitMargin">Profit Margin(%)<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Profit Margin(%)' value={formDetails.profitmargin || ""} onChange={(e: any) => setFormDetails({ ...formDetails, profitmargin: e.target.value })} id='profitMargin' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="salesPrice">Sales Price<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Sales Price' value={formDetails.saleprice}
                                    onChange={e => setFormDetails({
                                        ...formDetails,
                                        saleprice: Number(e.target.value)

                                    })}
                                    onBlur={(e: any) => {
                                        const profit = (((e.target.value - formDetails.purchaseprice) * 100) / formDetails.purchaseprice);
                                        console.log(profit);
                                        setFormDetails({
                                            ...formDetails,
                                            profitmargin: profit
                                        })
                                    }} id='salesPrice' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>

                        </div>
                        <div className="grid lg:grid-cols-12 grid-cols-1 grid-rows-min border-b gap-6 py-4 ">
                            <div className=" grid-cols-1 lg:col-start-1  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="discountType">Discount Type<span className='text-red-400'>*</span></label>
                                <Selector data={['Percentage', 'Fixed']} changeState={setDiscountType} currentstate={discountType} commonTitle='select discount type' />
                            </div>
                            <div className=" grid-cols-1 lg:col-start-5  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="discount">Discount<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Discount' value={formDetails.discount || ""} onChange={(e: any) => setFormDetails({ ...formDetails, discount: e.target.value })} id='discount' className={` border  rounded-lg py-2 px-2 outline-none text-gray-800 ${discountType ? "" : "pointer-events-none"} `} />
                            </div>
                            <div className=" grid-cols-1  lg:col-start-9  auto-rows-min lg:col-span-3 row-span-1 flex flex-col gap-2 ">
                                <label htmlFor="openingStock">Current Opening Stock<span className='text-red-400'>*</span></label>
                                <input type="text" placeholder='Opening Stock' value={""} disabled id='openingStock' className=' border  rounded-lg py-2 px-2 outline-none text-gray-800' />
                            </div>
                        </div>
                        <div className="w-full py-4">
                            <div className='w-full'>
                                <button type='submit' className='bg-green-400 w-full px-4 py-2 rounded-lg text-white'>Save</button>
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
                        <button type='reset' onClick={() => close(false)} className='bg-red-400 w-full px-4 py-2 rounded-lg text-white'>Close</button>
                    </form>
                </motion.div>
            </motion.div>
        </div >
    )

}

const CategoryAddPopup = ({ close }: { close: Dispatch<SetStateAction<boolean>> }) => {
    const addCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        const formDetails = new FormData(e.target as HTMLFormElement)
        await fetch('/api/category', {
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
                exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, type: "tween" }} >
                <motion.div
                    exit={{ opacity: 0, y: -50 }} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .5, type: "tween" }}
                    className='bg-white p-4 rounded-lg shadow-lg'>
                    <form method="post" onSubmit={addCategory} className='w-fit flex flex-col gap-4'>
                        <h1 className='text-xl font-semibold'>Add New Category</h1>
                        <input type="text" name='name' id='name' placeholder='Category Name' className='border p-2 outline-none text-gray-800' />
                        <input type="text" name='description' id='description' placeholder='Description' className='border p-2 outline-none text-gray-800' />
                        <button type='submit' className='bg-green-400 w-full px-4 py-2 rounded-lg text-white'>Save</button>
                        <button type='reset' onClick={() => close(false)} className='bg-red-400 w-full px-4 py-2 rounded-lg text-white'>Close</button>
                    </form>
                </motion.div>
            </motion.div>
        </div >
    )
}

const UnitPopUp = ({ close }: { close: Dispatch<SetStateAction<boolean>> }) => {
    const addUnit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formDetails = new FormData(e.target as HTMLFormElement)
        await fetch('/api/unit', {
            method: 'POST',
            body: formDetails
        }).then((res) => {
            if (res.status === 200) {
                close(false)
                alert('Saved')
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className='flex h-screen absolute z-50 w-full top-0 left-0 backdrop-blur-[1px]  items-center justify-center' >
            <motion.div
                exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, type: "tween" }} >
                <motion.div
                    exit={{ opacity: 0, y: -50 }} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .5, type: "tween" }}
                    className='bg-white p-4 rounded-lg shadow-lg'>
                    <form method="post" onSubmit={addUnit} className='w-fit flex flex-col gap-4'>
                        <h1 className='text-xl font-semibold'>Add New Unit</h1>
                        <input type="text" name='name' id='name' placeholder='Unit Name' className='border p-2 outline-none text-gray-800' />
                        <input type="text" name='description' id='description' placeholder='Description' className='border p-2 outline-none text-gray-800' />
                        <button type='submit' className='bg-green-400 w-full px-4 py-2 rounded-lg text-white'>Save</button>
                        <button type='reset' onClick={() => close(false)} className='bg-red-400 w-full px-4 py-2 rounded-lg text-white'>Close</button>
                    </form>
                </motion.div>
            </motion.div>
        </div >
    )
}

const TaxAddPopUp = ({ close }: { close: Dispatch<SetStateAction<boolean>> }) => {
    const { data: taxData, error: taxError } = useSWR(
        '/api/tax', taxFetch
    )
    const addTax = async (e: React.FormEvent) => {
        e.preventDefault()
        const formDetails = new FormData(e.target as HTMLFormElement)
        const exist = taxData.find((item: string) =>
            item === formDetails.get("value")
        )
        try {
            if (!exist) {
                const data = await axios.post('/api/tax', formDetails);
                console.log(data);
                alert("saved")
                close(false)
            }
            else {
                alert("The tax is already exist")
            }
        }
        catch (err: any) {
            console.log(err)
            close(false)
        }
    }
    return (
        <div className='flex h-screen absolute z-50 w-full top-0 left-0 backdrop-blur-[1px]  items-center justify-center' >
            <motion.div
                exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, type: "tween" }} >
                <motion.div
                    exit={{ opacity: 0, y: -50 }} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .5, type: "tween" }}
                    className='bg-white p-4 rounded-lg shadow-lg'>
                    <form method="post" onSubmit={addTax} className='w-fit flex flex-col gap-4'>
                        <h1 className='text-xl font-semibold'>Add New Tax</h1>
                        <input type="text" name='value' /* onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                            console.log(e.target.value);
                            
                        }} */ id='name' placeholder='Tax Name' className='border p-2 outline-none text-gray-800' />
                        {/*                         <input type="text" name='name' id='value' placeholder='value' className='border p-2 outline-none text-gray-800' />
 */}                        <button type='submit' className='bg-green-400 w-full px-4 py-2 rounded-lg text-white'>Save</button>
                        <button type='reset' onClick={() => close(false)} className='bg-red-400 w-full px-4 py-2 rounded-lg text-white'>Close</button>
                    </form>
                </motion.div>
            </motion.div>
        </div >
    )
}
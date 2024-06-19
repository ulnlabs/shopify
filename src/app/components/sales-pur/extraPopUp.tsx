import React, { use, useEffect, useState } from 'react'
import Selections from './selections'
import { MdArrowDropDown } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
const PopUp = ({ modify, itemList, inputData, setItemList, setIsPopUp, Items, framerTemplate }: any) => {
    const [tax, setTax] = useState<string>(modify.original.tax);
    const [taxType, setTaxType] = useState<string>(modify.original.taxType)
    const [discountType, setDiscountType] = useState<string>(modify.original.discountType)
    const [discount, setDiscount] = useState<any>(modify.original.discountPer)
    const handlePopUp = () => {
        const taxPer = tax.match(/\d+/g)!.map(Number)[0]
        console.log(taxPer);
        const taxValue = taxPer * modify.original.price / 100;
        const DiscountValue = discountType.toLowerCase() === "Fixed".toLowerCase() ? Math.round(discount) : (Math.round(discount) * modify.original.price) / 100;
        const subTotal = taxType.toLowerCase() === "Exclusive".toLowerCase() ? taxValue + modify.original.price - DiscountValue : modify.original.price - DiscountValue;
        const updateTax = {
            ...modify.original,
            taxType: taxType,
            tax: tax,
            taxAmount: modify.original.quantity * taxValue,
            discount: discountType.toLowerCase() === "Percentage".toLowerCase() ? modify.original.quantity * Math.round(DiscountValue) : modify.original.quantity * Math.round(DiscountValue),
            discountType: discountType,
            subtotal: modify.original.quantity * subTotal
        }
        const update = itemList.map((item: any) => item.itemName === modify.original.itemName ? updateTax : item)
        setItemList(update)
        setIsPopUp(false);
    }

    const framerPopUp = {
        initial: {
            opacity: 0,
            y: -40,
            transition: {
                duration: 0.3,
                type: 'tween'
            }
        },
        enter: {
            opacity: 1,
            y: 0,
            transition: {
                delay: .1,
                duration: 0.3,
                type: 'tween'
            }
        }
    }

    return (



        <motion.div
            {...framerTemplate(framerPopUp)}

            className='z-50 absolute bg-white shadow-lg px-5 rounded-md py-5 grid gap-5'>
            <h3 className='text-center py-2'>Manage Item</h3>
            <p>Item Name: {modify.original.itemName}</p>
            <section className='flex gap-5'>
                <div>
                    <label htmlFor="tax-type">Tax Type</label>
                    <Selections
                        id="tax-type"
                        inputData={[{ label: "Exclusive" }, { label: "Inclusive" }]}
                        label={taxType}
                        setLabel={setTaxType}
                        payment
                    />
                </div>
                <div>
                    <label htmlFor="tax">Tax</label>
                    <Selections
                        inputData={inputData}
                        id='tax'
                        label={tax}
                        setLabel={setTax}
                        payment
                    />
                </div>

            </section>
            <section className='flex gap-5'>
                <div>
                    <label htmlFor="discount-type">Discount Type</label>
                    <Selections
                        id="tax-type"
                        inputData={[{ label: "Fixed" }, { label: "Percentage" }]}
                        label={discountType}
                        setLabel={setDiscountType}
                        payment
                    />
                </div>
                <div>
                    <label htmlFor="discount">Discount</label>
                    <div className='bg-primary-gray py-1 rounded-lg px-2'>
                        <div className='flex items-center bg-white rounded-md'>
                            <Input type="text" className='h-10 border-none '
                                placeholder={discount.toString()}
                                onChange={(e) => {
                                    setDiscount(Number(e.target.value))
                                }}
                                onKeyDown={(e) => {
                                    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== ".") {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            <MdArrowDropDown className="mr-2 h-6 w-6 ml-2 opacity-0 shrink-0 " />
                        </div>

                    </div>
                </div>

            </section>
            <section className='flex justify-center gap-10'>

                <button onClick={() => {
                    handlePopUp();
                    console.log(modify);

                }}>
                    Save
                </button>
                <button onClick={() => { setIsPopUp(false); }}>
                    Cancel
                </button>
            </section>
        </motion.div>

    )
}

export default PopUp
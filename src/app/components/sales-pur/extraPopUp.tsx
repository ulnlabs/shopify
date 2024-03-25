import React, { use, useEffect, useState } from 'react'
import Selections from './selections'
import { MdArrowDropDown } from 'react-icons/md';
import { Input } from '@/components/ui/input';
const PopUp = ({ modify, setModify, itemList, inputData, setItemList, setIsPopUp, Items }: any) => {
    const find = Items.find((item: any) => item.name === modify.original.name)
    const [tax, setTax] = useState<number>(modify.original.taxPer);
    const [taxType, setTaxType] = useState<string>(modify.original.tax_type)
    const [taxCategory, setTaxCategory] = useState<string>(modify.original.tax_category);
    const [discountType, setDiscountType] = useState<string>(modify.original.dis_type)
    const [discount, setDiscount] = useState<any>(discountType === "Per %" ? modify.original.discount * 100 / find.price / modify.original.quantity : modify.original.discount / modify.original.quantity)


    const handlePopUp = () => {
        const taxValue = tax * find.price / 100;
        console.log(discount);
        console.log(modify.original.quantity);
        const DiscountValue = discountType === "Fixed" ? discount : (discount * find.price) / 100;
        const subTotal = taxCategory === "Exclusive" ? taxValue + find.price - DiscountValue : find.price - DiscountValue;
        console.log(DiscountValue);
        const updateTax = {
            ...modify.original,
            tax_type: taxType,
            taxPer: tax,
            tax: modify.original.quantity * taxValue,
            discount: discountType === "Per %" ? modify.original.quantity  * DiscountValue : modify.original.quantity * DiscountValue,
            dis_type: discountType,
            tax_category: taxCategory,
            subtotal: modify.original.quantity * subTotal
        }
        const update = itemList.map((item: any) => item.name === modify.original.name ? updateTax : item)
        setItemList(update)
        setIsPopUp(false);
    }
    return (
        <div className='z-50 absolute bg-white shadow-lg px-5 rounded-md py-5 grid gap-5'>
            <h3 className='text-center py-2'>Manage Item</h3>
            <p>Item Name: {modify.original.name}</p>
            <section className='flex gap-5'>
                <div>
                    <label htmlFor="tax-type">Tax Type</label>
                    <Selections
                        id="tax-type"
                        inputData={[{ label: "Exclusive" }, { label: "Inclusive" }]}
                        label={taxCategory}
                        setLabel={setTaxCategory}
                        payment
                    />
                </div>
                <div>
                    <label htmlFor="tax">Tax</label>
                    <Selections
                        inputData={inputData}
                        id='tax'
                        label={taxType}
                        setLabel={setTaxType}
                        setValue={setTax}
                        values
                        payment
                    />
                </div>

            </section>
            <section className='flex gap-5'>
                <div>
                    <label htmlFor="discount-type">Discount Type</label>
                    <Selections
                        id="tax-type"
                        inputData={[{ label: "Fixed" }, { label: "Per %" }]}
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
                                    setDiscount(e.target.value)
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
        </div>
    )
}

export default PopUp
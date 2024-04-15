"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { motion } from 'framer-motion';

interface props {
    close: Dispatch<SetStateAction<boolean | null>>

}

export default function AddTax({ setPopup,data }: any) {
    const [addData, setdata] = useState({ id: null, payment_type: "",status:true })
    const handleTaxNameChange = (event: any) => {

        const { name, value } = event.target
        setdata({ ...addData, [name]: value })
        console.log(addData);
        

    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        data(addData)
        setPopup(false)
       
        
        

    }
    const animi = (variants: any) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "initial",
            variants
        }
    }
    const wapperanime = {
        initial: {
            opacity: 0,
            transition: {
                ease: "linear",
                duration: .5
            }
        },
        enter: {
            opacity: 1,
            transition: {
                ease: "linear",
                duration: .5
            }
        }
    }

    const popupanime = {
        initial: {
            opacity: 0,
            scale: .9,
            transition: {
                ease: "linear",
                duration: .5
            }
        },
        enter: {
            opacity: 1,
            scale: 1,
            transition: {
                ease: "linear",
                delay: .2,
                duration: .3
            }
        }
    }

    return (
        <motion.div {...animi(wapperanime)} className="absolute border-4 flex justify-center items-start h-full top-0 left-0 backdrop-blur-sm w-full py-10 z-10 ">
            <motion.div {...animi(popupanime)} className="h-fit w-fit p-5 shadow-[0px_0px_4px_0px] shadow-gray-400 rounded-lg bg-white">
                <div className=" ">
                    <h1 className="text-lg font-bold mb-4">Add Payment</h1>
                    <form onSubmit={handleSubmit} className="w-[400px] h-fit flex flex-col gap-3">
                        <div>
                            <label htmlFor="payment_type" className="block text-sm font-medium text-gray-700">Payment Name</label>
                            <input type="text" id="payment_type" name="payment_type" onChange={handleTaxNameChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                       
                        <div className='w-full flex gap-3'>
                            <button type="submit" className="px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Submit</button>
                            <button
                                onClick={() =>{setPopup(false)} } type='button'
                                className="px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Cancel</button>
                        </div>
                    </form>
                </div>

            </motion.div>
        </motion.div>
    )
}

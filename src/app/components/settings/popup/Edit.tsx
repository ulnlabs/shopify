"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
interface props {
    close: Dispatch<SetStateAction<boolean | null>>

}

export default function Edit({ close, selectedTax, updatedData }: any) {

    const [taxName, setTaxName] = useState('');
    const [taxPercentage, setTaxPercentage] = useState('');

    useEffect(() => {
        if (selectedTax) {
            setTaxName(selectedTax.taxName);
            setTaxPercentage(selectedTax.taxPercentage);
        }
    }, [selectedTax]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await updatedData(selectedTax.taxId, { taxName, taxPercentage });
        close(false)
       

    };

    function handelechangesfortaxName(e: any) {
        setTaxName(e.target.value)

    }
    function handelechangesfortaxPercentage(e: any) {
        setTaxPercentage(e.target.value)

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
    console.log("edit component", selectedTax);


    return (
        <motion.div {...animi(wapperanime)} className="absolute border-4 flex justify-center items-start h-full top-0 left-0 backdrop-blur-sm w-full py-10 z-10 ">
            <motion.div {...animi(popupanime)} className="h-fit w-fit p-5 shadow-[0px_0px_4px_0px] shadow-gray-400 rounded-lg bg-white">
                <div className=" ">
                    <h1 className="text-lg font-bold mb-4">Edit Option</h1>
                    <form onSubmit={handleSubmit} className="w-[400px] h-fit flex flex-col gap-3">
                        <div>
                            <label htmlFor="taxName" className="block text-sm font-medium text-gray-700">Tax Name</label>
                            <input type="text" value={taxName} id="taxName" name="taxname" onChange={handelechangesfortaxName} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="taxPercentage" className="block text-sm font-medium text-gray-700">Tax Percentage</label>
                            <input type="text" value={taxPercentage} id="taxPercentage" onChange={handelechangesfortaxPercentage} name="taxpercentage" className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className='w-full flex gap-3'>
                            <button type="submit" className="px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Submit</button>
                            <button
                                onClick={() => close(false)}
                                className="px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Cancel</button>
                        </div>
                    </form>
                </div>

            </motion.div>
        </motion.div>
    )
}

"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';

interface Props {
    close: Dispatch<SetStateAction<boolean | null>>;
    dataset: (data: any) => void; // You should define the exact type instead of any
}

export default function AddTax({ close, dataset }: Props) {
    const [addData, setdata] = useState({ taxId: "", taxName: "", taxPercentage: "", taxStatus: true });

    const handleTaxNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setdata({ ...addData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/taxList", { data: addData });
            if (response.status === 201 || response.status === 200) { 
                // Check for successful response status
                dataset(response.data.taxListData); // Update parent component state
                close(false); 
            } else {
                console.error('Failed to save the tax data');
            }
        } catch (error) {
            console.error('Error saving the tax data:', error);
        }
    };

    const animi = (variants: any) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "initial",
            variants
        }
    };

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
    };

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
    };

    return (
        <motion.div {...animi(wapperanime)} className="absolute border-4 flex justify-center items-start h-full top-0 left-0 backdrop-blur-sm w-full py-10 z-10 ">
            <motion.div {...animi(popupanime)} className="h-fit w-fit p-5 shadow-[0px_0px_4px_0px] shadow-gray-400 rounded-lg bg-white">
                <div className=" ">
                    <h1 className="text-lg font-bold mb-4">Add Tax</h1>
                    <form onSubmit={handleSubmit} className="w-[400px] h-fit flex flex-col gap-3">
                        <div>
                            <label htmlFor="taxName" className="block text-sm font-medium text-gray-700">Tax Name</label>
                            <input type="text" id="taxName" name="taxName" onChange={handleTaxNameChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="taxPercentage" className="block text-sm font-medium text-gray-700">Tax Percentage</label>
                            <input type="text" id="taxPercentage" name="taxPercentage" onChange={handleTaxNameChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className='w-full flex gap-3'>
                            <button type="submit" className="px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Submit</button>
                            <button
                                onClick={() => close(false)} type='button'
                                className="px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Cancel</button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
}

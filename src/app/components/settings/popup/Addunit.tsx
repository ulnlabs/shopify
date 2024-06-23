"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';

interface props {
    close: Dispatch<SetStateAction<boolean | null>>

}

export default function AddUnit({ close, dataset }: any) {
    const [addData, setdata] = useState({ unitName: "", unitDescription: "" });

    const handleunitNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setdata({ ...addData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/unitList", { data: addData });
            if (response.status === 201 || response.status === 200) {
                dataset(response.data.unitListData);
                close(false);
            } else {
                console.error('Failed to save the unit data');
            }
        } catch (error) {
            console.error('Error saving the unit data:', error);
        }
    };
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
                    <h1 className="text-lg font-bold mb-4">Add Unit</h1>
                    <form onSubmit={handleSubmit} className="w-[400px] h-fit flex flex-col gap-3">
                        <div>
                            <label htmlFor="unitName" className="block text-sm font-medium text-gray-700">Unit Name</label>
                            <input type="text" id="UnitName" name="unitName" onChange={handleunitNameChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="unitDescription" className="block text-sm font-medium text-gray-700">Description</label>
                            <input type="text" id="unitDescription" name="unitDescription" onChange={handleunitNameChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className='w-full flex gap-3'>
                            <button type="submit" className="px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Submit</button>
                            <button type='button'
                                onClick={() => { close(false) }}
                                className="px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ">Cancel</button>
                        </div>
                    </form>

                </div>

            </motion.div>
        </motion.div>
    )
}

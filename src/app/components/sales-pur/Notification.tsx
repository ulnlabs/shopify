"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { motion } from 'framer-motion';
import { AiOutlineCloseCircle } from "react-icons/ai";



export default function Notification({ close }: any) {



    const animi = (variants: { initial: { opacity: number; transition: { ease: string; duration: number; }; }; enter: { opacity: number; transition: { ease: string; duration: number; }; }; }) => {
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



    return (
        <motion.div {...animi(wapperanime)} className="absolute flex justify-center items-center h-fit top-0 left-0   w-full z-10 ">

            <div className='flex gap-3 items-center text-white justify-center rounded-md  p-5 bg-blue-500/90'>
                <div className="">
                    <h1 className="font-semibold"> Product Not Available Right Now !!! </h1>
                </div>
                <div className="mt-2">
                    <button onClick={() => close(false)}>
                        <AiOutlineCloseCircle size={20} />
                    </button>
                </div>
            </div>

        </motion.div>

    )
}

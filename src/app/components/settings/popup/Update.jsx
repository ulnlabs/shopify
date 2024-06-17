"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { motion } from 'framer-motion';
import { AiOutlineCloseCircle } from "react-icons/ai"; 



export default function Update({ close } ) {

    

    const animi = (variants) => {
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
           
            <div className='flex gap-3 items-center justify-center rounded-md  p-5 bg-green-300'>
          <div className="">
            <h1 className="font-semibold">Data Update successfully </h1>
          </div>
          <div className="mt-2">
            <button onClick={() => close(false)}>
            <AiOutlineCloseCircle  size={20} />
            </button>
          </div>
        </div>

            </motion.div>
       
    )
}

'use client'
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'


const profileVarient = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: .3,
      type: 'tween'
    }
  },
  closed: {
    opacity: 0,
    y: 10,
    transition: {
      duration: .3,
      type: 'tween'
    }
  }
}


function Header() {
  const [toggleprofile, setToggleProfile] = useState<Boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try{
      let handler = (e: any) => {
        if (!profileRef?.current?.contains(e.target) && !profileCardRef?.current?.contains(e.target)) {
          setToggleProfile(false)
        }
      }
      window.addEventListener('mousedown', handler)
    }catch(err){

    }
  })
  return (
    <div className='w-full bg-white h-[50px] flex items-center justify-between px-4'>
      <div className=""></div>
      <div className="relative capitalize text-gray-800 font-semibold flex flex-col items-end h-fit">
        <h1 ref={profileRef} className='text-gray-800 cursor-pointer' onClick={() => setToggleProfile(!toggleprofile)}>{"Admin"}</h1>
        <AnimatePresence mode='wait'>
          {
            toggleprofile && (
              <motion.div ref={profileCardRef} initial={profileVarient.closed} animate={profileVarient.open} exit={profileVarient.closed} className="absolute min-w-[200px] gap-4 px-2 py-2 border rounded-md flex justify-between items-center inset-y-full h-fit z-2  bg-white mt-[14px]">
                <div className="h-4 w-4 absolute -top-2 right-2 rotate-45 border-t border-l rounded bg-white"></div>
                <Image src={"/"} height={50} width={50} alt='' className='rounded-full border-2 border-[--primary]' />
                <div className="flex flex-col items-end justify-center">
                  <h1 className='w-fit text-gray-800'>{"Gowdaman P"}</h1>
                  <p className='text-[12px] font-light text-gray-800'>{"Admin"}</p>
                  <button className='border border-[--primary] rounded p-1 mt-1 text-sm text-[--primary] hover:text-white hover:bg-[--primary] transition-all duration-500 ease-In-Out'>SignOut</button>
                </div>
              </motion.div>
            )
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Header
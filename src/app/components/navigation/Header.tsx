'use client'
import { UserContext } from '@/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaBars } from 'react-icons/fa6';


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
  const { data: session } = useSession()
  const [toggleprofile, setToggleProfile] = useState<Boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const { toggleNav, setToggleNav } = useContext(UserContext)

  useEffect(() => {
    try {
      let handler = (e: any) => {
        if (!profileRef?.current?.contains(e.target) && !profileCardRef?.current?.contains(e.target)) {
          setToggleProfile(false)
        }
      }
      window.addEventListener('mousedown', handler)
    } catch (err) {

    }
  })
  const [profileimg, setProfileimg] = useState('')
  return (
    <div className='w-full bg-white border-b flex items-center justify-between px-4 h-[60px]'>
      <div className=" flex items-center justify-center">
        <FaBars onClick={() => setToggleNav(!toggleNav)} className='md:hidden flex' />
        <div className="logo md:hidden flex items-center justify-center"></div>
      </div>
      <div className="relative capitalize text-gray-800 font-semibold flex flex-col items-end h-fit">
        <h1 ref={profileRef} className='text-gray-800 cursor-pointer' onClick={() => setToggleProfile(!toggleprofile)}>{"Admin"}</h1>
        <AnimatePresence mode='wait'>
          {
            toggleprofile && (
              <motion.div ref={profileCardRef} initial={profileVarient.closed} animate={profileVarient.open} exit={profileVarient.closed} className="absolute min-w-[200px] gap-4 px-2 py-2 border rounded-md flex justify-between items-center inset-y-full h-fit z-[10]  bg-white mt-[14px]">
                <div className="flex flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <h1 className='w-fit text-gray-800'>{session?.user?.username}</h1>
                    <p className='text-[12px] font-light text-gray-800'>{session?.user?.role}</p>
                  </div>
                  <button onClick={() => signOut({ callbackUrl: '/' })} className='border border-[--primary] rounded p-1 mt-1 text-sm text-[--primary] hover:text-white hover:bg-[--primary] transition-all duration-500 ease-In-Out'>SignOut</button>
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
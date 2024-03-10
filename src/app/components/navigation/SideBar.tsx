'use client'
import React, { ReactNode, createElement, useEffect, useRef } from 'react'
import { motion, useCycle } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { navItems } from './Type'
function SideBar() {
  const router = useRouter()
  return (
    <div className='w-[250px] bg-[--primary]'>
      <div className="w-full text-white">
        close
      </div>
      
    </div>
  )
}

export default SideBar

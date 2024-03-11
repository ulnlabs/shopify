'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { NavBarItem, navItems, NavItemProps } from './Type'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image'
function SideBar() {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className={cn('w-[280px] md:relative absolute top-0 left-0 min-h-screen bg-[--primary] rounded-lg')}>
      <div className="flex flex-col gap-2 items-center px-2">
        <h1 className='w-full px-4 flex items-center gap-2 bg-white rounded-lg mt-2'>
          <Image src={'/asserts/logo/logo.svg'} height={50} width={50} alt="Logo" />
          <p className='text-xl font-bold text-[--primary]'>Shopify</p>
        </h1>
        <div className="w-full max-h-[90vh] overflow-y-scroll scrollbar-hide">
          <Accordion type="single" className='w-full flex flex-col gap-1 items-center py-2' collapsible>
            {
              navItems.map((item, index) => {
                if (!item.children) {
                  return (
                    <Link key={index}
                      className={cn('flex items-center w-full gap-2 text-white no-underline bg-white/[.2] py-2 hover:bg-white/[.3] rounded-lg px-2',
                        item.key === pathname ? 'text-black bg-white hover:bg-white' : '')}
                      href={item?.key ? item.key : ''}>{item.icon}{item.label}</Link>
                  )
                }
                return (
                  <AccordionItem key={index} className='border-none w-full' value={index.toString()}>
                    <AccordionTrigger className={cn('text-white flex items-center justify-between w-full no-underline bg-white/[.2] py-2 hover:bg-white/[.3] rounded-lg px-2')}>
                      <div className="flex items-center gap-2">
                        <div className="">
                          {item.icon}
                        </div>
                        {item.label}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='py-0 px-0 pt-2'>
                      <div className="flex flex-col gap-2 items-center px-2 py-2 bg-white/[.1] rounded-lg">
                        {
                          item.children?.map((child, index) => {
                            return (
                              <Link key={index} className={cn('px-2 py-2 w-full bg-white/[.2] rounded-md text-white hover:bg-white/[.3]', child.key === pathname ? 'text-gray-800 font-bold bg-white/[.8] hover:bg-white/[.8]' : '')} href={child?.key ? child.key : ''}>
                                {child.label}
                              </Link>
                            )
                          })
                        }
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })
            }
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default SideBar
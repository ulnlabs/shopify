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
function SideBar() {
  const router = useRouter()
  return (
    <div className='w-[250px] bg-[--primary]'>
      <div className="w-full text-white">
        close
      </div>
      <div className="flex flex-col gap-2 items-center px-2">
        {
          navItems.map((item, index) => {
            if (item.children) {
              return (
                <SubMenuItem key={index} item={item} isToggle={() => { }} />
              )
            }
            else {
              return (
                <MenuItem key={index} item={item} />
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default SideBar

const menuItemVarients = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      type: 'tween',
    }
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      type: 'tween'
    }
  }
}


const MenuItem = ({ item }: { item: NavBarItem }) => {
  const asPath = usePathname()
  const isActive = asPath === item.key
  return (
    <motion.div variants={menuItemVarients} className={cn('w-full rounded-md', isActive ? 'text-black bg-white' : 'text-white')}>
      <Link
        className='px-2 py-2 w-full flex items-center gap-2'
        href={item?.key ? item.key : ''}
      >
        {item.icon}{item.label}
      </Link>
    </motion.div>
  )
}

const SubMenuItem: React.FC<NavItemProps> = ({ item, isToggle }) => {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <div className="w-full">
      <Accordion type="multiple" >
        <AccordionItem className='border-none' value="item-1">
          <AccordionTrigger className={cn('text-white no-underline bg-white/[.2] hover:bg-white/[.3] rounded-lg px-2 py-0', openMenu ? 'bg-white/[.4]' : '')} onClick={() => setOpenMenu(!openMenu)}>
            <button
              className='w-full px-2 py-2 flex items-center gap-2 hover:no-underline '
            >
              {item.icon}
              <p className='no-underline'>
                {item.label}
              </p>
            </button>
          </AccordionTrigger>
          <AccordionContent className='py-0 px-0 pt-2'>
            <div className="flex flex-col gap-2 items-center px-2 py-2 bg-white/[.1] rounded-lg">
              {
                item.children?.map((child, index) => {
                  return (
                    <Link className={cn('px-2 py-2 w-full bg-white/[.2] rounded-md text-white hover:bg-white/[.3]' , child.key === pathname ? 'text-black bg-white' : '')} href={child?.key ? child.key : ''}>
                      {child.label}
                    </Link>
                  )
                })
              }
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
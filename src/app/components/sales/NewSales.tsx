"use client"
import { BiCart } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import React, { useState } from 'react'

import { Check, ChevronsUpDown } from "lucide-react"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from '@/components/ui/input'





import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const cutomerName = [
  {
    value: "Fire10",
    label: "Fire10",
  },
  {
    value: "deepath",
    label: "Deepath",
  },
  {
    value: "dhilip",
    label: "Dhilip",
  },
]

const status = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "final",
    label: "Final",
  }
]

interface FormState {
  customerName: string,
  billStatus: string,
  billDate: any,
}

const NewSales = () => {
  const [data, setData] = useState<FormState>({
    customerName: "",
    billStatus: "",
    billDate: new Date(),
  })
  const { billDate } = data;
  const [customerOpen, setCustomerOpen] = useState<boolean>(false)
  const handleCustomerClick = (label: string): void => {
    setData({ ...data, customerName: label });
    setCustomerOpen(false);
  }
  const [dateOpen, setDateOpen] = useState<boolean>(false);
  const handleDateClick = (label: any) => {
    setData({ ...data, billDate: new Date(label) });
    setDateOpen(false)
  }

  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const handleStatusClick = (label: string): void => {
    setData({ ...data, billStatus: label });
    setOpenStatus(!openStatus);
  }
  const itemList = [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "final",
      label: "Final",
    }
  ]

  const [itemOpen, setItemOpen] = useState<boolean>(false);
  const [items, setItems] = useState<string>('');
  return (
    <div className='px-10  mt-10'>
      <section className="grid grid-cols-6 gap-10">
        <div className=" col-start-1 relative col-span-3 ">
          <div className="flex shadow-md py-1 px-2 rounded-lg border items-center ">
            <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
            <Input placeholder='Select Customer' value={"" || data.customerName} readOnly onClick={() => {
              setCustomerOpen(!customerOpen)
            }} className="bg-primary-gray  cursor-pointer  " />
            <IoMdContact className="ml-2 h-4 w-4 shrink-0  opacity-50" />
          </div>
          {
            customerOpen && (
              <div className="z-10 absolute w-full mt-2 ">
                <Command className="rounded-lg border shadow-md">
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {cutomerName.map((item) => (
                        <CommandItem key={item.value}
                          onSelect={handleCustomerClick}
                        >
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )
          }
        </div>
        <div className="col-start-4 col-end-7">
          <div className="flex shadow-md py-1 px-2 rounded-lg border items-center ">
            <AiOutlineCalendar className="mr-2 h-4 w-4 shrink-0  opacity-50" />
            <Input placeholder='Select Customer' value={billDate ? format(billDate, "PPP") : ''} readOnly onClick={() => {
              setDateOpen(!dateOpen)
            }} className="bg-primary-gray  cursor-pointer " />
          </div>
          {

            dateOpen && (
              <div className="z-10 absolute mt-2 bg-white rounded-lg border shadow-md ">
                <Calendar
                  mode="single"
                  selected={billDate}
                  onSelect={handleDateClick}
                  initialFocus
                />
              </div>
            )
          }
        </div>
      </section>
      <section className="mt-5 mb-16 relative shadow-md">
        <div className="flex items-center  border py-1 px-2 rounded-lg" >
          <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
          <Input placeholder="Status"
            value={"" || data.billStatus}
            onClick={() => { setOpenStatus(true) }}
            className="bg-primary-gray cursor-pointer " readOnly />
        </div>
        {
          openStatus && (
            <div className="z-10 absolute w-full mt-2 ">
              <Command className="rounded-lg border shadow-md ">
                <CommandList>
                  <CommandGroup>
                    {status.map((item) => (
                      <CommandItem key={item.value}
                        className="cursor-pointer"
                        onSelect={handleStatusClick}
                      >
                        {item.label}
                      </CommandItem>
                    ))}


                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )
        }
      </section>
      <section className="mt-5 shadow-md">
        <div className="flex items-center border py-1 px-2 rounded-lg">
          <BiCart className="mr-2 h-4 w-4 shrink-0  opacity-50" />
          <Input placeholder="Item Name / Barcode / Item Number" className="bg-primary-gray"
            onClick={() => {
              setItemOpen(true)
            }}
          />


        </div>
        <div>
          {itemOpen
            && itemList.map((item: any) => (
              item.value === "" ? true
                : item.value.toLowerCase().trim().includes(item.value.toLowerCase().trim()))
            )
          }

        </div>
      </section>


    </div>
  )
}

export default NewSales
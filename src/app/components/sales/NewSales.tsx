"use client"
import { BiCart } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import React, { useState, useEffect, useRef } from 'react'

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
} from "@/components/ui/command"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Selector } from "../Custom-shadcn-components/Selector";


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
  const Items = [
    {
      name: 'Customer',
      value: 'Customer'
    },
    {
      name: 'Customer 1',
      value: 'Customer 1'
    }, {
      name: 'Customer 2',
      value: 'Customer 2'
    }, {
      name: 'Customer 3',
      value: 'Customer 3'
    }
  ]

  const [itemOpen, setItemOpen] = useState<boolean>(false);
  const [items, setItems] = useState<string>('');
  const [itemList, setItemList] = useState<any>([]);

  const [tax, setTax] = useState<string>("");


  return (
    <div className='px-10 mt-10'>
      <section>


        <div className="grid grid-cols-12 gap-5 md:gap-10">
          <div className="  relative  col-start-1 md:col-span-6 col-span-full">
            <div className="flex bg-primary-gray  py-1 px-2 rounded-lg border items-center ">
              <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
              <Input placeholder='Select Customer' value={"" || data.customerName} readOnly onClick={() => {
                setCustomerOpen(!customerOpen)
              }} className=" cursor-pointer  " />
              <IoMdContact className="ml-2 h-4 w-4 shrink-0  opacity-50" />
            </div>
            {
              customerOpen && (
                <div className="z-10 absolute w-full mt-2 ">
                  <Command className="rounded-lg border ">
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
          <div className="md:col-start-7 md:col-span-6 col-span-full">
            <div className="flex  py-1 text-w bg-primary-gray px-2 rounded-lg border items-center ">
              <AiOutlineCalendar className="mr-2  h-4 w-4 shrink-0  opacity-50" />
              <Input placeholder='Select Customer' value={billDate ? format(billDate, "PPP") : ''} readOnly onClick={() => {
                setDateOpen(!dateOpen)
              }} className="  cursor-pointer " />
            </div>
            {

              dateOpen && (
                <div className="z-10 absolute mt-2 bg-white rounded-lg border  ">
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
        </div>

        <div className="mt-5 mb-10 col-span-full relative ">

          <div className="flex items-center bg-primary-gray border py-1 px-2 rounded-lg" >
            <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
            <Input placeholder="Status"
              value={"" || data.billStatus}
              onClick={() => { setOpenStatus(!openStatus) }}
              className=" cursor-pointer " readOnly />
          </div>
          {
            openStatus && (
              <div className="z-10 absolute w-full mt-2 ">
                <Command className="rounded-lg border  ">
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
        </div>

        <div className="mt-5 relative">
          <div className="flex items-center border py-1 bg-primary-gray px-2 rounded-lg">
            <BiCart className="mr-2 h-4 w-4 shrink-0  opacity-50" />
            <Input placeholder="Item Name / Barcode / Item Number" className=""
              onClick={() => {
                setItemOpen(true);
              }}
              onChange={(e) => {
                setItems(e.target.value)
              }}
            />
          </div>
          {
            items && itemOpen &&
            <div className="mt-2 z-10 border rounded-lg absolute w-full">
              {
                Items.filter((item, i) => {
                  return items === "" ? true : item.value.toLowerCase().includes(items.toLowerCase())
                }).map((item, index) => {
                  return (
                    <div className="">
                      <p key={index}
                        className="px-3 py-1"
                        onClick={() => {
                          setItemList([...itemList, item.value])
                        }}>
                        {item.name}
                      </p>
                    </div>
                  )
                })
              }
              {Items.filter((item, i) => {
                return items === "" ? true : item.value.toLowerCase().includes(items.toLowerCase())
              }).length === 0 && (
                  <div className="">
                    <p className="px-3 py-1 text-center">
                      Item Not Found
                    </p>
                  </div>
                )}

            </div>
          }
        </div>

      </section>

      <div className="grid grid-cols-12 grid-rows-4 mt-16 grid-flow-col gap-4">
        <div className="col-start-1 items-center grid col-span-full md:col-span-6 h-auto rounded-lg bg-primary-gray">
          <div className="grid md:grid-cols-4 gap-20 px-5  ">
            <p className="col-start-1 col-end-3">Quantity</p>
            <p className="col-span-2 col-start-3 ">100000</p>
          </div>
        </div>
        <div className="grid items-center grid-cols-subgrid h-auto grid-rows-subgrid gap-2 col-start-1 px-1 bg-primary-gray col-span-12 md:col-span-6 rounded-lg row-span-1">
          <div className="col-start-1 col-end-7 py-2 md:col-end-4">
            <input id="Charges" className=" w-full rounded-md px-2 h-8" placeholder="charges" />
          </div>
          <div className="md:col-start-4 col-start-7 h-auto col-end-13 relative md:col-end-7  bg-primary-gray">
            <div className="flex items-center  bg-white  border py-1 px-2 rounded-lg" >
              <input placeholder="Status"
                value={"" || data.billStatus}
                onClick={() => { setOpenStatus(!openStatus) }}
                className=" cursor-pointer w-full outline-none" readOnly />
              <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
            </div>
            {
              openStatus && (
                <div className="z-10 grid-cols-subgrid w-full absolute mt-2 ">
                  <Command className="rounded-lg span-3 border  ">
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
          </div>
        </div>
        <div className="grid items-center grid-cols-subgrid grid-rows-subgrid gap-2 col-start-1 px-1 bg-primary-gray col-span-12 md:col-span-6 rounded-lg row-span-1">
          <div className="col-start-1 col-end-7 md:col-end-4">
            <input id="Charges" className=" w-full rounded-md px-2 h-8" placeholder="charges" />
          </div>
          <div className="md:col-start-4 col-start-7 col-end-13 relative md:col-end-7  bg-primary-gray">
            <div className="flex items-center  bg-white  border py-1 px-2 rounded-lg" >
              <input placeholder="Status"
                value={"" || data.billStatus}
                onClick={() => { setOpenStatus(!openStatus) }}
                className=" cursor-pointer w-full outline-none" readOnly />
              <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
            </div>
            {
              openStatus && (
                <div className="z-10 grid-cols-subgrid w-full absolute mt-2 ">
                  <Command className="rounded-lg span-3 border  ">
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
          </div>
        </div>
        <div className="grid items-center grid-cols-subgrid grid-rows-subgrid gap-2 col-start-1 px-1 bg-primary-gray col-span-12 md:col-span-6 rounded-lg row-span-1">
          <div className="col-start-1 col-end-7 md:col-end-4">
            <input id="Charges" className=" w-full rounded-md px-2 h-8" placeholder="charges" />
          </div>
          <div className="md:col-start-4 col-start-7 col-end-13 relative md:col-end-7  bg-primary-gray">
            <div className="flex items-center  bg-white  border py-1 px-2 rounded-lg" >
              <input placeholder="Status"
                value={"" || data.billStatus}
                onClick={() => { setOpenStatus(!openStatus) }}
                className=" cursor-pointer w-full outline-none" readOnly />
              <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
            </div>
            {
              openStatus && (
                <div className="z-10 grid-cols-subgrid w-full absolute mt-2 ">
                  <Command className="rounded-lg span-3 border  ">
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
          </div>
        </div>



        <div className="md:col-end-13 md:mt-0 mt-10 h-auto md:col-span-4 rounded-lg col-span-full grid items-center bg-primary-gray">
          <div className="grid  grid-cols-4 lg:grid-cols-3 py-2 justify-start gap-4 lg:gap-20 px-5 ">
            <p className="col-start-1 col-end-3">Subtotal</p>
            <p className="col-end-4 col-start-3  md:pr-2 ">100000000</p>
          </div>

        </div>
        <div className="md:col-end-13 md:col-span-4 py-2 h-auto rounded-lg col-span-full grid items-center bg-primary-gray">
          <div className="grid grid-cols-4 h-auto justify-end gap-4  px-5  ">
            <p className="col-start-1  col-end-3">Other Charges</p>
            <p className="col-span-2 w-auto col-start-3 ">100000</p>
          </div>
        </div>
        <div className="md:col-end-13 md:col-span-4 h-auto rounded-lg col-span-full grid items-center bg-primary-gray">
          <div className="grid grid-cols-4 justify-end py-2 gap-4 px-5  ">
            <p className="col-start-1 col-end-3">Overall Discount</p>
            <p className="col-span-2 col-start-3 md-pr-2">100000</p>
          </div>
        </div>
        <div className="md:col-end-13 md:col-span-4 rounded-lg h-auto col-span-full grid items-center bg-primary-gray">
          <div className="grid grid-cols-4 justify-end py-2 gap-4 px-5  ">
            <p className="col-start-1 col-end-3">Grand Total</p>
            <p className="col-span-2 col-start-3 ">100000</p>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-12 md:gap-10 gap-5">
        <div className="mt-5 col-start-1 col-span-6 relative ">

          <div className="flex items-center bg-primary-gray border py-1 px-2 gap-1 rounded-lg" >
            <Input placeholder="Status"
              value={"" || data.billStatus}
              onClick={() => { setOpenStatus(!openStatus) }}
              className=" cursor-pointer " readOnly />
           

            <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
             
          </div>
          {
            openStatus && (
              <div className="z-10 absolute w-full mt-2 ">
                <Command className="rounded-lg border  ">
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
        </div>
        <div className="col-span-6 gird items-center border bg-primary-gray py-1 px-2 rounded-lg col-start-7 mt-5 ">
          <Input type="text" placeholder="Amount" className="w-full px-2  b "/>

        </div>
        <div className="col-span-full py-1 px-2 rounded-lg bg-primary-gray">
          <textarea placeholder="Note" className="h-auto px-1 py-1 w-full" >

          </textarea>
        </div>
      </section>

    </div>
  )
}




export default NewSales
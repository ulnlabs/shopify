"use client"
import { BiCart } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import React, { useState, useEffect, useRef } from 'react'

import { Check, ChevronsUpDown } from "lucide-react"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"


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




import { i_columns } from "../datatable/itemColumn";
import { DataTable } from "../datatable/DataTable";
import Selections from "./selections";

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

const sample = [
  {

    name: "Deepath",
    quantity: 2,
    price: 2000,
    discount: 10,
    tax: 1,
    subtotal: 10,
  }
]


const NewSales = () => {



  const [data, setData] = useState<FormState>({
    customerName: "",
    billStatus: "",
    billDate: new Date(),
  })

  const [statusValue, setStatusValue] = useState("")

  useEffect(() => {
    setData({ ...data, billStatus: statusValue });
  }, [statusValue])


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
        <div className="mt-5 mb-10 col-span-full relative  ">                {/* status */}
          <Selections inputData={["Active", "Final"]} cValue={statusValue} placeholder="Status" setCValue={setStatusValue} />
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
      <section>
        <DataTable columns={i_columns} data={sample} />
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
            <Selections inputData={["Active", "Final"]} cValue={statusValue} placeholder="Status" setCValue={setStatusValue} />
          </div>
        </div>
        <div className="grid items-center grid-cols-subgrid grid-rows-subgrid gap-2 col-start-1 px-1 bg-primary-gray col-span-12 md:col-span-6 rounded-lg row-span-1">
          <div className="col-start-1 col-end-7 md:col-end-4">
            <input id="Charges" className=" w-full rounded-md px-2 h-8" placeholder="charges" />
          </div>
          <div className="md:col-start-4 col-start-7 col-end-13 relative md:col-end-7  bg-primary-gray">
            <Selections inputData={["Active", "Final"]} cValue={statusValue} placeholder="Status" setCValue={setStatusValue} />
          </div>
        </div>
        <div className="grid items-center grid-cols-subgrid grid-rows-subgrid gap-2 col-start-1 px-1 bg-primary-gray col-span-12 md:col-span-6 rounded-lg row-span-1">
          <div className="col-start-1 col-end-7 md:col-end-4">
            <input id="Charges" className=" w-full rounded-md px-2 h-8" placeholder="charges" />
          </div>
          <div className="md:col-start-4 col-start-7 col-end-13 relative md:col-end-7  bg-primary-gray">
            <Selections inputData={["Active", "Final"]} cValue={statusValue} placeholder="Status" setCValue={setStatusValue} />
          </div>
        </div>
        <div className="md:col-end-13 md:mt-0 mt-10 h-auto md:col-span-4 rounded-lg col-span-full grid items-center bg-primary-gray">
          <div className="grid  grid-cols-4 lg:grid-cols-3 py-2 justify-start gap-4  px-5 ">
            <p className="col-start-1 col-end-3">Subtotal</p>
            <p className="col-span-2 col-start-3 md-pr-2  ">100000000</p>
          </div>
        </div>
        <div className="md:col-end-13 md:col-span-4 py-2 h-auto rounded-lg col-span-full grid items-center bg-primary-gray">
          <div className="grid grid-cols-4 h-auto lg:grid-cols-3 justify-start gap-4  px-5  ">
            <p className="col-start-1  col-end-3">Other Charges</p>
            <p className="col-span-2 col-start-3 md-pr-2 ">100000</p>
          </div>
        </div>
        <div className="md:col-end-13 md:col-span-4 h-auto rounded-lg col-span-full grid items-center bg-primary-gray">
          <div className="grid grid-cols-4 justify-start lg:grid-cols-3 py-2 gap-4 px-5  ">
            <p className="col-start-1 col-end-3">Overall Discount</p>
            <p className="col-span-2 col-start-3 md-pr-2">100000</p>
          </div>
        </div>
        <div className="md:col-end-13 md:col-span-4 rounded-lg h-auto col-span-full grid items-center bg-primary-gray">
          <div className="grid grid-cols-4 justify-start lg:grid-cols-3 py-2 gap-4 px-5  ">
            <p className="col-start-1 col-end-3">Grand Total</p>
            <p className="col-span-2 col-start-3 md-pr-2 ">100000</p>
          </div>
        </div>
      </div>
      <section>
        <DataTable columns={i_columns} data={sample} />
      </section>
      <section className="grid grid-cols-12 md:gap-10 gap-5">
        <div className="mt-5 col-start-1 col-span-6 relative ">
          <Selections inputData={["Active", "Final"]} cValue={statusValue} placeholder="Status" setCValue={setStatusValue} />
        </div>
        <div className="col-span-6 gird items-center border bg-primary-gray py-1 px-2 rounded-lg col-start-7 mt-5 ">
          <Input type="text" placeholder="Amount" className="w-full px-2  b " />
        </div>
        <div className="col-span-full py-2 px-2 rounded-lg bg-primary-gray">
          <textarea placeholder="Note" className="h-auto px-1 w-full" >
          </textarea>
        </div>
      </section>
    </div>

  )
}




export default NewSales
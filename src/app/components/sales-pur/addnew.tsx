"use client"
import { BsPersonAdd } from "react-icons/bs"; 
import { BiCart } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import React, { useState, useEffect, useRef } from 'react'
import { format } from "date-fns"
import { Input } from '@/components/ui/input'
import { IoMdContact } from "react-icons/io";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"




import { sales_Column } from "../datatable/salesColumn";
import { DataTable } from "../datatable/DataTable";

import { pur_Column } from "../datatable/purColumn";


import Selections from "./selections";
import Link from "next/link";

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
    
    value: "999",
    label: "Dhilip",
  },
]
const sample = [
  {

    name: "Deepath",
    quantity: 2,
    price: 200000000,
    discount: 10,
    tax: 1,
    subtotal: 10,
  }
]
const NewSales = ({ data, setData, placeholder, isSales }: any) => {

  const cusRef = useRef<null | any>(null);
  const dateRef = useRef<null | any>(null);
  const itemRef = useRef<null | any>(null);
  useEffect(() => {
    const handleClose = (e: any) => {
      if (!cusRef.current?.contains(e.target)) {
        setCustomerOpen(false);
      }
      if(!itemRef.current?.contains(e.target)) {
        setItemOpen(false);
      }
    }
    document.addEventListener('click', handleClose)
  }, [])

  const [customerOpen, setCustomerOpen] = useState<boolean>(false)
  const handleCustomerClick = (label: string): void => {
    setData({ ...data, customerName: label });
    setCustomerOpen(false);
  }
  const { billDate } = data;
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
  const [statusValue, setStatusValue] = useState("")

  useEffect(() => {
    setData({ ...data, billStatus: statusValue });
  }, [statusValue]);

  const [taxType, setTaxType] = useState("");

  useEffect(() => {
    setData({ ...data, billTaxType: taxType });
  }, [taxType]);

  const [disType, setDisType] = useState("");
  useEffect(() => {
    setData({ ...data, billDiscountType: disType });
  }, [disType]);

  const [payType, setPayType] = useState("");
  useEffect(() => {
    setData({ ...data, billPaymentType: payType });
  }, [payType]);




  return (
    <div className='mx-10 mt-10 mb-10'>
      <section>
        <div className="grid grid-cols-12 gap-5 md:gap-10">
          <div ref={cusRef} className="  relative  col-start-1 md:col-span-6 col-span-full">
            <div className="flex bg-primary-gray  py-1 px-2 rounded-lg border items-center ">
              <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
              <Input placeholder={placeholder} value={"" || data.customerName} readOnly onClick={() => {
                setCustomerOpen(!customerOpen)
              }} className=" cursor-pointer  " />
              <Link href={""}>
                <BsPersonAdd className="ml-2 h-4 w-4 shrink-0  opacity-50" />
              </Link>
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
                            {item.label} <p className="hidden">{item.value}</p>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              )
            }
          </div>
          <div ref={dateRef} className="md:col-start-7 md:col-span-6 col-span-full">
            <div className="flex  py-1 text-w bg-primary-gray px-2 rounded-lg border items-center cursor-pointer "
             >
              <AiOutlineCalendar className="mr-2  h-4 w-4 shrink-0  opacity-50" />
              <Input placeholder='Select Customer' value={billDate ? format(billDate, "PPP") : ''} readOnly onClick={() => {
                
              }} className="  cursor-default " />
            </div>
          </div>
        </div>
        {
          !isSales && 
        <div className="mt-5 mb-10 col-span-full relative ">
          <Selections inputData={["Active", "Final"]} cValue={statusValue} placeholder="Status" setCValue={setStatusValue} icon={true} />
        </div>
        }
        <div ref={itemRef} className="mt-5 relative">
          <div className="flex items-center border py-1 bg-primary-gray px-2 rounded-lg">
            <BiCart className="mr-2 h-4 w-4 shrink-0  opacity-50" />
            <Input placeholder="Item Name / Barcode / Item Number" value={items}
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
            <div className="mt-2 z-10 border rounded-lg bg-white absolute w-full">
              {
                Items.filter((item, i) => {
                  return items === "" ? true : item.value.toLowerCase().includes(items.toLowerCase())
                }).map((item, index) => {
                  return (
                    <div className="">
                      <p key={index}
                        className="px-3 py-1 cursor-pointer"
                        onClick={() => {
                          setItemList([...itemList, item.value]);
                          setItems("")
                          setItemOpen(false);
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
        <DataTable
          columns={isSales ? sales_Column : pur_Column}
          rows={true}
          paginater={true}
          data={sample} />
      </section>
      <div className="grid grid-cols-12 grid-rows-4 grid-flow-col gap-4">
        <div className="col-start-1 items-center grid col-span-full md:col-span-6 h-auto rounded-lg bg-primary-gray">
          <div className="grid md:grid-cols-4 gap-20 px-5  ">
            <p className="col-start-1 col-end-3">Quantity</p>
            <p className="col-span-2 col-start-3 ">$ {data.billQuantity} </p>
          </div>
        </div>
        <div className="grid items-center grid-cols-subgrid h-auto grid-rows-subgrid gap-2 col-start-1 px-1 bg-primary-gray col-span-12 md:col-span-6 rounded-lg row-span-1">
          <div className="col-start-1 pl-2 col-end-7 py-2 md:col-end-4">
            <input id="Charges"
              className=" w-full rounded-md border px-2 h-10 outline-none"
              type="number"
              onChange={(e) => { setData({ ...data, billCharges: e.target.value }) }}
              placeholder="Other Charges" />
          </div>
          <div className="md:col-start-4 col-start-7 h-auto col-end-13 relative md:col-end-7  bg-primary-gray">
            <Selections inputData={["GST 5%", "VAT 5%"]} cValue={taxType} placeholder="Type" setCValue={setTaxType} icon={false} />
          </div>
        </div>
        <div className="grid  items-center grid-cols-subgrid grid-rows-subgrid gap-2 col-start-1 px-1 bg-primary-gray col-span-12 md:col-span-6 rounded-lg row-span-1">
          <div className="col-start-1 pl-2 col-end-7 md:col-end-4">
            <input id="Charges"
              onChange={(e) => { setData({ ...data, billDiscount: e.target.value }) }}
              className=" w-full border rounded-md px-2 h-10 outline-none"
              placeholder="Overall Discount" />
          </div>
          <div className="md:col-start-4 col-start-7 col-end-13 relative md:col-end-7  bg-primary-gray">
            <Selections inputData={["Per %", "Fixed"]} cValue={disType} placeholder="Type" setCValue={setDisType} icon={false} />
          </div>
        </div>
        <div className="grid items-center  grid-rows-subgrid gap-2 col-start-1 px-2 bg-primary-gray col-span-12 md:col-span-6 rounded-lg row-span-1">
          <div className="py-2">
            <textarea
              id="Charges"
              className=" w-full rounded-md px-2 h-auto resize-none outline-none"
              placeholder="Note"
              onChange={(e) => { setData({ ...data, billNote: e.target.value }) }}
            />
          </div>
        </div>
        <div className="md:col-end-13  h-auto md:col-span-4 rounded-lg col-span-full grid items-center bg-primary-gray">
          <div className="grid whitespace-nowrap text-ellipsis overflow-clip grid-cols-4 lg:grid-cols-3 py-2 justify-start gap-4  px-5 ">
            <p className="col-start-1 md:text-end col-end-3">Subtotal</p>
            <p className="col-span-2 col-start-3 md-pr-2 "> $ {data.billSubtotal} </p>
          </div>
        </div>
        <div className="md:col-end-13 md:col-span-4 py-2 h-auto rounded-lg col-span-full grid items-center bg-primary-gray">
          <div className="grid grid-cols-4 h-auto lg:grid-cols-3 justify-start gap-4  px-5  ">
            <p className="col-start-1 md:text-end  col-end-3">Other Charges</p>
            <p className="col-span-2 col-start-3 md-pr-2 "> ${data.billOtherCharge} </p>
          </div>
        </div>
        <div className="md:col-end-13 md:col-span-4 h-auto rounded-lg col-span-full grid items-center bg-primary-gray">
          <div className="grid grid-cols-4 justify-start lg:grid-cols-3 py-2 gap-4 px-5  ">
            <p className="col-start-1 md:text-end  col-end-3">Overall Discount</p>
            <p className="col-span-2 col-start-3 md-pr-2">${data.billOverallDis} </p>
          </div>
        </div>
        <div className="md:col-end-13 md:col-span-4 rounded-lg h-auto col-span-full grid items-center bg-primary-gray">
          <div className="grid grid-cols-4 justify-start lg:grid-cols-3 py-2 gap-4 px-5  ">
            <p className="col-start-1 md:text-end  col-end-3">Grand Total</p>
            <p className="col-span-2 col-start-3 md-pr-2 ">${data.billTotal} </p>
          </div>
        </div>
      </div>
      <section className="pt-5">
        <h2 className="text-green-500">Previous Payment Information :</h2>
        <DataTable
          columns={sales_Column}
          data={sample}
          rows={true}
          paginater={true}
        />
      </section>
      <section className="grid grid-cols-12 md:gap-10 gap-5">
        <div className="mt-5 col-start-1 col-span-6 relative ">
          <Selections inputData={["Cash", "Credit Card", "Debit Card", "Paytm"]} cValue={payType} placeholder="Payment Type" setCValue={setPayType} icon={false} payment={true} />
        </div>
        <div className="col-span-6 gird items-center border bg-primary-gray py-1 px-2 rounded-lg col-start-7 mt-5 ">
          <Input type="text"
            placeholder="Amount"
            className="w-full px-2 appearance-none "
            onChange={(e) => { setData({ ...data, billAmount: e.target.value }) }}
          />
        </div>
        <div className="col-span-full py-2 px-2 rounded-lg bg-primary-gray">
          <textarea
            placeholder="Note"
            className="h-auto px-1 w-full resize-none rounded-md outline-none"
            onChange={(e) => { setData({ ...data, billNote: e.target.value }) }}
          />

        </div>
      </section >

    </div>

  )
}




export default NewSales
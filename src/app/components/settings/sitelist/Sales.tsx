import React from 'react'
import { useState } from 'react'
interface Siteinformation {

  siteName: "",
  timeZone: String,
  dateFormat: String
  timeFormat: String,
  currency: String,
  enableRoundOff: Boolean,
  disableTax: Boolean,
  language: String,
  siteLogo: String

}

function Sales() {
  const [formData,setformdata]=useState<Siteinformation>({
    siteName: "",
    timeZone: "",
    dateFormat: "",
    timeFormat: "",
    currency: "",
    enableRoundOff:false,
    disableTax: false,
    language: "",
    siteLogo: ""
  })

  return (
    <div className="">
      <form action="" className=' md:flex md:flex-col  gap-y-3  p-10'>
        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2 lg:text-end  lg:gap-x-10  ">
          <label htmlFor="" className='mr-2 md:col-span-5 col-span-12 '>
            Default Sales Discount(%)  <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center  flex  p-2  lg:text-end  lg:gap-x-10 ">
          <label htmlFor="" className='mr-2 md:col-span-5 col-span-1  basis-3/4 '>
            Show Paid Amount and Change Return (in POS)
          </label>
          <input type="checkbox" className=' cursor-pointer md:col-span-1 col-span-10 h-[2.0rem] w-[4.5rem] ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center  flex  p-2  lg:text-end  lg:gap-x-10 ">
          <label htmlFor="" className='mr-2 md:col-span-5 col-span-1 basis-3/4 '>
            Show UPI Code On Invoice
          </label>
          <input type="checkbox" className='   cursor-pointer md:col-span-1 col-span-10 h-[2.0rem] w-[4.5rem] ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2 lg:gap-x-10   lg:text-end">
          <label htmlFor="" className='mr-2 md:col-span-5 col-span-12 '>
            Sale Invoice Format   <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2 lg:gap-x-10 lg:text-end   ">
          <label htmlFor="" className='mr-2 md:col-span-5 col-span-12 '>
            Sales Invoice Footer Text  <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>

        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2  lg:gap-x-10 lg:text-end  ">
          <label htmlFor="" className='mr-2 md:col-span-5 col-span-12 '>
            Invoice Terms And Condition   <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>
      </form>
    </div>

  )
}

export default Sales
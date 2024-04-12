import React from 'react'
import { useState } from 'react'
interface Siteinformation {

  defaultDiscount:String,
  showPaidAmount:String,
  showUpiCode:String,
  invoiceFormat:String,
  footerText:String,
  termsAndcondition:String
}

function Sales({edit}:any) {
  const [formData,setformdata]=useState<Siteinformation>({
    defaultDiscount:"",
    showPaidAmount:"",
    showUpiCode:"",
    invoiceFormat:"",
    footerText:"",
    termsAndcondition:""
  })

  
  function handleData(event: any) {
    const { name, value } = event.target
    setformdata(previous => ({ ...previous, [name]: value }))


  }
  function hanndleSubmit(event: any) {
    event.preventDefault();
    console.log(formData);


  }


  return (
    <div className="">
      <form action="" onSubmit={hanndleSubmit} className=' md:flex md:flex-col  gap-y-3  p-10'>
        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2 lg:text-end  lg:gap-x-10  ">
          <label htmlFor="defaultDiscount" className='mr-2 md:col-span-5 col-span-12 '>
            Default Sales Discount(%)  <span className=' text-red-600'> *</span>
          </label>
          <input onChange={handleData}   disabled={!edit} name='defaultDiscount' type="text" className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center  flex  p-2  lg:text-end  lg:gap-x-10 ">
          <label htmlFor="showPaidAmount" className='mr-2 md:col-span-5 col-span-1  basis-3/4 '>
            Show Paid Amount and Change Return (in POS)
          </label>
          <input onChange={handleData}   disabled={!edit} name='showPaidAmount' type="checkbox" className=' cursor-pointer md:col-span-1 col-span-10 h-[2.0rem] w-[4.5rem] ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center  flex  p-2  lg:text-end  lg:gap-x-10 ">
          <label htmlFor="showUpiCode" className='mr-2 md:col-span-5 col-span-1 basis-3/4 '>
            Show UPI Code On Invoice
          </label>
          <input onChange={handleData}  disabled={!edit} name='showUpiCode' type="checkbox" className='   cursor-pointer md:col-span-1 col-span-10 h-[2.0rem] w-[4.5rem] ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2 lg:gap-x-10   lg:text-end">
          <label htmlFor="invoiceFormat" className='mr-2 md:col-span-5 col-span-12 '>
            Sale Invoice Format   <span className=' text-red-600'> *</span>
          </label>
          <input onChange={handleData}  disabled={!edit} name='invoiceFormat' type="text" className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2 lg:gap-x-10 lg:text-end   ">
          <label htmlFor="footerText" className='mr-2 md:col-span-5 col-span-12 '>
            Sales Invoice Footer Text  <span className=' text-red-600'> *</span>
          </label>
          <input onChange={handleData}  disabled={!edit} name='footerText' type="text" className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>

        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2  lg:gap-x-10 lg:text-end  ">
          <label htmlFor="" className='mr-2 md:col-span-5 col-span-12 '>
            Invoice Terms And Condition   <span className=' text-red-600'> *</span>
          </label>
          <input onChange={handleData}  disabled={!edit} name='termsAndcondition' type="text" className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>
        {
            edit && 
            <div className=" md:flex justify-center gap-7 h-[100px]  lg:-bottom-10 lg:right-[50%] lg:translate-x-[50%] ">

            <input 
              type="submit"
              className="mt-10 w-[140px] h-[40px]  bg-green-400 font-bold text-white  rounded-md cursor-pointer  "
              value="Update"
            />

            <input

              type="reset"
              className="mt-10  bg-red-400   w-[140px] h-[40px]  rounded-md   font-bold text-white cursor-pointer"
              value="Cancel"
            />
          </div>
          }
      </form>
    </div>

  )
}

export default Sales
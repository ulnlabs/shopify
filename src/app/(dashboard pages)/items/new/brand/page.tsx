"use client"
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import axios from 'axios';
import Link from 'next/link'
import React, { useRef } from 'react'

export default function page() {

  const formRef = useRef<any | undefined>();



  return (
    <div className='w-full p-4 '>
      <DashboardHeader title='Brand ' subtitle='New/Update Brand' breadcrumb={[{ path: '/dashboard', title: 'Dashboard' }, { path: '/items/brands', title: "Brand-list" }, { path: '/item/new/brand', title: "brand" }]} />
      <div className=" mt-4 border-t-2 rounded-lg border-[--primary] p-4 shadow-sm h-fit">
        <h1 className='py-2 text-xl font-medium text-gray-800'>Please Enter Valid Data</h1>
        <form ref={formRef} onSubmit  ={async(e:any)=>{
          e.preventDefault();
          const formData = new FormData(formRef.current);
          const data =await axios.post("/api/brand",formData);
          console.log(data);
          
        }} className="w-full h-fit flex flex-col border-t border-b gap-6 py-4">
          <div className="items-start flex flex-col gap-2 md:w-1/2 w-full">
            <label htmlFor="name">Brand Name<span className='text-red-400 col-start-1 col-span-3 auto-cols-max'>*</span></label>
            <input name='name' id='name' type="text" placeholder='' className='p-2 border outline-none rounded w-full' />
          </div>
          <div className="items-start flex flex-col gap-2 md:w-1/2 w-full">
            <label htmlFor="desc">Category Name<span className='text-red-400 col-start-1 col-span-3 '>*</span></label>
            <textarea name="desc" id="desc" cols={30} rows={10} className='p-2 border outline-none h-32 resize-none rounded  w-full'></textarea>
          </div>
          <div className="w-full py-2 items-center justify-center gap-4 pt-4 grid grid-cols-2">
            <input className=' py-2 cursor-pointer text-white rounded  bg-green-400' type='submit' value={"Save"} />
            <Link href={"dashboard"} className=' py-2 text-white rounded text-center bg-red-400'>Close</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

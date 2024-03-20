import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React from 'react'

export default function page() {
  return (
    <div className='w-full p-4 '>
      <DashboardHeader title='Category' subtitle='new/Update Category' breadcrumb={[{ path: '/dashboard', title: 'Dashboard' }, { path: '/item/new', title: "new-item" }, { path: '/item/new/category', title: "item-category" }]} />
      <div className=" mt-4 border-t-2 rounded-lg border-[--primary] p-4 shadow-sm h-fit">
        <h1 className='py-2 text-xl font-medium text-gray-800'>Please Enter Valid Data</h1>
        <div className="w-full h-fit flex flex-col border-t border-b gap-6 py-4">
          <div className="items-start flex flex-col gap-2 md:w-1/2 w-full">
            <label htmlFor="">Category Name<span className='text-red-400 col-start-1 col-span-3 auto-cols-max'>*</span></label>
            <input type="text" placeholder='' className='p-2 border outline-none rounded w-full' />
          </div>
          <div className="items-start flex flex-col gap-2 md:w-1/2 w-full">
            <label htmlFor="">Category Name<span className='text-red-400 col-start-1 col-span-3 '>*</span></label>
            <textarea name="" id="" cols={30} rows={10} className='p-2 border outline-none h-32 resize-none rounded  w-full'></textarea>
          </div>
        </div>
        <div className="w-full py-2 items-center justify-center gap-4 pt-4 grid grid-cols-2">
          <button className=' py-2 text-white rounded  bg-green-400'>Save</button>
          <button className=' py-2 text-white rounded  bg-red-400'>Close</button>
        </div>
      </div>
    </div>
  )
}

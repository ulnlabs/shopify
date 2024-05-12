"use client"
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function page() {
  const [category, setCategory] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [error, setError] = useState<string>('')
  useEffect(() => {
    console.log({ category, description })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, description])
  const handleCategory = async () => {
    if (!category) {
      setError('category is required');
      setInterval(() => {
        setError('');
      }, 6000)
      return;
    }
    console.log({ category, description })
    try {
      const res = await fetch('/api/category', {
        method: 'POST',
        body: JSON.stringify({ name:category, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        setDescription('')
        setCategory('')
        setError('New Category Added')
        setInterval(() => {
          setError('')
        }, 6000)
      }
    } catch (error) {
      setError('Something went wrong');
      setInterval(() => {
        setError('');
      }, 6000)
    }
  }
  const router = useRouter();
  return (
    <div className='w-full p-4 '>
      <div className="w-full fixed top-0 left-0 h-fit ">
        <div className={`fixed top-4 left-0 right-0 w-fit mx-auto text-[primary] border-b border-[primary] bg-white px-4 py-2 z-10 ${error ? '' : 'hidden'}`}>{error}</div>
      </div>
      <DashboardHeader title='Category' subtitle='new/Update Category' breadcrumb={[{ path: '/dashboard', title: 'Dashboard' }, { path: '/item/new', title: "new-item" }, { path: '/item/new/category', title: "item-category" }]} />
      <div className=" mt-4 border-t-2 rounded-lg border-[--primary] p-4 shadow-sm h-fit">
        <h1 className='py-2 text-xl font-medium text-gray-800'>Please Enter Valid Data</h1>
        <div className="w-full h-fit flex flex-col border-t border-b gap-6 py-4">
          <div className="items-start flex flex-col gap-2 md:w-1/2 w-full">
            <label htmlFor="category">Category Name<span className='text-red-400 col-start-1 col-span-3 auto-cols-max'>*</span></label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" id='category' name='description' placeholder='' className='p-2 border outline-none rounded w-full' />
          </div>
          <div className="items-start flex flex-col gap-2 md:w-1/2 w-full">
            <label htmlFor="description">Description<span className='text-red-400 col-start-1 col-span-3 '>*</span></label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" cols={30} rows={10} className='p-2 border outline-none h-32 resize-none rounded  w-full'></textarea>
          </div>
        </div>
        <div className="w-full py-2 items-center justify-center gap-4 pt-4 grid grid-cols-2">
          <button onClick={handleCategory} className=' py-2 text-white rounded  bg-green-400'>Save</button>
          <button onClick={() => { setCategory(''); setDescription(''); router.back() }} className=' py-2 text-white rounded  bg-red-400'>Close</button>
        </div>
      </div>
    </div>
  )
}   

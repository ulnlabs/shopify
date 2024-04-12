import React from 'react'

function Prefixes({edit}:any) {
  return (
    <div className="">
    <form action="" className='  grid  grid-col-1 lg:grid-cols-2 gap-y-3  p-10'>
      <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-10  ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
   Category <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-10 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
       Supplier  <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
      Purchase Return  <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
        Sales  <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
        Expense  <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
        item  <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
        Purchas <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
        Customer <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
        Sales Return <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

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

export default Prefixes
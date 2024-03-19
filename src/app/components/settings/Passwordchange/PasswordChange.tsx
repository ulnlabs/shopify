import React from 'react'

function PasswordChange() {
  return (
    <div className="">
    <form action="" className='  grid grid-rows-3  p-10'>
      <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-10  ">
        <label htmlFor=""  className='mr-2 md:col-span-4 col-span-12 '>
   Current Password <span className=' text-red-600'> *</span>
        </label>
        <input type="text" className=' border rounded-md h-8 md:col-span-4 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-10 ">
        <label htmlFor=""  className='mr-2 md:col-span-4 col-span-12 '>
       New Password <span className=' text-red-600'> *</span>
        </label>
        <input type="text" className=' border rounded-md h-8 md:col-span-4 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
        <label htmlFor=""  className='mr-2 md:col-span-4 col-span-12 '>
      Confrim Password  <span className=' text-red-600'> *</span>
        </label>
        <input type="text" className=' border rounded-md h-8 md:col-span-4 col-span-12 ' />

      </div>
      
    </form>
  </div>
 
  )
}

export default PasswordChange
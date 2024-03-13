import React from 'react'

function Prefixes() {
  return (
    <div className="">
      <form action="" className=' lg:col-span-4  grid md:grid-rows-5  md:grid-flow-col grid-col-12 grid-row-12 gap-4 md:gap-9 p-10'>
        <div className=" grid gap-3">
          <label htmlFor=""  className='mr-2'>
            Category <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className=" grid gap-3">
          <label htmlFor="" className='mr-2 '>
            Supplier <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
            Purchase Return <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className=" grid gap-3">
          <label htmlFor="">
            Sales <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
            Expense <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
            Item <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
            Purchase <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
            Customer <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
            Sales Return <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
       
      </form>
    </div>
    
  )
}

export default Prefixes
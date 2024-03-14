import React from 'react'

function Sales() {
  return (
    <div className="">
      <form action="" className='  p-10'>
        <div className=" grid gap-3  ">
          <label htmlFor=""  className='mr-2  '>
          Default Sales Discount(%)  <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className=" grid gap-3  ">
          <label htmlFor="" className='mr-2  '>
          Show Paid Amount and Change Return (in POS) <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8 ' />

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
          Show UPI Code on Invoice <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className=" grid gap-3">
          <label htmlFor="">
          Sales Invoice Formats <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
          Sales Invoice Footer Text <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
          Invoice Terms and Conditions <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        
      </form>
    </div>
   
  )
}

export default Sales
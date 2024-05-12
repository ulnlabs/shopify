import React, { useState } from 'react'

function PasswordChange() {
    const [edit,setedit]=useState(false)
  return (
    <div className=" flex justify-center   ">
        <div className="border rounded-md">

        <div className="flex justify-between px-5 py-1">
         <div className=""></div>
         <button onClick={()=>{setedit(!edit)}} className='border px-2 mt-2 rounded-md '>Edit</button>
        </div>
        <div className="">

    <form action="" className='  grid grid-rows-3  p-10'>
      <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-1  ">
        <label htmlFor="currentPassword"  className='mr-2 md:col-span-5 col-span-12 '>
   Current Password <span className=' text-red-600'> *</span>
        </label>
        <input disabled={!edit} type="text" id='currentPassword' name='currentPassword' className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-1 ">
        <label htmlFor="newPassword"  className='mr-2 md:col-span-5 col-span-12 '>
       New Password <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" id='newPassword' name='newPassword' className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-1 ">
        <label htmlFor="confirmPasswprd"  className='mr-2 md:col-span-5 col-span-12 '>
      Confrim Password  <span className=' text-red-600'> *</span>
        </label>
        <input  disabled={!edit} type="text" id='confirmPasswprd' name='confirmPasswprd' className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

      </div>
      {
            edit && <div className=" mt-10 flex justify-center gap-4 lg:absolute lg:-bottom-10 lg:right-[50%] lg:translate-x-[50%] ">
              <input
                type="submit"
                className=" w-[140px] h-[40px]  bg-green-400 font-bold text-white  rounded-md cursor-pointer  "
                value="Update"
              />
              <input
                type="reset"
                className="  bg-red-400   w-[140px] h-[40px]  rounded-md   font-bold text-white cursor-pointer"
                value="Cancel"
              />
            </div>
          }
       
    </form>
        </div>
        </div>
  </div>
 
  )
}

export default PasswordChange
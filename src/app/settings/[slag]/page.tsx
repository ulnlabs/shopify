"use client"
import React, { useState } from 'react'
import Site from '@/app/components/settings/Site'
import Sales from '@/app/components/settings/Sales'
import Prefixes from '@/app/components/settings/Prefixes'
function page() {
    const[page,setpage]=useState("Site");
    const navigateoption=["Site","Sales","Prefixes"]
 var renderpage;
    if(page=="Sales"){
       renderpage=<Sales />
    }
    else if(page=="Prefixes"){
        renderpage=<Prefixes/>
    }
    else{
        renderpage=<Site/>  
    }
    return (
        <>
            <div className=" bg-[var(--settings)] h-screen ">
                <div className=" p-4 w-full ">
                    <h1 className='text-lg tracking-[.2rem] font-medium'>Site Settings <span className=' text-xs text-gray-500'>Add/update Site Settings</span></h1>
                </div>
                <div className=" flex justify-center ">

                    <div className=" border w-[95%] bg-white   rounded-md">
                        <div className="">
                        <nav className=' flex  '>
                           <ul  className=' flex text-sm gap-4 p-2 '>
                            {navigateoption.map((item,index)=>(
                                <li className='cursor-pointer' onClick={()=>setpage(item)} key={index}>{item}</li>
                            ))}
                            
                           </ul>
                        </nav>
                        </div>
                        {renderpage}
                      
                       

                       
                    </div>

                </div>



            </div>



        </>
    )
}

export default page
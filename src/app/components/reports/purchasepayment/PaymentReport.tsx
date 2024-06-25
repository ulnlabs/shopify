"use client"
import React from 'react'
import { useState } from 'react';
import PurchasePayment from "./type/PurchasePayment"
import SupplierPayments from './type/SupplierPayments';
import DateCalender from "@/app/components/calender/DateCalender"


function PaymentReport
() {
    const [Page, setPage] = useState(" " )
    const menu:string[]=["PurchasePayment","SupplierPayments"]
    const [activeIndex, setActiveIndex] = useState(0); // State to track active navigation item index

    var CurrentComponent
    switch(Page){
        case "PurchasePayment":
            CurrentComponent=<PurchasePayment />
            break;
        case "SupplierPayments":
            CurrentComponent=<SupplierPayments />
            break;
        default:
            CurrentComponent=<PurchasePayment />



      
    }
    

    return (
        <div className="w-[100%] flex justify-center items-center flex-col">
            <div className="w-[98%] border border-t-2 border-t-violet-300">
                <div className="p-2 font-medium  border-b-[1px]  border-b-slate-400/10 ">
                    <h2>Please Enter Correct Information</h2>
                </div>
                <div className="">
                    <form action="" className=' border-b-[1px] border-b-slate-400/10 grid  grid-col-1 lg:grid-cols-2 gap-y-1  p-2'>
                        <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-10  items-center">
                            <label htmlFor="" className='mr-2  md:col-span-5 col-span-12 '>
                                From Date :
                            </label>
                            <div className=" h-8 md:col-span-6 col-span-12 ">
                                
                                <DateCalender  />
                                </div>
                            
                        </div>
                        <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-10 items-center">
                            <label htmlFor="" className='mr-2 md:col-span-5 col-span-12 '>
                                To Date:
                            </label>
                            <div className=" h-8 md:col-span-6 col-span-12 ">
                                
                                <DateCalender  />
                                </div>
                            

                        </div>
                        <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 items-center">
                            <label htmlFor="" className='mr-2 md:col-span-5 col-span-12 '>
                                Supplier Name :
                            </label>
                            <input type="text" className=' border rounded-md h-9 md:col-span-6 col-span-12 ' />

                        </div>
                        <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 items-center">
                            <label htmlFor="" className='mr-2 md:col-span-5 col-span-12 '>
                                Payment Type:
                            </label>
                            <input type="text" className=' border rounded-md h-9 md:col-span-6 col-span-12 ' />

                        </div>

                    </form>
                    <div className=" w-full flex gap-5 justify-center  p-2">
                        <button className='p-2 bg-green-400 rounded-md w-[120px]'>
                            Show
                        </button>
                        <button className='p-2 bg-orange-400 rounded-md w-[120px]'>
                            Close
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 border-t-[2px] p-2 w-[98%]">
            <div className=" border-b p-3">
                        <ul className='flex gap-3'>
                            {menu.map((item,index)=>(
                                <li onClick={()=>{setActiveIndex(index); setPage(item)}} className={` cursor-pointer ${activeIndex === index ? 'active' : ''} `} key={index}>{item}</li>
                            ))}
                        </ul>
                        
                    </div>
               
                <div className=" mt-3">
                    {CurrentComponent}
                   
                  
                   
                </div>



            </div>
            <style jsx>{
                `
                .active {
                    position: relative;
                   
                }
                .active::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 3px;
                    background-color:#CCCCFF ;
                    border-radius:20px
                }
            `}
                </style>
            
        </div>
        

    )
}

export default PaymentReport

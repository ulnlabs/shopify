"use client"
import React, { useState } from 'react'
import Companyprofile from "@/app/components/settings/companyprofile/Companyprofile"
import Sitesettings from "@/app/components/settings/sitelist/Sitesettings"
import Taxlist from "@/app/components/settings/taxlist/Taxlist"
import Unitlist from '@/app/components/settings/unitlist/Unitlist'
import Payment from "@/app/components/settings/payment_type/Payment"
import Changepassword from '@/app/components/settings/Passwordchange/Changepassword'

function page({params}:{params:{slag:string}}) {
    const router=params.slag
    interface Details {
        current_route: React.ReactNode;
        header: React.ReactNode;
        subheader: React.ReactNode;
    }
    let detail:Details={
        current_route: "",
        header:"",
        subheader:""
    }
    
    switch(router){
        case 'company':
            detail.current_route=<Companyprofile />
          detail.header="company profile"
            detail.subheader="Add/Update Company Profile"
            break;

        case 'sitelist':
            detail.current_route=<Sitesettings />
            detail.header="Site settings"
              detail.subheader="Add/update Site Settings"
              break;

        case 'taxlist':
          detail.current_route=<Taxlist />
          detail.header="Tax List"
          detail.subheader="Add/update Tax List"
          break;

       case 'unitlist':
          detail.current_route=<Unitlist />
          detail.header="Unit List"
          detail.subheader="Add/update Unit List"
          break;

       case 'payment-type':
          detail.current_route=<Payment/>
          detail.header="Payment Type List"
          detail.subheader="Add/View Payment Type List"
          break;
          case 'change-password':
            detail.current_route=<Changepassword/>
            detail.header="Change Password"
            detail.subheader="Reset Password"
            break;
  
    
          
        default:
            detail.current_route= <div>Invalid Route</div>;
    }
  return (
    <>
    <div className="h-screen w-full  ">
       
        <div className="">
            <h1 className='text-xl p-4 font-medium tracking-[.3em]'>{detail.header} <span className=' text-xs tracking-[.1em] text-gray-500'>  {detail.subheader}</span></h1>
        </div>

    <div >
        {detail.current_route}
    </div>
    </div>
    </>
    
  )
}

export default page

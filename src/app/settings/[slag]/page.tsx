"use client"
import React, { useState } from 'react'
import Companyprofile from "@/app/components/settings/companyprofile/Companyprofile"
import Sitesettings from "@/app/components/settings/sitelist/Sitesettings"
import Currencylist from "@/app/components/settings/currencylist/Currencylist"

function page({params}:any) {
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
        case 'currencylist':
          detail.current_route=<Currencylist />
          detail.header="Currency List"
          detail.subheader="Add/update Currency List"
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

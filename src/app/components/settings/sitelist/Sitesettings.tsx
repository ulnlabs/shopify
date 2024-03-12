import Site from '@/app/components/settings/sitelist/Site'
import Sales from '@/app/components/settings/sitelist/Sales'
import Prefixes from '@/app/components/settings/sitelist/Prefixes'
import Unitlist from '@/app/components/settings/unitlist/Unitlist'
import { useState } from 'react'
function Sitesettings() {
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
               
                <div className=" flex justify-center ">

                    <div className=" border w-[95%] bg-white   rounded-md">
                        <div className="">
                        <nav className=' flex  '>
                           <ul  className=' flex  text-sm gap-4 p-2 '>
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
export default Sitesettings

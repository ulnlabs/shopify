"use client";
import { log } from "console";
import React, {useState } from "react";
interface Siteinformation {

  siteName: String,
  timeZone: String,
  dateFormat: String,
  timeFormat: String,
  currency: String,
  enableRoundOff: Boolean,
  disableTax: Boolean,
  language: String,
  siteLogo: String

}


function Companyprofile() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function handleFileChange(e:any){
    const file =e.target.files?.[0];
    if(file){
      const reader=new FileReader();
      reader.onloadend=()=>{
        if(typeof reader.result=="string"){
          setSelectedImage(reader.result)
          
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const [formData,setformdata]=useState<Siteinformation>({
    siteName: "",
    timeZone: "",
    dateFormat: "",
    timeFormat: "",
    currency: "",
    enableRoundOff:false,
    disableTax: false,
    language: "",
    siteLogo: ""
  })

  function handleData(event:any){
    const {name,value}=event.target
    setformdata(previous=>({...previous,[name]:value}))
    

  }
function hanndleSubmit(event){
  event.preventDefault();
  console.log(formData);
  

}

  return (
    <>
    <div className="">
    <form action="" className='  flex flex-col   lg:grid lg:grid-cols-2 gap-y-3  p-5'>
      <div className=" md:grid md:grid-cols-12 grid   p-2 md:text-end  md:gap-x-5  ">
        <label htmlFor="siteName"  className='mr-2 md:col-span-5 col-span-12 '>
   Site Name <span className=' text-red-600'> *</span>
        </label>
        <input onChange={handleData}  type="text" id="siteName" name="siteName"   className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor="timeZone"  className='mr-2 md:col-span-5 col-span-12 '>
       Time Zone  <span className=' text-red-600'> *</span>
        </label>
        <input onChange={handleData}  type="text" name="timeZone" id="timeZone" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor="dateFormat"  className='mr-2 md:col-span-5 col-span-12 '>
      Date Format  <span className=' text-red-600'> *</span>
        </label>
        <input onChange={handleData}  type="text" name="dateFormat"  className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid   p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor="timeFormat"  className='mr-2 md:col-span-5 col-span-12 '>
     Time Format  <span className=' text-red-600'> *</span>
        </label>
        <input onChange={handleData}  type="text" name="timeFormat " className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor="currency"  className='mr-2 md:col-span-5 col-span-12 '>
      Currency  <span className=' text-red-600'> *</span>
        </label>
        <input onChange={handleData}  type="text" name="currency" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12 md:text-center   flex  p-2  lg:text-end   ">
          <label htmlFor="enableRoundOff"  className=' md:col-span-5 col-span-1 basis-1/4 sm:text-stat md:text-end md:mr-[10%] '>
          Enable Round Off
          </label>
          <input onChange={handleData}  type="checkbox" name="enableRoundOff" className=' cursor-pointer md:translate-x-[-10%] md:col-span-1 col-span-10 h-[2.0rem] w-[4.5rem] ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center   flex  p-2  lg:text-end   ">
          <label htmlFor="disableTax"  className=' md:col-span-5 col-span-1 basis-1/4 sm:text-stat md:text-end md:mr-[10%] '>
          Disable Tax
          </label>
          <input onChange={handleData}  type="checkbox" name="disableTax" className=' cursor-pointer md:translate-x-[-10%] md:col-span-1 col-span-10 h-[2.0rem] w-[4.5rem] ' />

        </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor="language"  className='mr-2 md:col-span-5 col-span-12 '>
        Language <span className=' text-red-600'> *</span>
        </label>
        <input onChange={handleData}  type="text" name="language" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
     Site logo <span className=' text-red-600'> *</span>
        </label>
        <input   type="file" onChange={handleFileChange} className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className="md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5">
        <div className="md:col-span-5 col-span-12 "></div>
        <div className=" border rounded-md h-[100px] col-span-4  ">
        {selectedImage&&
        <img src={selectedImage} className="w-full h-full" ></img>}
          
        </div>
        
      </div>
      
    </form>
  </div>
 
    </>
  );
}

export default Companyprofile;
"use client";
import React, { useState } from "react";
interface Siteinformation {
  siteName: String,
  dateFormat: String,
  currency: String,
  enableRoundOff: Boolean,
  disableTax: Boolean,
  language: String,
  siteLogo: String

}
const dateFormat=["DD/MM/YYYY","YYYY/MM/DD"]




function Companyprofile({ edit }: any) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function handleFileChange(e: any) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result == "string") {
          setSelectedImage(reader.result)

        }
      }
      reader.readAsDataURL(file)
    }
  }

  const [formData, setformdata] = useState<Siteinformation>({
    siteName: "",
    dateFormat: "",
    currency: " ₹ INR",
    enableRoundOff: false,
    disableTax: false,
    language: "",
    siteLogo: ""
  })

  function handleData(event: any) {
    const { name, value } = event.target
    setformdata(previous => ({ ...previous, [name]: value }))


  }
  function hanndleSubmit(event: any) {
    event.preventDefault();
    console.log(formData);


  }

  return (
    <>
      <div className="">
        <form action="" onSubmit={hanndleSubmit} className=' relative  flex flex-col   lg:grid lg:grid-cols-2 gap-y-3  p-5'>
          <div className=" md:grid md:grid-cols-12 grid   p-2 md:text-end  md:gap-x-5  ">
            <label htmlFor="siteName" className='mr-2 md:col-span-5 col-span-12 '>
              Site Name <span className=' text-red-600'> *</span>
            </label>
            <input disabled={!edit} onChange={handleData} type="text" id="siteName" name="siteName" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

          </div>

          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="dateFormat" className='mr-2 md:col-span-5 col-span-12 '>
              Date Format  <span className=' text-red-600'> *</span>
            </label>
            <select name="dateFormat" id="dateFormat" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' disabled={!edit} onChange={handleData}>
              <option value=""></option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY/MM/DD">YYYY/MM/DD</option>
            </select>

          </div>

          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="currency" className='mr-2 md:col-span-5 col-span-12 '>
              Currency  <span className=' text-red-600'> *</span>
            </label>
            <input disabled={!edit} onChange={handleData} type="text" value={formData.currency as any} name="currency" className=' border pl-3 rounded-md h-8 md:col-span-6 col-span-12 ' />

          </div>
          <div className=" md:grid md:grid-cols-12 md:text-center   flex  p-2  lg:text-end   ">
            <label htmlFor="enableRoundOff" className=' md:col-span-5 col-span-1 basis-1/4 sm:text-stat md:text-end md:mr-[10%] '>
              Enable Round Off
            </label>
            <input disabled={!edit} onChange={handleData} type="checkbox" name="enableRoundOff" className=' cursor-pointer md:translate-x-[-10%] md:col-span-1 col-span-10 h-[2.0rem] w-[4.5rem] ' />

          </div>
          <div className=" md:grid md:grid-cols-12 md:text-center   flex  p-2  lg:text-end   ">
            <label htmlFor="disableTax" className=' md:col-span-5 col-span-1 basis-1/4 sm:text-stat md:text-end md:mr-[10%] '>
              Disable Tax
            </label>
            <input disabled={!edit} onChange={handleData} type="checkbox" name="disableTax" className=' cursor-pointer md:translate-x-[-10%] md:col-span-1 col-span-10 h-[2.0rem] w-[4.5rem] ' />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="language" className='mr-2 md:col-span-5 col-span-12 '>
              Language <span className=' text-red-600'> *</span>
            </label>
          
            <select name="language" id="language" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' disabled={!edit} onChange={handleData}>
              <option value=""></option>
              <option value="English">English</option>
             
            </select>

          </div>
          <div className="">

            <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
              <label htmlFor="logo" className='mr-2 md:col-span-5 col-span-12 '>
                Site logo <span className=' text-red-600'> *</span>
              </label>
              <input style={edit ? {} : { cursor: "not-allowed" }} onChange={handleFileChange} disabled={!edit} type="file" id="logo" accept=".png,.jpeg" className=' border rounded-md h-8 md:col-span-6 col-span-12 border-none  ' />

            </div>
            <div className="md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5">
              <div className="md:col-span-5 col-span-12 "></div>

              <div style={edit ? {} : { cursor: "not-allowed" }} className=" border rounded-md h-[100px] md:col-span-4  ">
                {selectedImage &&
                  <img style={edit ? {} : { cursor: "not-allowed" }} className="h-[100%] w-[100%]" src={selectedImage} alt="company Logo" />
                }
              </div>
            </div>
          </div>
          {
            edit && <div className=" mt-10 flex justify-center gap-4 lg:absolute lg:-bottom-[20%] lg:right-[50%] lg:translate-x-[50%] ">
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


    </>
  );
}

export default Companyprofile;
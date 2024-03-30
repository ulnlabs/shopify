"use client";
import React, { FormEvent, useContext,useState,useEffect } from "react";
import Data from "@/app/components/settings/settingsData"





function Companyprofile() {
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  return (
    <>
      <div className="">
        <form action="" className='  grid  grid-col-1 lg:grid-cols-2 gap-y-3  p-10'>
          <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-5  ">
            <label htmlFor="companyName" className='mr-2 md:col-span-5 col-span-12 '>
              Company Name <span className=' text-red-600'> *</span>
            </label>
            <input type="text" id="companyName" name="companyName" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

          </div>
          <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="mobile" className='mr-2 md:col-span-5 col-span-12 '>
              Mobile  <span className=' text-red-600'> *</span>
            </label>
            <input type="text" name="mobile" id="mobile" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="email" className='mr-2 md:col-span-5 col-span-12 '>
              Email  <span className=' text-red-600'> *</span>
            </label>
            <input type="text" name="email" id="email" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="gstNo" className='mr-2 md:col-span-5 col-span-12 '>
              GST Number  <span className=' text-red-600'> *</span>
            </label>
            <input type="text" name="gstNo" id="gstNo" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="vatNo" className='mr-2 md:col-span-5 col-span-12 '>
              VAT Number  <span className=' text-red-600'> *</span>
            </label>
            <input type="text" name="vatNo" id="vatNo" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="bankdetails" className='mr-2 md:col-span-5 col-span-12 '>
              Bank Details  <span className=' text-red-600'> *</span>
            </label>
            <input type="text" name="bankdetails" id="bankdetails" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="panNo" className='mr-2 md:col-span-5 col-span-12 '>PAN Number
              <span className=' text-red-600'> *</span>
            </label>
            <input type="text" name="panNo" id="panNo" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="country" className='mr-2 md:col-span-5 col-span-12 '>
              Country <span className=' text-red-600'> *</span>
            </label>
            <select name="country" id="state" className=' border rounded-md h-8 md:col-span-6 col-span-12'>
           
              <option value={"India"} >
                India

              </option>
            
            
           </select>
          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="city" className='mr-2 md:col-span-5 col-span-12 '>
              City <span className=' text-red-600'> *</span>
            </label>
            <select name="city" id="state" className=' border rounded-md h-8 md:col-span-6 col-span-12'>
            {Data.map((City,index)=>(
              <option  key={index} value={City.city}>{City.city}</option>
            ))}
            
           </select>
          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="postalcode" className='mr-2 md:col-span-5 col-span-12 '>
              Postal Code <span className=' text-red-600'> *</span>
            </label>
            <input type="text" name="postalcode" id="postalcode" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="state" className='mr-2 md:col-span-5 col-span-12 '>
              State <span className=' text-red-600'> *</span>
            </label>
           <select name="state" id="state" className=' border rounded-md h-8 md:col-span-6 col-span-12'>
            {Data.map((State,index)=>(
              <option key={index} value={State.state}>{State.state}</option>
            ))}
            
           </select>
          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="address" className='mr-2 md:col-span-5 col-span-12 '>
              Address <span className=' text-red-600'> *</span>
            </label>
            <textarea cols={10} rows={10} name="address" id="address" className=' border rounded-md  md:col-span-6 h-[60px] col-span-12 ' />

          </div>
          <div className="">

            <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
              <label htmlFor="logo" className='mr-2 md:col-span-5 col-span-12 '>
                Site logo <span className=' text-red-600'> *</span>
              </label>
              <input type="file" id="logo" onChange={handleFileChange} accept=".png,.jpeg" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

            </div>
            <div className="md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5">
              <div className="md:col-span-5 col-span-12 "></div>
            
              <div className=" border rounded-md h-[100px] col-span-4  ">
              {selectedImage&&
              <img src={selectedImage} alt="company Logo" />
              }
              </div>
            </div>
          </div>
        </form>
        <div className=" flex justify-center gap-7 h-[100px] ">

          <input
            type="submit"
            className="mt-10 w-[140px] h-[40px]  bg-green-400 font-bold text-white  rounded-md cursor-pointer  "
            value="Update"
          />

          <input

            type="reset"
            className="mt-10  bg-red-400   w-[140px] h-[40px]  rounded-md   font-bold text-white cursor-pointer"
            value="Cancel"
          />
        </div>
      </div>
    </>
  );
}

export default Companyprofile;


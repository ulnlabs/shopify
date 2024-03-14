"use client";
import React, { FormEvent, useContext } from "react";
import { ContextData } from "../../../../../contextapi";

function Companyprofile() {
  const {formData,setFormData}=useContext(ContextData)

  const handleReset=():void => {
    setFormData({
      name: "",
      mobile: "",
      email: "",
      gst: "",
      tax: "",
      due: "",
      state: "",
      city: "",
      pincode: "",
      address: "",
    });


  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      name: "",
      mobile: "",
      email: "",
      gst: "",
      tax: "",
      due: "",
      state: "",
      city: "",
      pincode: "",
      address: "",
    });

  };
  const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

  return (
    <>
    <div className="">
    <form action="" className='  flex flex-col lg:  lg:grid lg:grid-cols-2 gap-y-3  p-5'>
      <div className=" md:grid md:grid-cols-12 grid   p-2 md:text-end  md:gap-x-5  ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
   Site Name <span className=' text-red-600'> *</span>
        </label>
        <input type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
       Time Zone  <span className=' text-red-600'> *</span>
        </label>
        <input type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
      Date Format  <span className=' text-red-600'> *</span>
        </label>
        <input type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid   p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
     Time Format  <span className=' text-red-600'> *</span>
        </label>
        <input type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
      Currency  <span className=' text-red-600'> *</span>
        </label>
        <input type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12 md:text-center   flex  p-2  lg:text-end   ">
          <label htmlFor=""  className=' md:col-span-5 col-span-1 basis-3/4 sm:text-stat md:text-end mr-[15%] '>
          Enable Round Off
          </label>
          <input type="checkbox" className='   cursor-pointer md:col-span-1 col-span-10 h-[2.0rem] w-[4.5rem] ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center   flex  p-2  lg:text-end   ">
          <label htmlFor=""  className=' md:col-span-5 col-span-1 basis-3/4 sm:text-stat md:text-end mr-[15%] '>
          Disable Tax
          </label>
          <input type="checkbox" className='   cursor-pointer md:col-span-1  basis-1/4  h-[2.0rem] w-[4.5rem] ' />

        </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
        Language <span className=' text-red-600'> *</span>
        </label>
        <input type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
        <label htmlFor=""  className='mr-2 md:col-span-5 col-span-12 '>
     Site logo <span className=' text-red-600'> *</span>
        </label>
        <input type="file" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

      </div>
      <div className="md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5">
        <div className="md:col-span-5 col-span-12 "></div>
        <div className=" border rounded-md h-[100px] col-span-4  "></div>
      </div>
      
    </form>
  </div>
 
    </>
  );
}

export default Companyprofile;
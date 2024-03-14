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
      <form action="" className=' lg:col-span-4  grid md:grid-rows-6  md:grid-flow-col grid-col-12 grid-row-12 gap-4 md:gap-9 p-10'>
        <div className=" grid gap-3">
          <label htmlFor=""  className='mr-2'>
            Site Name <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className=" grid gap-3">
          <label htmlFor="" className='mr-2 '>
            Time Zone <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
            Date Format <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className=" grid gap-3">
          <label htmlFor="">
           Time Format <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3 grid-cols-12">
          <label htmlFor="" className="md:col-span-6 md:col-end-7">
           Rounded Amount
          </label>
          <input type="checkbox"  className="md:col-span-4  h-8 " />
        </div>
        <div className="grid gap-3 grid-cols-12">
          <label htmlFor="" className="md:col-span-6 md:col-end-7 ">
           Disable Tax
          </label>
          <input type="checkbox"  className="md:col-span-4  h-8 " />
        </div>
        <div className="grid gap-3">
          <label htmlFor="">
          Currency <span className=' text-red-600'> *</span>
          </label>
          <select className="border h-8 rounded-md">
            {countries.map((country,index)=>(
              <option key={index} value={country}>{country}</option>
            ))}
          </select>

        </div>
        <div className="grid gap-3">
          <label htmlFor="">
            Language <span className=' text-red-600'> *</span>
          </label>
          <input type="text" className=' border rounded-md h-8' />

        </div>
        <div className="grid gap-3 grid-cols-12">
          <label htmlFor="" className="md:col-span-4 md:col-end-5">
            Site Logo
          </label>
          <input type="file"  className="md:col-span-8 md:col-end-13" />
        </div>
       
       
      </form>
    </div>
    </>
  );
}

export default Companyprofile;

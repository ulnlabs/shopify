"use client";
import React, { FormEvent, useContext, useState, useEffect } from "react";
import Data from "@/app/components/settings/settingsData"
import { json } from "stream/consumers";
import axios from "axios";
import { AnimatePresence } from 'framer-motion';
import Update from "@/app/components/settings/popup/Update"
// interface companydata {
//   companyName: string,
//   mobile?: number,
//   address: string,
//   state: string,
//   postalcode: string,
//   city: string,
//   country: string,
//   panNo: string,
//   bankdetails: string,
//   vatNo: string,
//   gstNo: string,
//   email: string,
//   logo: string
// }
function Companyprofile() {


  const [formdata, setformdata] = useState<any>({})
  const [edit, setEdit] = useState(false)
  const [alert, setAlert] = useState(false)

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
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.put("/api/companyDetail");
      const fetchData = response.data[0];
      if (fetchData) {
        setformdata(fetchData)
      }
    }
    fetchData()
  }, []);



  function handlesubmit(e: any) {
    e.preventDefault();
    setEdit(false)

    const handuler = async () => {

      const { data } = await axios.post("/api/companyDetail",
        {
          data: formdata,
          edit: edit
        }
      )
      setAlert(data.alert)
    }
    handuler()

    setTimeout(() => {
      setAlert(false)
    }, 3000)
  }
  function handleChange(e: any) {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }


  return (
    <div className=" flex justify-center relative py-4  ">
      <div className=" border w-[97%] rounded-md">
        <AnimatePresence>


          {
            alert && <Update close={setAlert} />
          }

        </AnimatePresence>

        <div className="flex justify-between p-4 mt-7 ">
          <div className=""></div>
          <div className="">

            <button type="button" onClick={() => {
              setEdit(!edit)
            }} className=" border rounded-md px-5 hover:bg-blue-300 transition-all duration-500 hover:scale-110 ease-in-out font-medium  ">Edit</button>
          </div>
        </div>
        <form onSubmit={handlesubmit} action="" className='  grid  grid-col-1 lg:grid-cols-2 gap-y-3 py-7  pr-10' >
          <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-5  ">
            <label htmlFor="companyName" className='mr-2 md:col-span-5 col-span-12 '>
              Company Name <span className=' text-red-600'> *</span>
            </label>
            <input value={formdata.companyName} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} type="text" autoFocus id="companyName" name="companyName" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' disabled={!edit} />

          </div>
          <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="mobile" className='mr-2 md:col-span-5 col-span-12 '>
              Mobile  <span className=' text-red-600'> *</span>
            </label>
            <input value={formdata.mobile} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} type="text" name="mobile" id="mobile" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' disabled={!edit} />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="email" className='mr-2 md:col-span-5 col-span-12 '>
              Email  <span className=' text-red-600'> *</span>
            </label>
            <input value={formdata.email} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} type="text" name="email" id="email" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' disabled={!edit} />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="gstNo" className='mr-2 md:col-span-5 col-span-12 '>
              GST Number  <span className=' text-red-600'> *</span>
            </label>
            <input value={formdata.gstNo} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} type="text" name="gstNo" id="gstNo" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' disabled={!edit} />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="vatNo" className='mr-2 md:col-span-5 col-span-12 '>
              VAT Number  <span className=' text-red-600'> *</span>
            </label>
            <input value={formdata.vatNo} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} type="text" name="vatNo" id="vatNo" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' disabled={!edit} />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="bankdetails" className='mr-2 md:col-span-5 col-span-12 '>
              Bank Details  <span className=' text-red-600'> *</span>
            </label>
            <input value={formdata.bankdetails} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} type="text" name="bankdetails" id="bankdetails" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' disabled={!edit} />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="panNo" className='mr-2 md:col-span-5 col-span-12 '>PAN Number
              <span className=' text-red-600'> *</span>
            </label>
            <input value={formdata.panNo} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} type="text" name="panNo" id="panNo" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' disabled={!edit} />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="country" className='mr-2 md:col-span-5 col-span-12 '>
              Country <span className=' text-red-600'> *</span>
            </label>
            <select value={formdata.country} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} name="country" id="state" className=' border rounded-md h-8 md:col-span-6 col-span-12' disabled={!edit} >
              <option value={""} >
              </option>
              <option value={"India"} >
                India
              </option>
            </select>
          </div>
          <div style={edit ? {} : { cursor: "not-allowed" }} className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="city" className='mr-2 md:col-span-5 col-span-12 '>
              City <span className=' text-red-600'> *</span>
            </label>
            <select value={formdata.city} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} name="city" disabled={!edit} id="state" className=' border rounded-md h-8 md:col-span-6 col-span-12'>
              {Data.map((City, index) => (

                <option key={index} value={City.city}>{City.city}</option>
              ))}

            </select>
          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="postalcode" className='mr-2 md:col-span-5 col-span-12 '>
              Postal Code <span className=' text-red-600'> *</span>
            </label>
            <input value={formdata.postalcode} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} type="text" name="postalcode" id="postalcode" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' disabled={!edit} />

          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="state" className='mr-2 md:col-span-5 col-span-12 '>
              State <span className=' text-red-600'> *</span>
            </label>
            <select value={formdata.state} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} name="state" disabled={!edit} id="state" className=' border rounded-md h-8 md:col-span-6 col-span-12' >
              {Data.map((State, index) => (
                <option key={index} value={State.state}>{State.state}</option>
              ))}

            </select>
          </div>
          <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
            <label htmlFor="address" className='mr-2 md:col-span-5 col-span-12 '>
              Address <span className=' text-red-600'> *</span>
            </label>
            <textarea value={formdata.address} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} disabled={!edit} cols={10} rows={10} name="address" id="address" className=' border rounded-md  md:col-span-6 h-[60px] col-span-12  ' />

          </div>
          <div className="">

            <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-5 ">
              <label htmlFor="logo" className='mr-2 md:col-span-5 col-span-12 '>
                Site logo
              </label>
              <input value={formdata.logo} style={edit ? {} : { cursor: "not-allowed" }} onChange={handleChange} disabled={!edit} type="file" id="logo" accept=".png,.jpeg" className=' border rounded-md h-8 md:col-span-6 col-span-12 border-none  ' />

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
            edit && <div className="sm:p-10 mt-10 flex justify-center gap-4 lg:absolute lg:-bottom-10 lg:right-[50%] lg:p-0 lg:translate-x-[50%] ">
              <input
                type="submit"
                className=" w-[140px] h-[40px]  bg-green-400 font-bold text-white  rounded-md cursor-pointer  "
                value="Update"
              />
              <input
                type="reset"
                className="  bg-red-400   w-[140px] h-[40px]  rounded-md   font-bold text-white cursor-pointer"
                value="Cancel"
                onClick={() => setEdit(false)}
              />
            </div>
          }

        </form>
      </div>
    </div>
  );
}

export default Companyprofile;


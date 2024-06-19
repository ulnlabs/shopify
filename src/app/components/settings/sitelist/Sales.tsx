import React, { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import { useState, useEffect } from 'react'
import Update from "../popup/Update";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

function Sales() {
  const [formdata, setformdata] = useState({
    defaultDiscount: "",
    showPaidAmount: false,
    showUpiCode: false,
    invoiceFormat: "",
    footerText: "",
    termsAndcondition: `
    1)no warranty for damaged or burnt goods.\n 
    2) for warranty/repairs/replacement bring invoice copy.\n
    3)interest @24% will be charged if bills are not paid within the due date.\n
    4)we reserve lien on goods till full payment is made.\n
    5)Goods once sold will not be taken back.6)warranty at the sole discretion of the respective service center.\n
    7)cheque bouncing attracts an unconditional fine of Rs. 750.00.\n
    8)we recommend our customer&#039;s to use legal softwares, we don&#039;t support pirated software in any way.`
  })

  const [edit, setEdit] = useState(false)
  const [alert, setAlert] = useState(false)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //       const response = await axios.put("/api/sitelist_sales")
  //       if (response.data) {
  //         setformdata(response.data.data[0])


  //       }

  //     } catch (error) {
  //       console.error("Error fetching data:", error);

  //     }
  //   };
  //   fetchData()

  // }, []);

  function handlesubmit(e: any) {
    e.preventDefault();
    setEdit(false)

    const handuler = async () => {

      const { data } = await axios.post("/api/sitelist_sales",{

        formdata: formdata
      })
      setAlert(data.alert)
    }
    handuler()

    setTimeout(() => {
      setAlert(false)
    }, 3000)
  }
  function handleChange(e: any) {
    let { name, value, checked, type } = e.target;
    setformdata({ ...formdata, [name]: type === "checkbox" ? checked : value })

  }


  return (
    <div className="">
      <AnimatePresence>
        {
          alert && <Update close={setAlert} />
        }
      </AnimatePresence>
      <div className="flex justify-between p-5">
        <div className=""></div>
        <div className="">

          <button onClick={() => { setEdit(!edit) }} className='px-5 border rounded-md  font-medium '>Edit </button>
        </div>
      </div>


      <form action="" onSubmit={handlesubmit} className=' relative md:flex md:flex-col  gap-y-3  p-10'>
        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2 lg:text-end  lg:gap-x-10  ">
          <label htmlFor="defaultDiscount" className='mr-2 md:col-span-5 col-span-12 '>
            Default Sales Discount(%)  <span className=' text-red-600'> *</span>
          </label>
          <input onChange={handleChange} disabled={!edit} name='defaultDiscount' type="text" className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center  flex  p-2  lg:text-end  lg:gap-x-10 ">
          <label htmlFor="showPaidAmount" className='mr-2 md:col-span-5 col-span-1  basis-3/4 '>
            Show Paid Amount and Change Return (in POS)
          </label>
          <input onChange={handleChange} disabled={!edit} name='showPaidAmount' type="checkbox" className=' cursor-pointer md:col-span-1 col-span-10 lg:h-[2.0rem] lg:w-[4.5rem] lg:-ml-5' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center  flex  p-2  lg:text-end  lg:gap-x-10 ">
          <label htmlFor="showUpiCode" className='mr-2 md:col-span-5 col-span-1 basis-3/4 '>
            Show UPI Code On Invoice
          </label>
          <input onChange={handleChange} disabled={!edit} name='showUpiCode' type="checkbox" className='   cursor-pointer md:col-span-1 col-span-10 h-[2.0rem] w-[4.5rem] lg:-ml-5 ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2 lg:gap-x-10   lg:text-end">
          <label htmlFor="invoiceFormat" className='mr-2 md:col-span-5 col-span-12 '>
            Sale Invoice Format   <span className=' text-red-600'> *</span>
          </label>
          <input onChange={handleChange} disabled={!edit} name='invoiceFormat' type="text" className=' border rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12 md:text-center grid  p-2 lg:gap-x-10 lg:text-end   ">
          <label htmlFor="footerText" className='mr-2 md:col-span-5 col-span-12 '>
            Sales Invoice Footer Text  <span className=' text-red-600'> *</span>
          </label>
          <textarea onChange={handleChange} disabled={!edit} rows={3} name='footerText' className=' border px-2 resize-none rounded-md h-8 md:col-span-5 col-span-12 ' />

        </div>

        <div className="md:grid md:grid-cols-12 md:text-center grid p-2 lg:gap-x-10 lg:text-end">
          <label htmlFor="" className="mr-2 md:col-span-5 col-span-12">
            Invoice Terms And Condition <span className="text-red-600"> *</span>
          </label>
          <div className=" md:col-span-5 col-span-12 ">
            <textarea
              onChange={handleChange}
              disabled={!edit}
              name="termsAndcondition"
              rows={2}
              value={formdata.termsAndcondition as any}
              className="w-full border rounded-md items-center resize-none"
            />
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

  )
}

export default Sales
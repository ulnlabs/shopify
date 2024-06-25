import React, { useState, useEffect } from 'react';
import Update from "../popup/Update";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

function Prefixes() {
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState(false);
  const [formdata, setformdata] = useState({
    Category: "",
    Customer: "",
    Expense: "",
    Purchas: "",
    PurchaseReturn: "",
    Sales: "",
    SalesReturn: "",
    Supplier: "",
    item: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put("/api/sitelist_prefixes");
        if (response.data ) {
          console.log("response data is :", response.data.data[0]);
          setformdata(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEdit(false);


    const handuler = async () => {
      try {
        const { data } = await axios.post("/api/sitelist_prefixes", { formdata: formdata });
        setAlert(data.alert);
        console.log(data);
        
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };
    handuler();

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    setformdata({ ...formdata, [name]: type === "checkbox" ? checked : value });
  };
  return (
    <div className="">
      <AnimatePresence>
        {alert && <Update close={setAlert} />}
      </AnimatePresence>
      <div className="flex justify-between p-5">
        <div className=""></div>
        <div className="">
          <button onClick={() => setEdit(!edit)} className='px-5 border rounded-md font-medium'>
            Edit
          </button>
        </div>
      </div>
      <form onSubmit={handlesubmit} action="" className=' relative  grid  grid-col-1 lg:grid-cols-2 gap-y-3  p-10'>
        <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-10  ">
          <label htmlFor="Category" className='mr-2 md:col-span-5 col-span-12 '>
            Category <span className=' text-red-600'> *</span>
          </label>
          <input value={formdata.Category} onChange={handleChange} disabled={!edit} type="text" name='Category' className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12 grid  p-2 md:text-end  md:gap-x-10 ">
          <label htmlFor="Supplier" className='mr-2 md:col-span-5 col-span-12 '>
            Supplier  <span className=' text-red-600'> *</span>
          </label>
          <input value={formdata.Supplier} onChange={handleChange} disabled={!edit} type="text" name='Supplier' className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
          <label htmlFor="PurchaseReturn" className='mr-2 md:col-span-5 col-span-12 '>
            Purchase Return  <span className=' text-red-600'> *</span>
          </label>
          <input value={formdata.PurchaseReturn} onChange={handleChange} disabled={!edit} type="text" name='PurchaseReturn' className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
          <label htmlFor="Sales" className='mr-2 md:col-span-5 col-span-12 '>
            Sales  <span className=' text-red-600'> *</span>
          </label>
          <input value={formdata.Sales} onChange={handleChange} name='Sales' disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
          <label htmlFor="Expense" className='mr-2 md:col-span-5 col-span-12 '>
            Expense  <span className=' text-red-600'> *</span>
          </label>
          <input  value={formdata.Expense} onChange={handleChange} name='Expense' disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
          <label htmlFor="item" className='mr-2 md:col-span-5 col-span-12 '>
            item  <span className=' text-red-600'> *</span>
          </label>
          <input value={formdata.item} onChange={handleChange} disabled={!edit} type="text" name='item' className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
          <label htmlFor="Purchas" className='mr-2 md:col-span-5 col-span-12 '>
            Purchas <span className=' text-red-600'> *</span>
          </label>
          <input value={formdata.Purchas} onChange={handleChange} name='Purchas' disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
          <label htmlFor="Customer" className='mr-2 md:col-span-5 col-span-12 '>
            Customer <span className=' text-red-600'> *</span>
          </label>
          <input value={formdata.Customer} onChange={handleChange} name='Customer' disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

        </div>
        <div className=" md:grid md:grid-cols-12  grid  p-2 md:text-end  md:gap-x-10 ">
          <label htmlFor="SalesReturn" className='mr-2 md:col-span-5 col-span-12 '>
            Sales Return <span className=' text-red-600'> *</span>
          </label>
          <input value={formdata.SalesReturn} onChange={handleChange} name='SalesReturn' disabled={!edit} type="text" className=' border rounded-md h-8 md:col-span-6 col-span-12 ' />

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

export default Prefixes
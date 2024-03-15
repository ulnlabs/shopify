"use client"
import React from 'react'
import { useState } from 'react';
import DataTable from "@/app/components/settings/currencylist/DT_curr/Currencydata"
import { c_columns } from "@/app/components/settings/currencylist/DT_curr/C-column";


  // Function to delete a currency from the list

function Currencylist() {
    const [currencies, setCurrencies] = useState([
        {
          id: 1,
          currencyname: "Dollar"
        },
        {
          id: 2,
          currencyname: "INR"
        }
      ]);
    const addCurrency = () => {
        const newCurrencyName = prompt('Enter new currency name:');
        if (newCurrencyName) {
          const newCurrency = {
            id: currencies.length + 1,
            currencyname: newCurrencyName
          };
          setCurrencies([...currencies, newCurrency]);
        }
      };
    return (
        <div className="">
            <div className=" h-screen ">
                
                <div className="mx-auto w-[95%] p-5 mt-3">
                    <div className=" border-t-2 border-violet-500   rounded-md">

                        <div className="flex justify-between p-3">
                            <h1 className='text-sm tracking-[.2rem]'>Unit List</h1>
                            <button onClick={()=>addCurrency()} type='submit' className='p-2 bg-[var(--button)]  font-bold rounded-md text-white text-sm' > <span className='text-lg'>+</span> New Unit</button>
                        </div>
                       
                        <div className=" ">
                            <DataTable columns={c_columns} data={currencies} />
                           



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Currencylist
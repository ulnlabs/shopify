'use client'
import React, { FormEvent, useContext, useState } from "react";
import DashboardHeader from '../../dashboard/DashboardHeader'

function Category() {
      const [Category,setCategory] = useState<any>({})
  const handleReset = (): void => {
    setCategory({
      category_name:"",
      description:"",
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setCategory({
      category_name:"",
      description:"",
    });
  };
  return (
        <div className="w- screen h-screen">
            <DashboardHeader title="Expenses Category" subtitle="Add/Update Expense Category" breadcrumb={[{title:"dashboard",path:"/dashboard"},{title:"Expenses",path:"/Expenses"}]}/>
            <main className="flex justify-center">
            <section className="w-[95%] border-2 mt-36">
                  <div className="border-b-2 flex items-center">
                        <h2 className=" p-4 text-[20px]">Please Enter Valid Data</h2>
                  </div>
                  <div className="">
                  <form action="" onSubmit={handleSubmit} className="h-[300px] grid grid-rows-6 grid-cols-4 p-3">
                              <div className="row-span-2 col-span-4">
                                    <label htmlFor="name" className="col-start-2 row-start-1">Category Name<span className='text-red-400'>*</span>:</label>
                                    <input type="text" 
                                    name="name"
                                    id="name"
                                    onChange={(e) =>
                                          setCategory({ ...Category, category_name: e.target.value })
                                        }
                                    className="border  col-start-2 col-end-4 row-start-2"
                                    />
                              </div>
                              <div className="row-span-2 col-span-4">
                                    <label htmlFor="description">Description</label>
                                    <input type="textarea" 
                                    name="description"
                                    id="description"
                                    onChange={(e) =>
                                          setCategory({ ...Category, description: e.target.value })
                                        }
                                    className="border"
                                    />
                              </div>
                              <div className="row-span-2 col-span-4">
                                    <input type="submit"
                                    value="Save"
                                    className="border"
                                     />
                                     <input type="reset" 
                                     value="Cancel"
                                     onChange={handleReset}
                                     className="border"
                                     />
                              </div>
                        </form>
                  </div>
            </section>
         </main>
        </div>
        )
}

export default Category
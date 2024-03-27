"use client";
import React, { FormEvent, useContext, useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";

function Category() {
  const [Category, setCategory] = useState<any>({});
  const handleReset = (): void => {
    setCategory({
      category_name: "",
      description: "",
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setCategory({
      category_name: "",
      description: "",
    });
  };
  return (
    <div className="h-fit">
      <div className="mt-8 ml-4">
        <DashboardHeader
          title="Expenses Category"
          subtitle="Add/Update Expense Category"
          breadcrumb={[
            { title: "dashboard", path: "/dashboard" },
            { title: "Expenses", path: "/Expenses" },
          ]}
        />
      </div>
      <main className="flex justify-center">
        <section className="w-[95%] border rounded-xl mt-36 shadow-[rgba(50,50,93,0.25)_0px_6px_4px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <div className="border-b-2 flex items-center">
            <h2 className=" p-4 text-[20px]">Please Enter Valid Data</h2>
          </div>
          <div className="">
            <form
              action=""
              onSubmit={handleSubmit}
              className="min-h-[200px] grid  grid-row-2 grid-cols-12   p-3"
            >
              <div className="row-start-1 md:gap-x-3 md:items-center md:grid md:grid-cols-12 col-start-2 grid col-span-10">
                <label htmlFor="name" className=" md:col-span-4 md:text-end ">
                  Category Name<span className="text-red-400">*</span>:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) =>
                    setCategory({ ...Category, category_name: e.target.value })
                  }
                  className="border h-8 rounded-md md:col-span-6 bg-gray-200"
                />
              </div>
              <div className="row-start-2 md:gap-x-3 md:items-center md:grid md:grid-cols-12 col-start-2 grid col-span-10">
                <label
                  className=" md:col-span-4 md:text-end"
                  htmlFor="description"
                >
                  Description :
                </label>
                <input
                  type="textarea"
                  name="description"
                  id="description"
                  onChange={(e) =>
                    setCategory({ ...Category, description: e.target.value })
                  }
                  className="border h-8 rounded-md md:col-span-6 bg-gray-200"
                />
              </div>
            </form>
            <div className="flex gap-5 justify-center mt-5 p-3 ">
              <input
                type="submit"
                value="Save"
                className="border p-2 w-[120px] bg-green-500 text-white  rounded-md"
              />
              <input
                type="reset"
                value="Cancel"
                onChange={handleReset}
                className="border p-2 w-[120px] bg-orange-500 text-white rounded-md"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Category;

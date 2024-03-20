"use client";
import React, { FormEvent, useContext, useState } from "react";
import DashboardHeader from "../../dashboard/DashboardHeader";
import path from "path";
import { Search } from "lucide-react";
import SearchSelect from "../../sales-pur/search";
function Newexp() {
const [expensesData,setExpenses] = useState<any>({})
  const handleReset = (): void => {
    setExpenses({
      date: "",
      category: "",
      expfor: "",
      amount: "",
      refno: "",
      note: "",
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setExpenses({
      date: "",
      category: "",
      expfor: "",
      amount: "",
      refno: "",
      note: "",
    });
  };
  return (
    <>
    <div className="mt-8 ml-4">
      <DashboardHeader title="Expenses" subtitle="Add/Update Expense" breadcrumb={[{title:"dashboard",path:"/dashboard"},{title:"Expenses",path:""}]}/>
    </div>
      <main className="flex">
        <section className=" min-h-[500px]  mt-28 w-[90%] ml-[5%] rounded-2xl shadow-[rgba(50,50,93,0.25)_0px_6px_4px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <form
            onSubmit={handleSubmit}
            action=""
            className="grid grid-cols-10 grid-rows-8  min-h-[500px] p-6 "
          >
            <div className="md:col-span-5  md:col-end-5 row-span-2   grid grid-cols-5 col-span-12 ">
              <label
                htmlFor="date"
                className="mt-2 text-start pr-4  cursor-pointer col-start-2 md:col-start-1 col-span-5 "
              >
                Date<span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setExpenses({ ...expensesData, name: e.target.value })
                }
                value={expensesData.name}
                required
                type="date"
                id="date"
                name="date"
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5   px-2 outline-none rounded-md col-span-3 "
              />
            </div>
            <div className="md:col-span-5  md:col-end-5 row-span-2 grid grid-cols-5 col-span-12 ">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="category"
              >
                Category<span className="text-red-400">*</span>
              </label>
              <div className="col-start-2  md:col-start-1 md:col-span-5  col-span-3">
              <SearchSelect className="bg-gray-200" value={expensesData} setValue={setExpenses} inputData={["category","fuel"]} placeholder="Select" searchPlaceholder="Search category" />
              </div>
            </div>
            <div className="md:col-span-5  md:col-end-5 row-span-2 grid grid-cols-5 col-span-12   ">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="expfor"
              >
                Expense for<span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setExpenses({ ...expensesData, email: e.target.value })
                }
                value={expensesData.email}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                name="expfor"
                id="expfor"
                type="text"
              />
            </div>
            {/* second column */}
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-5 col-span-12    md:row-start-1">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="amount"
              >
                Amount<span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setExpenses({ ...expensesData, due: e.target.value })
                }
                value={expensesData.due}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                type="text"
                name="amount"
                id="amount"
              />
            </div>
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-5 col-span-12    md:row-start-3">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="refno"
              >
                Reference No<span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) =>
                  setExpenses({ ...expensesData, state: e.target.value })
                }
                value={expensesData.state}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                name="refno"
                type="text"
                id="refno"
              />
            </div>
            <div className="md:col-span-5 md:col-start-7  md:col-end-12 row-span-2 grid grid-cols-5 col-span-12    md:row-start-5">
              <label
                className="mt-2 text-start pr-4 col-start-2 md:col-start-1 col-span-5  cursor-pointer"
                htmlFor="note"
              >
                Note
              </label>
              <input
                onChange={(e) =>
                  setExpenses({ ...expensesData, city: e.target.value })
                }
                value={expensesData.city}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3  px-2 outline-none rounded-md"
                name="note"
                type="text"
                id="note"
              />
            </div>
            <input
              type="submit"
              className="mt-10 md:mt-0 min-w-[100px] col-start-3 col-span-2 bg-green-400 font-bold text-white   cursor-pointer rounded-full md:row-start-12 cur"
              value="OK"
            />

            <input
              onClick={handleReset}
              type="reset"
              className="mt-10  md:mt-0 col-start-7 min-w-[100px] bg-red-400 col-span-2 h-12 rounded-full  font-bold text-white md:row-start-12 cursor-pointer"
              value="Cancel"
            />
          </form>
        </section>
      </main>
    </>
  );
}

export default Newexp;

"use client";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import SearchSelect from "../sales-pur/search";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
function Newexp() {
  const [expensesData, setExpenses] = useState<any>({})
  const [category, setCategory] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const { toast } = useToast()
  useEffect(() => {
    axios.get("/api/expenses", {
      headers: {
        data: "get-onlyName"
      }
    }).then((res) => {
      setCategory(res.data)
    }).catch((err) => { })
  }, [])
  const { data: session } = useSession()

  const handleReset = (): void => {
    setExpenses({
      date: null,
      category: "",
      expfor: "",
      amount: "",
      refno: "",
      note: "",

    });
    setSelectedCategory("")
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (selectedCategory.length > 0) {
      const postData = {
        date: expensesData.date,
        amount: expensesData.amount,
        category: selectedCategory,
        expfor: expensesData.expfor,
        refno: expensesData.refno,
        note: expensesData.note,
        createdBy: session?.user?.username ? session.user.username : "Guest",
      }
      axios.post("/api/expenses", postData, {
        headers: {
          data: "add-expense"
        }
      }).then((res) => {

        setExpenses({
          date: null,
          category: "",
          expfor: "",
          amount: "",
          refno: "",
          note: "",
        });
      }).catch((err) => { })
    } else {
      toast({
        title: "New PopUp !",
        description: "Please select category",
      })
    }

  };
  return (
    <>
      <div className="mt-8 ml-4">
        <DashboardHeader title="Expenses" subtitle="Add/Update Expense" breadcrumb={[{ title: "dashboard", path: "/dashboard" }, { title: "Expenses", path: "" }]} />
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
                value={expensesData.date}
                onChange={(e) =>
                  setExpenses({ ...expensesData, date: e.target.value })
                }
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
                <SearchSelect isExpense className="bg-gray-200 h-8 " upClassName="bg-gray-200 " value={selectedCategory} setValue={setSelectedCategory} inputData={category} placeholder="Select" searchPlaceholder="Search category" />
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
                required={true}
                onChange={(e) =>
                  setExpenses({ ...expensesData, expfor: e.target.value })
                }
                value={expensesData.expfor}
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
                required={true}
                onChange={(e) => {
                  const value = e.target.value;


                  setExpenses({ ...expensesData, amount: value });

                }}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== ".") {
                    e.preventDefault();
                  }
                }}
                value={expensesData.amount}
                className="h-10 bg-gray-200 col-start-2 md:col-start-1 md:col-span-5 col-span-3 px-2 outline-none rounded-md"
                type="text"
                inputMode="numeric"
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
                required={true}
                onChange={(e) =>
                  setExpenses({ ...expensesData, refno: e.target.value })
                }
                value={expensesData.refno}
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
                  setExpenses({ ...expensesData, note: e.target.value })
                }
                value={expensesData.note}
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

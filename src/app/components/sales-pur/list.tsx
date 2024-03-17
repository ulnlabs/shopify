"use client"
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { RxReload } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { format } from "date-fns";
import { BsFillHandbagFill } from "react-icons/bs";
import React, { useState } from 'react'
import Link from "next/link";
import SearchSelect from "./search";
import CalenSelect from "./calselect";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";






const Customer = [
    "Deepath",
    "Hari",
    "Deepath",
    "Deepath",
    "Deepath",
]

const List = () => {

    const [dateOpen, setDateOpen] = useState<boolean>(false)
    const [customerName, setCustomerName] = useState<string>("");
    const [user, setUser] = useState<string>("");
    const [from, setFrom] = useState<Date | undefined>(new Date);
    const [end, setEnd] = useState<Date | undefined>(new Date);




    return (
        <div className="mb-10">
            <section className="grid gap-5 ">
                <div className="grid grid-cols-12 grid-rows-3 gap-8 md:gap-0 my-5">
                    <div className="bg-primary-gray px-2 pt-1 grid rounded-sm  gap-3 row-span-4 col-start-1 col-span-full md:col-span-5  outline outline-offset-4 outline-1 outline-primary-gray  ">
                        <h2 className="col-start-1 col-span-2 row-start-1">Total Invoice</h2>
                        <p className="col-start-1 col-span-3 text-2xl">10000000</p>
                        <span className="col-start-5 col-span-1  bg-white mx-auto p-3 row-start-2 rounded-sm shadow-sm">
                            <BsFillHandbagFill />
                        </span>
                        <Link href={"dashboard"} className="row-start-3 mx-auto col-start-1 col-span-5 ">
                            <span>More Detials  </span>
                        </Link>
                    </div>
                    <div className="bg-primary-gray px-2 py-1 grid gap-3 md:col-start-8 row-span-4  col-span-full md:col-span-5 rounded-sm  outline outline-offset-4 outline-1 outline-primary-gray  ">
                        <h2 className="col-start-1 col-span-2 row-start-1 ">Total Invoice Amount</h2>
                        <p className="col-start-1 col-span-3 text-2xl">10000000</p>
                        <span className="col-start-5 col-span-1 shadow-sm rounded-sm bg-white mx-auto p-3 row-start-2">
                            <AiOutlinePlus />
                        </span>
                        <Link href={"dashboard"} className="row-start-3 mx-auto col-start-1 col-span-5 ">
                            <span>More Detials  </span>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-12  grid-rows-3 gap-8 md:gap-0 md:my-5">
                    <div className="bg-primary-gray px-2 py-1 grid gap-3 row-span-4 col-start-1 col-span-full md:col-span-5 rounded-sm  outline outline-offset-4 outline-1 outline-primary-gray  ">
                        <h2 className="col-start-1 col-span-2 row-start-1">Total Amount Recieved</h2>
                        <p className="col-start-1 col-span-3 text-2xl">10000000</p>
                        <span className="col-start-5 col-span-1 bg-white mx-auto p-3 row-start-2 shadow-sm rounded-sm">
                            <RxReload />
                        </span>
                        <Link href={"dashboard"} className="row-start-3 mx-auto col-start-1 col-span-5 ">
                            <span>More Detials  </span>
                        </Link>
                    </div>
                    <div className="bg-primary-gray px-2 grid gap-3 py-1 md:col-start-8 row-span-4 col-span-full md:col-span-5 rounded-sm  outline outline-offset-4 outline-1 outline-primary-gray  ">
                        <h2 className="col-start-1 col-span-2 row-start-1">Total Invoice</h2>
                        <p className="col-start-1 col-span-3 text-2xl ">10000000</p>
                        <span className="col-start-5 col-span-1 bg-white mx-auto p-3 row-start-2 rounded-sm shadow-sm">
                            <AiOutlineClockCircle />
                        </span>
                        <Link href={"dashboard"} className="row-start-3 mx-auto col-start-1 col-span-5 ">
                            <span>More Detials  </span>
                        </Link>
                    </div>

                </div>


            </section>
            <section>

                <div className="grid grid-cols-12 my-8" >
                    <span className="md:col-end-13 flex  col-end-13 col-span-5 md:col-span-3 mb-5 px-2 text-center border  rounded-sm py-1 ">

                        <Link href={"new-sales"}
                            className="bg-primary-gray px-2 py-1 w-full rounded-md"
                        >
                            + New Sales
                        </Link>
                    </span>
                    <div className="md:col-span-5 col-span-full col-start-1">
                        <SearchSelect value={customerName} setValue={setCustomerName} inputData={Customer} placeholder="Customer "
                            searchPlaceholder="Search Customer Number"
                        />

                    </div>
                    <div className="md:col-end-13 col-span-full md:col-span-5">
                        <SearchSelect value={user} setValue={setUser} inputData={Customer}
                            placeholder="Users"
                            searchPlaceholder="Search UserName or Id "
                        />
                    </div>
                </div>
                <div className="grid grid-cols-12 md:gap-0 gap-5 pt-5 ">
                    <span className="col-start-1 col-span-full md:col-span-5">
                        <CalenSelect date={from} setDate={setFrom} />
                    </span>
                    <span className="md:col-end-13 col-span-full md:col-span-5">
                        <CalenSelect date={end} setDate={setEnd} />
                    </span>
                </div>

            </section>
        </div>
    )
}



export default List
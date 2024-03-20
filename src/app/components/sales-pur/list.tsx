"use client"
import { AiOutlineClockCircle } from "react-icons/ai";
import { RxReload } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillHandbagFill } from "react-icons/bs";
import React, { useState } from 'react'
import Link from "next/link";
import CalenSelect from "./calselect";
import { s_LIST_Column,p_LIST_Column } from "../datatable/listColumn";
import { DataTable } from "../datatable/DataTable";
import {format} from "date-fns"




interface propType {
    Customer: string[],
    page: string,
    isSales?: boolean,
    path : string,
}




const List = ({ Customer, page,isSales,path }: propType) => {
    const [customerName, setCustomerName] = useState<string>("");
    const [user, setUser] = useState<string>("");
    const [from, setFrom] = useState<Date | undefined>(new Date);
    const [end, setEnd] = useState<Date | undefined>(new Date);

    const sample = [
        {
            date : format(new Date, "dd-MM-yy"),
            name: "Deepath",
            total:1000,
            user:"Fire10",
            action:"delete"
        }
    ]


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
                   
                    <div className="bg-primary-gray px-2 py-1 grid gap-3 row-span-4 md:col-end-13 col-span-full md:col-span-5 rounded-sm  outline outline-offset-4 outline-1 outline-primary-gray  ">
                        <h2 className="col-start-1 col-span-2 row-start-1">Total Amount Recieved</h2>
                        <p className="col-start-1 col-span-3 text-2xl">10000000</p>
                        <span className="col-start-5 col-span-1 bg-white mx-auto p-3 row-start-2 shadow-sm rounded-sm">
                            <RxReload />
                        </span>
                        <Link href={"dashboard"} className="row-start-3 mx-auto col-start-1 col-span-5 ">
                            <span>More Detials  </span>
                        </Link>
                    </div>
                </div>
               
                   

           


            </section>
            <section className=" ">

                <div className="grid grid-cols-12 my-8" >
                    <span className="md:col-end-13 flex  col-end-13 col-span-5 md:col-span-3 mb-5 px-2 text-center border  rounded-sm py-1 ">

                        <Link href={path}
                            className="bg-primary-gray px-2 py-1 w-full rounded-md"
                        >
                            + New {page}
                        </Link>
                    </span>
                </div>
                <div className="grid grid-cols-12 md:gap-0 gap-5 ">
                    <span className="col-start-1 col-span-full md:col-span-5">
                        <CalenSelect date={from} setDate={setFrom} />
                    </span>
                    <span className="md:col-end-13 col-span-full md:col-span-5">
                        <CalenSelect date={end} setDate={setEnd} />
                    </span>
                </div>

            </section>
            <section>
                {  isSales ?

                <DataTable
                    columns={s_LIST_Column}
                    data={sample}
                    rows={true}
                    paginater={true}
                    filter={true}
                     
                /> : 
                <DataTable
                columns={p_LIST_Column}
                data={sample}
                rows={true}
                paginater={true}
                filter={true}
            />
                }

               
            </section>
        </div>
    )
}



export default List
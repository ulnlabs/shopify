"use client"
import { AiOutlineLine, AiOutlineMore } from "react-icons/ai";
import { RxReload } from "react-icons/rx";
import { BsFillHandbagFill } from "react-icons/bs";
import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import Link from "next/link";
import CalenSelect from "./calselect";
import DataTable from "../datatable/DataTable";
import { format, setISODay } from "date-fns"
import { Dispatch } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { columnHeader_dataTable } from "../../../../global";

import { useRouter } from "next/navigation";

import { Command, CommandList, CommandItem } from "@/components/ui/command";
import { useReturn } from "./returnContext";
import { ContextData } from "../../../../contextapi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";


interface propType {
    page: string,
    isSales?: boolean,
    path: string,
    list: any[],
    from: Date,
    end: Date,
    setFrom: Dispatch<SetStateAction<Date>>,
    setEnd: Dispatch<SetStateAction<Date>>,
    isReturn?: boolean,
}
const List = ({ page, isSales, path, list, from, end, setFrom, setEnd, isReturn }: propType) => {

    console.log(isReturn);

    const [invoice, setInvoice] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {

        const todayList = list.filter((item: any) => item.date === format(new Date, "dd-MM-yy"))
        setTotal(list.reduce((a, b) => a + b.total, 0));
        setInvoice(todayList.length);
        setTotal(todayList.reduce((a, b) => a + b.total, 0));




    }, [list])

    console.log(invoice);
    console.log(total);


    const router = useRouter()
    const { setSalesRecord, setPurchaseRecord } = useContext(ContextData);



    const DATE: columnHeader_dataTable = {
        accessorKey: "date",
        header: "DATE",
    };
    const STATUS: columnHeader_dataTable = {
        accessorKey: "status",
        header: "STATUS"
    }
    const SALES_CODE: columnHeader_dataTable = {
        accessorKey: "salesCode",
        header: "Sales Code"
    }
    const c_NAME: columnHeader_dataTable = {
        accessorKey: "c_name",
        header: "CUSTOMER NAME",
    };


    const TOTAL: columnHeader_dataTable = {
        accessorKey: "total",
        header: "TOTAL",
    };


    const USER: columnHeader_dataTable = {
        accessorKey: "user",
        header: "CREATED BY",
    };

    const SALE_ACTION: any = {
        accessorKey: "action",
        header: "ACTION",
        cell: (({ row }: any) => {


            console.log(isReturn);

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <AiOutlineMore className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white z-10 border px-3 rounded-md gap-1 grid">
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                                setSalesRecord(row.original);
                                router.push("/sales/invoice")
                            }}
                        >
                            View Sales
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        {isReturn === false && <DropdownMenuItem
                            className="cursor-pointer" onClick={() => {
                                setSalesRecord(row.original);
                                router.push("/sales/new-return")
                            }
                            }>
                            Sales Return
                        </DropdownMenuItem>
                        }
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer">
                            Print
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={async () => {
                                console.log(row.original.salesCode);

                                const remove = await axios.put("/api/sales", {
                                    data: {
                                        header: "deleteSales",
                                        salesCode: row.original.salesCode
                                    }
                                })
                                console.log(remove);

                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        })
    };

    const PUR_ACTION: any = {
        accessorKey: "action",
        header: "ACTION",
        cell: (({ row }: any) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <AiOutlineMore className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white z-10 border px-3 rounded-md gap-1 grid">
                        <DropdownMenuItem
                            className="cursor-pointer"
                        /*  onClick={() => {
                             handleDelete(row.original);
                         }} */
                        >
                            View Purchase
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => {
                            setPurchaseRecord(row.original);
                            router.push(`/purchases/new-return`)
                        }

                        }>
                            Purchase Return
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                        /* onClick={() => handleUpdate(row.original)} */>
                            Print
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                        >
                            PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={async () => {
                                console.log(row.original.purchaseCode);

                                const remove = await axios.put("/api/purchase", {
                                    data: {
                                        header: "deletePurchase",
                                        purchaseCode: row.original.purchaseCode
                                    }
                                })
                                console.log(remove);

                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        })


    };

    const s_NAME: columnHeader_dataTable = {

        accessorKey: "s_name",
        header: "SUPPLIER NAME",
    }

    const PURCHASE_CODE: columnHeader_dataTable = {
        accessorKey: "purchaseCode",
        header: "PURCHASE CODE"
    }

    const s_LIST_Column: ColumnDef<any>[] = [

        DATE,
        c_NAME,
        SALES_CODE,
        TOTAL,
        STATUS,
        USER,
        SALE_ACTION,

    ];

    const p_LIST_Column: ColumnDef<any>[] = [


        DATE,
        s_NAME,
        PURCHASE_CODE,
        TOTAL,
        STATUS,
        USER,
        PUR_ACTION,

    ];



    /*   const list = [
          {
              date : format(new Date, "dd-MM-yy"),
              name: "Deepath",
              total:1000,
              user:"Fire10",
              action:"delete"
          }
      ] */


    return (
        <div className="mb-10">
            <section className="grid gap-5 ">
                <div className="grid grid-cols-12 grid-rows-3 gap-8 md:gap-0 my-5">
                    <div className="bg-primary-gray px-2 pt-1 grid rounded-sm  gap-3 row-span-4 col-start-1 col-span-full md:col-span-5  outline outline-offset-4 outline-1 outline-primary-gray  ">
                        <h2 className="col-start-1 col-span-2 row-start-1">Today's Invoice</h2>
                        <p className="col-start-1 col-span-3 text-2xl">{invoice}</p>
                        <span className="col-start-5 col-span-1  bg-white mx-auto p-3 row-start-2 rounded-sm shadow-sm">
                            <BsFillHandbagFill />
                        </span>
                        <Link href={"dashboard"} className="row-start-3 mx-auto col-start-1 col-span-5 ">
                            <span>More Detials  </span>
                        </Link>
                    </div>
                    <div className="bg-primary-gray px-2 py-1 grid gap-3 row-span-4 md:col-end-13 col-span-full md:col-span-5 rounded-sm  outline outline-offset-4 outline-1 outline-primary-gray  ">
                        <h2 className="col-start-1 col-span-2 row-start-1">Today's Amount</h2>
                        <p className="col-start-1 col-span-3 text-2xl">{total}</p>
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
            <section className="z-5">

                <DataTable
                    columns={isSales ? s_LIST_Column : p_LIST_Column}
                    data={list}
                    rows={true}
                    paginater={true}
                    filter={true}
                />
            </section>
        </div>
    )
}
export default List
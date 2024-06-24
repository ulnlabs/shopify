"use client"
import { BsPersonAdd } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { format } from "date-fns"
import { Input } from '@/components/ui/input'
import { IoMdContact } from "react-icons/io";
import DataTable from "../datatable/DataTable";
import Selections from "./selections";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { ColumnDef } from "@tanstack/react-table";
import PopUp from "./extraPopUp";
import { AnimatePresence, motion } from "framer-motion";
import { columnHeader_dataTable } from "../../../../global";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";


const NewSales = ({ data, setData, placeholder, isSales, customerData, Items, inputItem, setInputItem, itemList, setItemList, searchPlaceholder, products }: any) => {

    if (itemList) {
        const { data: session } = useSession();
        const [modify, setModify] = useState<string>("")
        const i_NAME: any = {
            accessorKey: "itemName",
            header: "Item Name"/* ,
    cell: ({ row }: any) => (
      <p>{row.original.name}</p>
    ) */
        };
        const i_QUANTITY: any = {
            accessorKey: "quantity",
            header: "QUANTITY",
            cell: ({ row }: any) => (
                <span className="flex gap-1 items-center">
                    <button onClick={() => {
                        const update = products.find((item: any) => item.itemName === row.original.itemName)
                        console.log(update.quantity);
                        console.log(row.original.quantity);
                        if (row.original.quantity > 1) {
                            const updateTax = Math.floor(((row.original.tax?.match(/\d+/g)?.map(Number)[0]) / 100 * row.original.price) * 100) / 100;
                            const updateDis = Math.floor((row.original.discountPer / 100 * row.original.price) * 100) / 100;
                            const subTotal = Math.floor(((row.original.taxType).toLowerCase() === "Exclusive".toLowerCase() ? row.original.price + updateTax - updateDis : row.original.price - updateDis) * 100) / 100;

                            const uplist = {
                                ...row.original,
                                quantity: --row.original.quantity,
                                discount: Math.floor(row.original.quantity * updateDis * 100) / 100,
                                taxAmount: Math.floor(row.original.quantity * updateTax * 100) / 100,
                                subtotal: Math.floor(row.original.quantity * subTotal * 100) / 100
                            }
                            console.log(row.original.quantity);
                            console.log(update.quantity);


                            const upQuantity = itemList.map((item: any) => item.itemName === row.original.itemName ? uplist : item)
                            setItemList(upQuantity)
                        }
                    }} >
                        <AiOutlineMinus />
                    </button>
                    {row.original.quantity}
                    <button onClick={() => {
                        const update = products.find((item: any) => item.itemName === row.original.itemName)
                        console.log("u", update);
                        console.log(update.sold_quantity);
                        console.log(update.quantity);
                        console.log(row.original.quantity);
                        console.log(row.original.quantity < update.sold_quantity);
                        if (row.original.quantity < update.sold_quantity) {
                            const updateTax = Math.floor(((row.original.tax?.match(/\d+/g)?.map(Number)[0]) / 100 * row.original.price) * 100) / 100;
                            const updateDis = Math.floor((row.original.discountPer / 100 * row.original.price) * 100) / 100;
                            const subTotal = Math.floor(((row.original.taxType).toLowerCase() === "Exclusive".toLowerCase() ? row.original.price + updateTax - updateDis : row.original.price - updateDis) * 100) / 100;
                            const uplist = {
                                ...row.original,
                                quantity: ++row.original.quantity,
                                discount: Math.floor(row.original.quantity * updateDis * 100) / 100,
                                taxAmount: Math.floor(row.original.quantity * updateTax * 100) / 100,
                                subtotal: Math.floor(row.original.quantity * subTotal * 100) / 100,
                            }
                            const upQuantity = itemList.map((item: any) => item.itemName === row.original.itemName ? uplist : item)
                            setItemList(upQuantity)
                        }
                        else {
                            toast({
                                title: "New PopUp !",
                                description: "Reached Maximum Stock limit",
                            });
                        }
                    }} >
                        <AiOutlinePlus />
                    </button>
                </span >
            )
        };
        const i_PRICE: columnHeader_dataTable = {
            accessorKey: "price",
            header: "PRICE",
        };
        const i_DISCOUNT: any = {
            accessorKey: "discount",
            header: "DISOUNT",
            cell: (({ row }: any) =>
            (

                <button onClick={() => {
                    setModify(row);
                    setIsPopUp(true);
                }}>
                    {row.original.discount}
                </button>


            )
            )
        };
        const i_TAX_AMOUNT: columnHeader_dataTable = {
            accessorKey: "taxAmount",
            header: "TAX Amount",
        };

        const [isPopUp, setIsPopUp] = useState<boolean>(false);
        const i_TAX: any = {
            accessorKey: "tax",
            header: "TAX",
            cell: (({ row }: any) => (
                <button onClick={() => {
                    setModify(row);
                    setIsPopUp(true);
                }}>
                    {row.original.tax}
                </button>
            ))
        };
        const i_SUBTOTAL: columnHeader_dataTable = {
            accessorKey: "subtotal",
            header: "SUB TOTAL",
        };
        const i_REMOVE = {
            accessorKey: "REMOVE",
            cell: ({ row }: any) => (
                <button onClick={() => {
                    setItemList(itemList.filter((item: any) => row.original.itemName !== item.itemName))
                }} >
                    <MdOutlineDelete />
                </button>
            )
        };
        const sales_Column: ColumnDef<any>[] = [
            i_NAME,
            i_QUANTITY,
            i_PRICE,
            i_DISCOUNT,
            i_TAX,
            i_TAX_AMOUNT,
            i_SUBTOTAL,
            i_REMOVE,
        ];
        const pur_Column: ColumnDef<any>[] = [
            i_NAME,
            i_QUANTITY,
            i_PRICE,
            i_DISCOUNT,
            i_TAX,
            i_TAX_AMOUNT,
            i_SUBTOTAL,
            i_REMOVE,
        ]


        const cusRef = useRef<null | any>(null);
        const dateRef = useRef<null | any>(null);
        const itemRef = useRef<null | any>(null);
        useEffect(() => {
            const handleClose = (e: any) => {
                if (!cusRef.current?.contains(e.target)) {
                    setCustomerOpen(false);
                }
                /* if (!itemRef.current?.contains(e.target)) {
                  setItemOpen(false);
                } */
            }
            document.addEventListener('click', handleClose)
        }, [])
        const [customerOpen, setCustomerOpen] = useState<boolean>(false)
        const { billDate } = data;
        /*   const [itemOpen, setItemOpen] = useState<boolean>(false);
         */
        const [statusValue, setStatusValue] = useState("")
        useEffect(() => {
            setData({ ...data, billStatus: statusValue });
        }, [statusValue]);
        const [taxType, setTaxType] = useState(data.billTaxType || "");
        useEffect(() => {
            setData({ ...data, billTaxType: taxType });
        }, [taxType]);
        const [disType, setDisType] = useState(data.billDiscountType || "");
        useEffect(() => {
            setData({ ...data, billDiscountType: disType });
        }, [disType]);
        const [payType, setPayType] = useState(data.billPaymentType || "");
        useEffect(() => {
            setData({ ...data, billPaymentType: payType });
        }, [payType]);
        let quantity = 0;
        let newSubTotal = 0;
        useEffect(() => {
            console.log(itemList);

            itemList.map((item: any) => (
                newSubTotal += item?.subtotal,
                quantity += item?.quantity
            ))
            const taxPer = (data?.billTaxType && data?.billTaxType.match) ? data?.billTaxType?.match(/\d+/g)!.map(Number)[0] : 0
            const updateCharge = (taxPer * data?.billCharges) / 100 + Number(data?.billCharges)
            const updateDiscount = (data?.billDiscountType).toLowerCase() === "Fixed".toLowerCase() ? data?.billDiscount : (data?.billDiscountType).toLowerCase() === "Percentage".toLowerCase() ? ((newSubTotal + updateCharge) * data.billDiscount) / 100 : 0
            const newTotal = newSubTotal + updateCharge - updateDiscount;
            console.log(quantity);
            setData((prevData: any) => ({
                ...prevData,
                billQuantity: quantity,
                billSubtotal: newSubTotal,
                billOtherCharge: updateCharge || prevData.billOtherCharge,
                billOverallDis: updateDiscount || prevData.billOtherCharge,
                billTotal: Math.floor(newTotal * 100) / 100,
            }));
        }, [itemList])
        useEffect(() => {
            const updateOnChange = () => {
                const taxPer = (data.billTaxType) ? data.billTaxType?.match(/\d+/g)!.map(Number)[0] : 0
                const newOtherCharge = ((data.billCharges * taxPer) / 100) + Number(data.billCharges);
                const subTotal = Math.floor((newOtherCharge + data.billSubtotal) * 100) / 100;
                const newDiscount = Math.floor(((data.billDiscountType).toLowerCase() === "Fixed".toLowerCase() ? data.billDiscount : (data.billDiscountType).toLowerCase() === "Percentage".toLowerCase() ? ((data.billDiscount * subTotal) / 100) : 0) * 100) / 100;
                console.log(newOtherCharge);

                setData({
                    ...data,
                    billOtherCharge: newOtherCharge,
                    billOverallDis: newDiscount,
                    billTotal: Math.floor((data.billSubtotal + newOtherCharge - newDiscount) * 100) / 100,
                })
            }
            updateOnChange();
        }, [data.billCharges, data.billDiscount, data.billDiscountType, data.billTaxType])



        const handleItemClick = (value: any) => {
            let exist = itemList.find((item: any) => item.itemName === value.itemName)
            console.log(value.sold_quantity);

            if (value.sold_quantity > 0 || !isSales) {
                /*          setItemList({ ...itemList, value }) */
                console.log("entered");
                if (!exist) {
                    const newItem = { ...value, quantity: 1 }
                    setItemList([...itemList, newItem])
                    setInputItem("");
                    console.log("done");
                }
                else {
                    console.log("done");
                    const updatedQuantity = exist.quantity + 1
                    console.log(updatedQuantity, value.quantity);
                    if ((updatedQuantity) <= value.sold_quantity || !isSales) {
                        const tax = (exist?.tax?.match(/\d+/g)?.map(Number)[0]) / 100 * exist?.price
                        console.log("done");
                        console.log(value.discount);
                        console.log(value.subtotal, exist.quantity, updatedQuantity);
                        console.log((value.subtotal / exist.quantity) * updatedQuantity);
                        const updatedItem = {
                            ...exist,
                            quantity: exist.quantity + 1,
                            discount: Math.floor(((exist.discountPer / 100 * exist.price) * updatedQuantity) * 100) / 100,
                            taxAmount: Math.floor(tax * 100) / 100 * updatedQuantity,
                            subtotal: Math.floor(((value.subtotal / value.sold_quantity) * updatedQuantity) * 100) / 100
                        };
                        const updatedList = itemList.map((item: any) => item.itemName === value.itemName ? updatedItem : item);
                        setItemList(updatedList);
                    }
                    else {
                        toast({
                            title: "New PopUp !",
                            description: "Reached Maximum Stock limit",
                        });
                    }
                    setInputItem("");
                }
            }

        }
        const [taxex, setTaxex] = useState<any>([]);
        const [paymentData, setPaymentData] = useState<any>([]);

        useEffect(() => {
            const fetchData = async () => {
                const { data: tax } = await axios.put("/api/taxList",
                    {
                        header: "sales-pur"
                    }
                )
                console.log(tax[0].value);
                const { data: payment } = await axios.get("/api/paymentList");
                console.log("payment", payment.data);

                const modified = payment.data.map((item: any) => {
                    return {
                        ...payment.data,
                        value: item.paymentName
                    }
                })

                console.log(modified[0].value);


                setTaxex(tax)
                setPaymentData(modified);

            }
            fetchData();
        }, [])
        const discountType = [
            {
                value: "Fixed",

            },
            {
                value: "Percentage"
            }
        ]
        const framerTemplate = (variants: any) => {
            return (
                {
                    initial: "initial",
                    animate: "enter",
                    exit: "initial",
                    variants
                }
            )
        }
        const popBg = {
            initial: {
                opacity: 0,
                Transition: {
                    duration: 0.5,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }
            },
            enter: {
                opacity: 1,
                Transition: {
                    duration: 0.5,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }
            },
        }
        console.log(Items);


        return (
            <div className='mx-10 mt-10 mb-10'>
                <AnimatePresence mode="wait">
                    {isPopUp &&
                        <motion.div className="fixed inset-0 z-50 flex justify-center items-center backdrop-filter backdrop-blur-md"
                            {...framerTemplate(popBg)}
                        >
                            <PopUp
                                framerTemplate={framerTemplate}
                                isPopUp={isPopUp}
                                setIsPopUp={setIsPopUp}
                                modify={modify}
                                itemList={itemList}
                                setItemList={setItemList}
                                placeholder="Type"
                                inputData={taxex}
                                icon={false}
                                Items={Items}

                            />
                        </motion.div>
                    }
                </AnimatePresence>
                <section>
                    <div className="grid grid-cols-12 gap-5 md:gap-10">
                        <div ref={cusRef} className="  relative  col-start-1 md:col-span-6 col-span-full">
                            <div className="flex bg-primary-gray  py-1 px-2 rounded-lg border items-center ">
                                <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
                                <p className="bg-white w-full p-2 rounded-md border " >{data.customerName || ""}</p>

                                <Link href={"/customers/new"}>
                                    <BsPersonAdd className="ml-2 h-4 w-4 shrink-0  opacity-100" />
                                </Link>
                            </div>

                        </div>
                        <div ref={dateRef} className="md:col-start-7 md:col-span-6 col-span-full">
                            <div className="flex  py-1 text-w bg-primary-gray px-2 rounded-lg border items-center cursor-pointer "
                            >
                                <AiOutlineCalendar className="mr-2 cursor-default  h-4 w-4 shrink-0  opacity-50" />
                                <Input placeholder='Select Customer' value={billDate ? format(billDate, "PPP") : ''} readOnly onClick={() => {
                                }} className="  cursor-default " />
                            </div>
                        </div>
                    </div>
                    <div ref={itemRef} className="mt-5 relative">
                        <div className="flex items-center border py-1 bg-primary-gray px-2 rounded-lg">
                            <BiCart className="mr-2 h-4 w-4 shrink-0  opacity-50" />
                            <Input placeholder="Search Items..."
                                value={inputItem}
                                onClick={() => {
                                }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setInputItem(e.target.value)
                                }}
                            />
                        </div>
                        {
                            inputItem &&
                            <div className="mt-2 z-10 border rounded-lg bg-white absolute w-full">
                                {
                                    Items.map((item: any, index: any) => {
                                        console.log(item)
                                        return (
                                            <div className="">
                                                <p key={index}
                                                    className="px-3 py-1 cursor-pointer"
                                                    onClick={() => {
                                                        handleItemClick(item)
                                                    }}>
                                                    {item.itemName}  {isSales && `- ${item.sold_quantity}`}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                                {Items?.filter((item: any) => {
                                    return inputItem === "" ? true : item.itemName.toLowerCase().includes(inputItem.toLowerCase())
                                }).length === 0 && (
                                        <div className="">
                                            <p className="px-3 py-1 text-center">
                                                Item Not Found
                                            </p>
                                        </div>
                                    )}
                            </div>
                        }
                    </div>
                </section>
                <section>
                    <DataTable
                        columns={isSales ? sales_Column : pur_Column}
                        rows={true}
                        paginater={true}
                        route="/api/Sales"
                        data={itemList} />
                </section>
                <div className={`grid grid-cols-12 grid-rows-4 ${itemList.length > 0 ? "" : "pointer-events-none"} grid-flow-col gap-4`}>
                    <div className="col-start-1 items-center grid col-span-full md:col-span-6 h-auto rounded-lg bg-primary-gray">
                        <div className="grid md:grid-cols-4 gap-20 px-5  ">
                            <p className="col-start-1 col-end-3">Quantity</p>
                            <p className="col-span-2 col-start-3 "> {data.billQuantity} </p>
                        </div>
                    </div>
                    <div className={`grid items-center grid-cols-subgrid h-auto grid-rows-subgrid gap-2 col-start-1 px-1 bg-primary-gray col-span-12 md:col-span-6 rounded-lg `}>
                        <div className={`col-start-1 pl-2 col-end-7 py-2 md:col-end-4 `}>
                            <input id="Charges"
                                className={` w-full rounded-md ${data.billTaxType ? "" : "pointer-events-none"}  border px-2 h-10 outline-none`}
                                type="text"
                                value={data?.billCharges || 0}
                            />
                        </div>
                        <div className="md:col-start-4 col-start-7 h-auto col-end-13 relative md:col-end-7 pointer-events-none bg-primary-gray">
                            <Selections inputData={taxex} label={taxType} placeholder="None" setLabel={setTaxType} icon={false} />

                        </div>
                    </div>
                    <div className="grid  items-center grid-cols-subgrid grid-rows-subgrid gap-2 col-start-1 px-1 bg-primary-gray col-span-12 md:col-span-6 rounded-lg ">
                        <div className="col-start-1 pl-2 col-end-7 md:col-end-4">
                            <input
                                readOnly
                                value={data?.billDiscount || 0}
                                className={` w-full border rounded-md px-2 h-10 outline-none  ${data.billDiscountType ? "" : "pointer-events-none"} `}
                            />
                        </div>
                        <div className="md:col-start-4 col-start-7 col-end-13 relative md:col-end-7 pointer-events-none bg-primary-gray">
                            {/*   <Selections inputData={[{ laebl: "Cash" }, { label: "Credit Card" }, { label: "Debit Card" }, { label: "Paytm" }]} 
            label={payType} placeholder="Payment Type" setLabel={setPayType} icon={false} payment={true} /> */}

                            <Selections inputData={discountType} label={disType} placeholder="None" setLabel={setDisType} icon={false} />
                        </div>
                    </div>
                    <div className="grid items-center  grid-rows-subgrid gap-2 col-start-1 px-2 bg-primary-gray col-span-12 md:col-span-6 rounded-lg ">
                        <div className="py-2">
                            <textarea
                                id="Charges"
                                className=" w-full rounded-md px-2 h-auto resize-none outline-none"
                                placeholder="Note"
                                value={data.billNote || ""}
                                readOnly

                            />
                        </div>
                    </div>
                    <div className="md:col-end-13  h-auto md:col-span-4 rounded-lg col-span-full grid items-center bg-primary-gray">
                        <div className="grid whitespace-nowrap text-ellipsis overflow-clip grid-cols-4 lg:grid-cols-3 py-2 justify-start gap-4  px-5 ">
                            <p className="col-start-1 md:text-end col-end-3">Subtotal</p>
                            <p className="col-span-2 col-start-3 md-pr-2 "> $ {data.billSubtotal} </p>
                        </div>

                    </div>
                    <div className="md:col-end-13 md:col-span-4 py-2 h-auto rounded-lg col-span-full grid items-center bg-primary-gray">
                        <div className="grid grid-cols-4 h-auto lg:grid-cols-3 justify-start gap-4  px-5  ">
                            <p className="col-start-1 md:text-end  col-end-3">Other Charges</p>
                            <p className="col-span-2 col-start-3 md-pr-2 "> ${data.billOtherCharge} </p>
                        </div>
                    </div>
                    <div className="md:col-end-13 md:col-span-4 h-auto rounded-lg col-span-full grid items-center bg-primary-gray">
                        <div className="grid grid-cols-4 justify-start lg:grid-cols-3 py-2 gap-4 px-5  ">
                            <p className="col-start-1 md:text-end  col-end-3">Overall Discount</p>
                            <p className="col-span-2 col-start-3 md-pr-2">${data.billOverallDis} </p>
                        </div>
                    </div>
                    <div className="md:col-end-13 md:col-span-4 rounded-lg h-auto col-span-full grid items-center bg-primary-gray">
                        <div className="grid grid-cols-4 justify-start lg:grid-cols-3 py-2 gap-4 px-5  ">
                            <p className="col-start-1 md:text-end  col-end-3">Grand Total</p>
                            <p className="col-span-2 col-start-3 md-pr-2 ">${data.billTotal} </p>
                        </div>
                    </div>
                </div>
                {/* <section className="pt-5">
        <h2 className="text-green-500">Previous Payment Information :</h2>
        <DataTable
          columns={sales_Column}
          data={sample}
          rows={true}
          paginater={true}
        />
      </section> */}
                <section className="grid grid-cols-12 md:gap-10 gap-5">
                    <div className="mt-5 col-start-1 col-span-6 relative ">
                        <Selections inputData={paymentData} label={payType} placeholder="Payment Type" setLabel={setPayType} icon={false} payment={true} />
                    </div>
                    <div className="col-span-6 gird items-center border bg-primary-gray py-1 px-2 rounded-lg col-start-7 mt-5 ">
                        <Input type="text"
                            placeholder="Amount"
                            className="w-full px-2 appearance-none "
                            readOnly
                            value={data.billTotal}
                        />
                    </div>
                </section >
            </div>
        )
    }
    else {
        if (isSales) {
            return <div className=" bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold text-red-500">Something Went Wrong</h1>
                <p className="text-gray-700 mt-2">Please Checkout the sale Details in sales List</p>
                <Link href="/sales/sales-list" className="bg-blue-500 hover:bg-blue-700 mt-4 text-white px-2 py-1 rounded-md font-medium">Okay</Link>
            </div>
        }
        else {
            return <div className=" bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold text-red-500">Something Went Wrong</h1>
                <p className="text-gray-700 mt-2">Please Checkout The Purchase Details in Purchase List</p>
                <Link href="/purchases/purchase-list" className="bg-blue-500 hover:bg-blue-700 mt-4 text-white px-2 py-1 rounded-md font-medium">Okay</Link>
            </div>
        }

    }
}




export default NewSales



"use client"
import { BsPersonAdd } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { format } from "date-fns"
import { Input } from '@/components/ui/input'
import { IoMdContact } from "react-icons/io";
import { DataTable } from "../datatable/DataTable";
import Selections from "./selections";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { ColumnDef } from "@tanstack/react-table";
import PopUp from "./extraPopUp";
import { AnimatePresence, motion } from "framer-motion";
import { columnHeader_dataTable } from "../../../../global";
import axios from "axios";

const sample = [
  {
    name: "Deepath",
    quantity: 2,
    price: 200000000,
    discount: 10,
    tax: 1,
    subtotal: 10,
  }
]
const NewSales = ({ data, setData, placeholder, isSales, customerData, /* Items ,*/ inputItem, setInputItem, itemList, setItemList }: any) => {
  const [Items, setItem] = useState<any | undefined>([])
  console.log(Items);
  
  const [modify, setModify] = useState<string>("")
  const i_NAME: any = {
    accessorKey: "name",
    header: "Item Name",
    cell: ({ row }: any) => (
      <p>{row.original.name}</p>
    )
  };
  const i_QUANTITY: any = {
    accessorKey: "quantity",
    header: "QUANTITY",
    cell: ({ row }: any) => (
      <span className="flex gap-1 items-center">

        {/*  <button onClick={() => {
          const check = itemList.find((item: any) => item.name === row.original.name)
          const update = Items.find((item: any) => item.name === row.original.name)
          if (row.original.quantity > 1) {
            const updateTax = (row.original.taxPer * update.price) / 100;
            console.log(row.original.quantity);
            console.log(row.original.discount);

            console.log(row.original.discount / row.original.quantity);

            const updateDis = check.dis_type === "Fixed" ? row.original.discount / row.original.quantity : row.original.discount / row.original.quantity;
            const subTotal = check.tax_category === "Exclusive" ? check.price + updateTax - updateDis : check.price - updateDis;
            const uplist = {
              ...check,
              quantity: --row.original.quantity,
              discount: row.original.quantity * updateDis,
              tax: row.original.quantity * updateTax,
              subtotal: row.original.quantity * subTotal
            }
            const upQuantity = itemList.map((item: any) => item.name === row.original.name ? uplist : item)
            setItemList(upQuantity)
          }
        }} >
          <AiOutlineMinus />
        </button> */}
        {row.original.quantity}
        {/*  <button onClick={() => {
          const check = itemList.find((item: any) => item.name === row.original.name)
          const update = Items.find((item: any) => item.name === row.original.name)
          if (check.quantity < update.quantity) {
            const updateTax = (row.original.taxPer * update.price) / 100;
            console.log(row.original.quantity);
            console.log(row.original.discount);
            const updateDis = check.dis_type === "Fixed" ? row.original.discount / row.original.quantity : row.original.discount / row.original.quantity;
            const subTotal = check.tax_category === "Exclusive" ? check.price + updateTax - updateDis : check.price - updateDis;
            const uplist = {
              ...check,
              quantity: ++row.original.quantity,

              discount: row.original.quantity * updateDis,
              tax: row.original.quantity * updateTax,
              subtotal: row.original.quantity * subTotal
            }
            const upQuantity = itemList.map((item: any) => item.name === row.original.name ? uplist : item)
            setItemList(upQuantity)
          }
        }} >
          <AiOutlinePlus />
        </button> */}
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
    cell: (({ row }: any) => (
      <button onClick={() => {
        setModify(row);
        setIsPopUp(true);
      }}>
        {row.original.discount}
      </button>
    ))
  };
  const i_TAX: columnHeader_dataTable = {
    accessorKey: "tax",
    header: "TAX",
  };
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const i_TAXTYPE: any = {
    accessorKey: "tax_type",
    header: "TAX %",
    cell: (({ row }: any) => (

      <button onClick={() => {
        setModify(row);
        setIsPopUp(true);
      }}>
        {row.original.tax_type}
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
        setItemList(itemList.filter((item: any) => row.original.name !== item.name))
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
    i_TAXTYPE,
    i_SUBTOTAL,
    i_REMOVE,
  ];
  const pur_Column: ColumnDef<any>[] = [
    i_NAME,
    i_QUANTITY,
    i_PRICE,
    i_DISCOUNT,
    i_TAX,
    i_TAXTYPE,
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
  const [taxType, setTaxType] = useState("");
  useEffect(() => {
    setData({ ...data, billTaxType: taxType });
  }, [taxType]);
  const [disType, setDisType] = useState("");
  useEffect(() => {
    setData({ ...data, billDiscountType: disType });
  }, [disType]);
  const [payType, setPayType] = useState("");
  useEffect(() => {
    setData({ ...data, billPaymentType: payType });
  }, [payType]);
  let quantity = 0;
  let newSubTotal = 0;
  let updateCharge = 0;
  let updateDiscount = 0;
  let newTotal = 0;
  useEffect(() => {
    itemList.map((item: any) => (
      newSubTotal += item.subtotal,
      quantity += item.quantity
    ))
    updateCharge = (newSubTotal * data.billCharges) / 100
    updateDiscount = (newSubTotal * data.billDiscount) / 100
    newTotal = newSubTotal + updateCharge - updateDiscount
    setData((prevData: any) => ({
      ...prevData,
      billQuantity: quantity,
      billSubtotal: newSubTotal,
      billOtherCharge: updateCharge || prevData.billOtherCharge,
      billOverallDis: updateDiscount || prevData.billOtherCharge,
      billTotal: newTotal,
    }));

  }, [itemList])

  const [taxValue, setTaxValue] = useState<number>(0);

  useEffect(() => {
    const updateOnChange = () => {
      console.log(taxValue);

      const newOtherCharge = (data.billCharges * taxValue) / 100;
      const subTotal = newOtherCharge + data.billSubtotal;
      const newDiscount = data.billDiscountType === "Fixed" ? data.billDiscount : data.billDiscountType === "Per %" ? ((data.billDiscount * subTotal) / 100) : 0;
      setData({
        ...data,
        billOtherCharge: newOtherCharge,
        billOverallDis: newDiscount,
        billTotal: data.billSubtotal + newOtherCharge - newDiscount,
      })
    }
    updateOnChange();
  }, [data.billCharges, data.billDiscount, data.billDiscountType])


  const handleItemClick = (value: any) => {
    let exist = itemList.find((item: any) => item.name === value.name)
    console.log(value);
    if (value.quantity > 0) {
      if (!exist) {
        const newItem = { ...value, quantity: 1 }
        setItemList([...itemList, newItem])
      }
      else {
        const updatedQuantity = exist.quantity + 1
        if ((exist.quantity + 1) <= value.quantity) {
          console.log(value.discount);
          const updatedItem = {
            ...exist,
            quantity: exist.quantity + 1,
            discount: exist.discount / exist.quantity * updatedQuantity,
            /* price: value.price * updatedQuantity, */
            tax: value.tax * updatedQuantity,
            subtotal: value.subtotal * updatedQuantity
          };
          const updatedList = itemList.map((item: any) => item.name === value.name ? updatedItem : item);
          setItemList(updatedList);
        } else {
          console.log("nothing");
        }
      }
    }


    setInputItem("");

  }



  const taxex = [
    {
      label: "GST 5%",
      value: 5,
    },
    {
      label: "VAT 10%",
      value: 10,
    }
  ]
  const discountType = [
    {
      label: "Fixed",

    },
    {
      label: "Per %"
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

  const fetchItem = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {

      const response = await axios.put("/api/sales", { data: e.target.value });
      const original = response.data.map((item:any) => item)
      setItem(...Items,original)
      console.log(response.data);
      console.log(Items);
      
      
    }
  }

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
              <Input placeholder={placeholder} value={"" || data.customerName}
                onClick={() => {
                  setCustomerOpen(true);
                }}
                onChange={(e) => {
                  setData({ ...data, customerName: e.target.value });
                }}
              />
              <Link href={"/customers/new"}>
                <BsPersonAdd className="ml-2 h-4 w-4 shrink-0  opacity-100" />
              </Link>
            </div>
            {
              customerOpen && data.customerName && (
                <div className="mt-2 z-10 border rounded-lg bg-white absolute w-full">
                  {
                    customerData.map((item: any, index: any) => {
                      return (
                        <div className="">
                          <p key={index}
                            className="px-3 py-1 cursor-pointer"
                            onClick={() => {
                              setData({ ...data, customerName: item.value });
                              setCustomerOpen(false);
                            }}>
                            {item.label}
                          </p>
                        </div>
                      )
                    })
                  }
                  {customerData.filter((item: any) => {
                    return data.customerName === "" ? true : item.value.toLowerCase().includes(data.customerName.toLowerCase())
                  }).length === 0 && (
                      <div className="">
                        <p className="px-3 py-1 text-center">
                          Item Not Found
                        </p>
                      </div>
                    )}
                </div>
              )
            }
          </div>
          <div ref={dateRef} className="md:col-start-7 md:col-span-6 col-span-full">
            <div className="flex  py-1 text-w bg-primary-gray px-2 rounded-lg border items-center cursor-pointer "
            >
              <AiOutlineCalendar className="mr-2  h-4 w-4 shrink-0  opacity-50" />
              <Input placeholder='Select Customer' value={billDate ? format(billDate, "PPP") : ''} readOnly onClick={() => {

              }} className="  cursor-default " />
            </div>
          </div>
        </div>
        {
          !isSales &&
          <div className="mt-5 mb-10 col-span-full relative ">
            <Selections inputData={["Active", "Final"]} label={statusValue} placeholder="Status" setLabel={setStatusValue} icon={true} />
          </div>
        }
        <div ref={itemRef} className="mt-5 relative">
          <div className="flex items-center border py-1 bg-primary-gray px-2 rounded-lg">
            <BiCart className="mr-2 h-4 w-4 shrink-0  opacity-50" />
            <Input placeholder="Item Name / Barcode / Item Number"
              onClick={() => {

              }}
              onChange={fetchItem}

            />
          </div>
          {
         
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
                        {item.name} - {item.quantity}
                      </p>
                    </div>
                  )
                })
              }
              {Items?.filter((item: any) => {
                return inputItem === "" ? true : item.name.toLowerCase().includes(inputItem.toLowerCase())
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
              onChange={(e) => {
                setData({ ...data, billCharges: e.target.value })
              }}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== ".") {
                  e.preventDefault();
                }
              }}
              placeholder="Other Charges" />
          </div>
          <div className="md:col-start-4 col-start-7 h-auto col-end-13 relative md:col-end-7  bg-primary-gray">
            <Selections inputData={taxex} values setValue={setTaxValue} label={taxType} placeholder="Type" setLabel={setTaxType} icon={false} />
          </div>
        </div>
        <div className="grid  items-center grid-cols-subgrid grid-rows-subgrid gap-2 col-start-1 px-1 bg-primary-gray col-span-12 md:col-span-6 rounded-lg ">
          <div className="col-start-1 pl-2 col-end-7 md:col-end-4">
            <input id="overall discount"
              onChange={(e) => { setData({ ...data, billDiscount: e.target.value }) }}
              className={` w-full border rounded-md px-2 h-10 outline-none  ${data.billDiscountType ? "" : "pointer-events-none"} `}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key) {
                  e.preventDefault();
                }
              }}
              placeholder="Overall Discount" />
          </div>
          <div className="md:col-start-4 col-start-7 col-end-13 relative md:col-end-7  bg-primary-gray">
            <Selections inputData={discountType} label={disType} placeholder="Type" setLabel={setDisType} icon={false} />
          </div>
        </div>
        <div className="grid items-center  grid-rows-subgrid gap-2 col-start-1 px-2 bg-primary-gray col-span-12 md:col-span-6 rounded-lg ">
          <div className="py-2">
            <textarea
              id="Charges"
              className=" w-full rounded-md px-2 h-auto resize-none outline-none"
              placeholder="Note"
              onChange={(e) => { setData({ ...data, billNote: e.target.value }) }}
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
      <section className="pt-5">
        <h2 className="text-green-500">Previous Payment Information :</h2>
        <DataTable
          columns={sales_Column}
          data={sample}
          rows={true}
          paginater={true}
        />
      </section>
      <section className="grid grid-cols-12 md:gap-10 gap-5">
        <div className="mt-5 col-start-1 col-span-6 relative ">
          <Selections inputData={["Cash", "Credit Card", "Debit Card", "Paytm"]} label={payType} placeholder="Payment Type" setLabel={setPayType} icon={false} payment={true} />
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




export default NewSales



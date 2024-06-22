"use client"
import { MdOutlineMenuOpen } from "react-icons/md";
import React, { useState, useEffect } from 'react';

import {
  Table,
  TableBody,

  TableCell,
  TableFooter,

  TableRow,
} from "@/components/ui/table";
import FromToCalendar from "@/app/components/calendar/FromToCalendar"
import axios from "axios";
import CalenSelect from "../../sales-pur/calselect";




const DateSelector = () => {





  const [from, setFrom] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [purchaseData, setPurchaseData] = useState<any>([]);
  const [purchaseReturn, setPurchaseReturn] = useState<any>([]);
  const [salesData, setSalesData] = useState<any>([]);
  const [salesReturn, setSalesReturn] = useState<any>([]);


  useEffect(() => {
    console.log("done");

    const fetchData = async () => {
      const { data: purchase } = await axios.put('/api/purchase', {

        data: {
          header: "getPurchase",
          from: from,
          end: end
        }

      })

      const { data: purchaseReturn } = await axios.put('/api/purchase', {
        data: {
          header: "getReturn",
          from: from,
          end: end
        }
      })
      const { data: salesData } = await axios.put('/api/sales', {
        data: {
          header: "getSales",
          from: from,
          end: end
        }
      })
      const { data: salesReturnData } = await axios.put('/api/sales', {
        data: {
          header: "getReturn",
          from: from,
          end: end
        }
      })
      setSalesReturn(salesReturnData)
      setSalesData(salesData)
      setPurchaseData(purchase)
      setPurchaseReturn(purchaseReturn)
    }
    fetchData()
  }, [from, end])
  const totalPurchaseAmount = Math.floor(purchaseData?.reduce((acc: number, purchase: any) => purchase.total + acc, 0) * 100) / 100
  const purchaseCharge = purchaseData?.reduce((acc: number, purchase: any) => {
    const taxValue = purchase.taxType ? purchase.taxType.match(/\d+/g).map(Number)[0] : 0
    const charges = taxValue * purchase.otherCharges / 100 + purchase.otherCharges
    return charges + acc
  }, 0)
  const purchaseDiscount = purchaseData?.reduce((acc: number, purchase: any) => {
    const taxValue = purchase.taxType ? purchase.taxType.match(/\d+/g).map(Number)[0] : 0
    const charges = (taxValue * purchase.otherCharges) / 100 + purchase.otherCharges
    const totalItem = purchase.items.reduce((acc: number, item: any) => {
      return item.subtotal + acc
    }, 0)
    const discount = purchase.discountType ? (totalItem + charges) * purchase.discount / 100 : purchase.discount
    return discount + acc
  }, 0)
  const purchasePrice = purchaseData?.reduce((acc: number, purchase: any) => {
    const totalItem = purchase.items.reduce((acc: number, item: any) => item.subtotal + acc, 0)
    return acc + totalItem
  }, 0)

  const totalPurchaseReturnAmount = Math.floor(purchaseReturn?.reduce((acc: number, purchaseReturn: any) => purchaseReturn.total + acc, 0) * 100) / 100
  const purchaseReturnCharge = purchaseReturn?.reduce((acc: number, purchaseReturn: any) => {
    const taxValue = purchaseReturn.taxType ? purchaseReturn.taxType.match(/\d+/g).map(Number)[0] : 0
    const charges = taxValue * purchaseReturn.otherCharges / 100 + purchaseReturn.otherCharges
    return charges + acc
  }, 0)
  const purchaseReturnDiscount = purchaseReturn?.reduce((acc: number, purchaseReturn: any) => {
    const taxValue = purchaseReturn.taxType ? purchaseReturn.taxType.match(/\d+/g).map(Number)[0] : 0
    const charges = (taxValue * purchaseReturn.otherCharges) / 100 + purchaseReturn.otherCharges
    const totalItem = purchaseReturn.items.reduce((acc: number, item: any) => {
      return item.subtotal + acc
    }, 0)
    const discount = purchaseReturn.discountType ? (totalItem + charges) * purchaseReturn.discount / 100 : purchaseReturn.discount
    return discount + acc
  }, 0)
  const purchaseReturnPrice = purchaseReturn?.reduce((acc: number, purchaseReturn: any) => {
    const totalItem = purchaseReturn.items.reduce((acc: number, item: any) => item.subtotal + acc, 0)
    return acc + totalItem
  }, 0)

  const totalSalesAmount = Math.floor(salesData?.reduce((acc: number, sales: any) => sales.total + acc, 0) * 100) / 100
  const salesCharge = salesData?.reduce((acc: number, sales: any) => {
    const taxValue = sales.taxType ? sales.taxType.match(/\d+/g).map(Number)[0] : 0
    const charges = taxValue * sales.otherCharges / 100 + sales.otherCharges
    return charges + acc
  }, 0)
  const salesDiscount = salesData?.reduce((acc: number, sales: any) => {
    const taxValue = sales.taxType ? sales.taxType.match(/\d+/g).map(Number)[0] : 0
    const charges = (taxValue * sales.otherCharges) / 100 + sales.otherCharges
    const totalItem = sales.items.reduce((acc: number, item: any) => {
      return item.subtotal + acc
    }, 0)
    const discount = sales.discountType ? (totalItem + charges) * sales.discount / 100 : sales.discount
    return discount + acc
  }, 0)
  const salesPrice = salesData?.reduce((acc: number, sales: any) => {
    const totalItem = sales.items.reduce((acc: number, item: any) => item.subtotal + acc, 0)
    return acc + totalItem
  }, 0)

  const totalSalesReturnAmount = Math.floor(salesReturn?.reduce((acc: number, salesReturn: any) => salesReturn.total + acc, 0) * 100) / 100
  const salesReturnCharge = salesReturn?.reduce((acc: number, salesReturn: any) => {
    const taxValue = salesReturn.taxType ? salesReturn.taxType.match(/\d+/g).map(Number)[0] : 0
    const charges = taxValue * salesReturn.otherCharges / 100 + salesReturn.otherCharges
    return charges + acc
  }, 0)
  const salesReturnDiscount = salesReturn?.reduce((acc: number, salesReturn: any) => {
    const taxValue = salesReturn.taxType ? salesReturn.taxType.match(/\d+/g).map(Number)[0] : 0
    const charges = (taxValue * salesReturn.otherCharges) / 100 + salesReturn.otherCharges
    const totalItem = salesReturn.items.reduce((acc: number, item: any) => {
      return item.subtotal + acc
    }, 0)
    const discount = salesReturn.discountType ? (totalItem + charges) * salesReturn.discount / 100 : salesReturn.discount
    return discount + acc
  }, 0)
  const salesReturnPrice = salesReturn?.reduce((acc: number, salesReturn: any) => {
    const totalItem = salesReturn.items.reduce((acc: number, item: any) => item.subtotal + acc, 0)
    return acc + totalItem
  }, 0)

  const purchase = [
    {
      purchaselist: "Total Purchase",
      purchaseAmount: Math.floor(purchasePrice * 100) / 100,
      purchasereturn: "Total Purchase Return",
      purchase_return_amount: Math.floor(purchaseReturnPrice * 100) / 100
    },
    {
      purchaselist: "Total Other Charges Of Purchase",
      purchaseAmount: Math.floor(purchaseCharge * 100) / 100,
      purchasereturn: "Total Total Other Charges of Purchase Return	",
      purchase_return_amount: Math.floor(purchaseReturnCharge * 100) / 100
    },
    {
      purchaselist: "Total Discount On Purchase",
      purchaseAmount: Math.floor(purchaseDiscount * 100) / 100,
      purchasereturn: "Total Discount on Purchase Return",
      purchase_return_amount: Math.floor(purchaseReturnDiscount * 100) / 100
    },



  ]

  const sales = [
    {
      saleitem: "Total Sales",
      salesAmount: Math.floor(salesPrice * 100) / 100,
      salesReturn: "Total Sales Return",
      sales_return_Amount: Math.floor(salesReturnPrice * 100) / 100


    },
    {
      saleitem: "Total Other Charges of Sales	",
      salesAmount: Math.floor(salesCharge * 100) / 100,
      salesReturn: "Total Other Charges of Sales Return	",
      sales_return_Amount: Math.floor(salesReturnCharge * 100) / 100


    },
    {
      saleitem: "Total Discount on Sales	",
      salesAmount: Math.floor(salesDiscount * 100) / 100,
      salesReturn: "Total Discount on Sales Return	",
      sales_return_Amount: Math.floor(salesReturnDiscount * 100) / 100


    },

  ]





  return (
    <div>
      <div className="p-4 ">
        <div className="  border p-3 border-t-2 border-t-violet-300 rounded-t-sm ">
          <h1 className="text-lg font-semibold">Select Date</h1>
          <div className="grid grid-cols-12 md:gap-0 gap-5 ">
            <span className="col-start-1 col-span-full md:col-span-5">
              <CalenSelect date={from} setDate={setFrom} />
            </span>
            <span className="md:col-end-13 col-span-full md:col-span-5">
              <CalenSelect date={end} setDate={setEnd} />
            </span>
          </div>
        </div>


        <div className="">
          <div className=" items-center rounded-t-sm  lg:row-span-1 gap-4 w-[100%] lg:grid grid-cols-12  min-h-[200px] mt-10">

            <div className="lg:col-span-6 border p-3 border-t-2 border-t-violet-300">


              <div className="flex justify-between ">
                <div className=""></div>
                <div className="flex items-center hover:bg-blue-300  cursor-pointer bg-blue-400 p-2 text-white rounded-md">
                  <MdOutlineMenuOpen />
                  <button className=''><span></span> Export</button>
                </div>
              </div>

              <div className=" ">

                <div className=" font-medium italic underline lg:col-span-6">Purchase  </div>
                <div className="">

                  <Table className=" mt-3 flex flex-col justify-between w-[100%] ">
                    <TableBody className=" ">
                      {purchase.map((item, index) => (
                        <TableRow className="border-t" key={index}>
                          <TableCell className="font-medium border-r-2  w-[100%]  ">{item.purchaselist}</TableCell>
                          <TableCell className="text-end">{`${item.purchaseAmount}`}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter className="w-[100%]">
                      <TableRow>
                        <TableCell colSpan={3} className="w-[100%]">Total</TableCell>
                        <TableCell className="text-right font-extrabold">
                          {`${totalPurchaseAmount}`}

                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>


                  <div className=" mt-4  font-medium italic underline">
                    Purchase Return
                  </div>

                  <Table className=" mt-3 flex flex-col justify-between w-[100%]">
                    <TableBody className=" ">
                      {purchase.map((item, index) => (
                        <TableRow className="border-t" key={index}>
                          <TableCell className="font-medium border-r-2  w-[100%]  ">{item.purchasereturn}</TableCell>
                          <TableCell className="text-end px-[35px]">{`${item.purchase_return_amount}`}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow className="w-[100%]">
                        <TableCell colSpan={3} className="w-[100%]">Total</TableCell>
                        <TableCell className="text-right font-extrabold">
                          {`${totalPurchaseReturnAmount}`}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>

                </div>
              </div>
            </div>

            <div className="  lg:col-start-7 lg:col-span-6 border p-3 border-t-2 border-t-violet-300 lg:mt-0 sm:mt-5">
              <div className="flex justify-between ">
                <div className=""></div>
                <div className="flex items-center hover:bg-blue-300  cursor-pointer bg-blue-400 p-2 text-white rounded-md">
                  <MdOutlineMenuOpen />
                  <button className=''><span></span> Export</button>
                </div>
              </div>
              <div className=" ">
                <div className=" font-medium italic underline">Sales  </div>

                <Table className=" mt-3 flex flex-col justify-between w-[100%]">
                  <TableBody className=" ">
                    {sales.map((item, index) => (
                      <TableRow className="border-t" key={index}>
                        <TableCell className="font-medium border-r-2  w-[100%]  ">{item.saleitem}</TableCell>
                        <TableCell className="text-end">{`${item.salesAmount}`}</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter className="w-[100%]">
                    <TableRow>
                      <TableCell colSpan={3} className="w-[100%]">Total</TableCell>
                      <TableCell className="text-right font-extrabold">
                        {`${totalSalesAmount}`}

                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
                <div className=" mt-4  font-medium italic underline">
                  Sales Return
                </div>


                <Table className=" mt-3 flex flex-col justify-between w-[100%]">
                  <TableBody className=" ">
                    {sales.map((item, index) => (
                      <TableRow className="border-t" key={index}>
                        <TableCell className="font-medium border-r-2  w-[100%]  ">{item.salesReturn}</TableCell>
                        <TableCell className="text-end px-[35px]">{`${item.sales_return_Amount}`}</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow className="w-[100%]">
                      <TableCell colSpan={3} className="w-[100%]">Total</TableCell>
                      <TableCell className="text-right font-extrabold">
                        {`${totalSalesReturnAmount}`}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>

              </div>
            </div>

          </div>

        </div>


      </div>

    </div>
  );
};

export default DateSelector;

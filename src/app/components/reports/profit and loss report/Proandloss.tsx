"use client"
import { MdOutlineMenuOpen } from "react-icons/md";
import React, { useState } from 'react';
import {
  Table,
  TableBody,

  TableCell,
  TableFooter,

  TableRow,
} from "@/components/ui/table"



const DateSelector = () => {
  const purchase = [
    {
      purchaselist: "Totalpurchase",
      purchaseAmount: 20000,
      purchasereturn: "Total Purchase Return",
      purchase_return_amount: 0
    },
    {
      purchaselist: "Totalpurchase_tax",
      purchaseAmount: 200,
      purchasereturn: "Total Purchase Return Tax",
      purchase_return_amount: 0
    },
    {
      purchaselist: "Total_Other_Charges_of_Purchase",
      purchaseAmount: 200,
      purchasereturn: "Total Total Other Charges of Purchase Return	",
      purchase_return_amount: 0
    },
    {
      purchaselist: "Total_Discount_on_Purchase",
      purchaseAmount: 200,
      purchasereturn: "Total Discount on Purchase Return",
      purchase_return_amount: 0
    },
    {
      purchaselist: "Paid_Payment",
      purchaseAmount: 200,
      purchasereturn: "Paid Payment",
      purchase_return_amount: 0
    },
    {
      purchaselist: "Purchase_due",
      purchaseAmount: 200,
      purchasereturn: "Purchase Return Due",
      purchase_return_amount: 0
    },


  ]

  const sales=[
    {
      saleitem:"Total Sales",
      salesAmount:3030,
      salesReturn:"Total Sales Return",
      sales_return_Amount:0


    },
    {
      saleitem:"Total Sales Tax	",
      salesAmount:300,
      salesReturn:"Total Sales Return",
      sales_return_Amount:0


    },
    {
      saleitem:"Total Other Charges of Sales	",
      salesAmount:30,
      salesReturn:"Total Other Charges of Sales Return	",
      sales_return_Amount:0


    },
    {
      saleitem:"Total Discount on Sales	",
      salesAmount:30000,
      salesReturn:"Total Discount on Sales Return	",
      sales_return_Amount:0


    },
    {
      saleitem:"Paid Payment	",
      salesAmount:3000,
      salesReturn:"Paid Payment	",
      sales_return_Amount:0


    },
    {
      saleitem:"Sales Due		",
      salesAmount:30003,
      salesReturn:"Sales Return Due		",
      sales_return_Amount:0


    }
  ]

  const totalPurchaseAmount = purchase.reduce((acc, item) => acc + item.purchaseAmount, 0);
  const totalReturnPurchaseAmount = purchase.reduce((acc, item) => acc + item.purchase_return_amount, 0);

  return (
    <div>
      <div className="p-4 ">

        <div className="  border p-3 border-t-2 border-t-violet-300 rounded-t-sm ">
          <h1 className="text-lg font-semibold">Select Date</h1>
          <form action="" className='flex gap-4 mt-2 '>
            <div className="">

              <label htmlFor="Fromdate">From :</label>
              <input type="date" name='Fromdate' className='border p-1' id='Fromdate' />
            </div>
            <div className="">

              <label htmlFor="Fromdate">To :</label>
              <input type="date" name='Todate' className='border p-1' id='Fromdate' />
            </div>
          </form>
        </div>


        <div className="">
        <div className="border p-3 border-t-2 border-t-violet-300 rounded-t-sm  min-h-[200px] mt-10">

          <div className="flex justify-between ">
            <div className=""></div>
            <div className="flex items-center hover:bg-blue-300  cursor-pointer bg-blue-400 p-2 text-white rounded-md">
              <MdOutlineMenuOpen />
              <button className=''><span></span> Export</button>
            </div>
          </div>

          <div className="w-[100%] md:grid grid-cols-12 ">

            <div className=" font-medium italic underline md:col-span-6">Purchase  </div>
            <div className=" md:col-span-6">

            <Table className=" mt-3 flex flex-col justify-between w-[100%] ">
              <TableBody className=" ">
                {purchase.map((item, index) => (
                  <TableRow className="border-t" key={item.index}>
                    <TableCell className="font-medium border-r-2  w-[100%]  ">{item.purchaselist}</TableCell>
                    <TableCell className="text-end">{`${item.purchaseAmount}.00`}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="w-[100%]">
                <TableRow>
                  <TableCell colSpan={3} className="w-[100%]">Total</TableCell>
                  <TableCell className="text-right font-extrabold">
                    {`${totalPurchaseAmount}.00`}

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
                  <TableRow className="border-t" key={item.index}>
                    <TableCell className="font-medium border-r-2  w-[100%]  ">{item.purchasereturn}</TableCell>
                    <TableCell className="text-end px-[35px]">{`${item.purchase_return_amount}.00`}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="w-[100%]">
                  <TableCell colSpan={3} className="w-[100%]">Total</TableCell>
                  <TableCell className="text-right font-extrabold">
                    {`${totalReturnPurchaseAmount}.00`}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>


          </div>
            </div>


          <div className=" mt-4">
          <div className="flex justify-between ">
            <div className=""></div>
            <div className="flex items-center hover:bg-blue-300  cursor-pointer bg-blue-400 p-2 text-white rounded-md">
              <MdOutlineMenuOpen />
              <button className=''><span></span> Export</button>
            </div>
          </div>
          <div className=" mt-3">
          <div className=" font-medium italic underline">Sales  </div>

            <Table className=" mt-3 flex flex-col justify-between w-[100%]">
              <TableBody className=" ">
                {sales.map((item, index) => (
                  <TableRow className="border-t" key={item.index}>
                    <TableCell className="font-medium border-r-2  w-[100%]  ">{item.saleitem}</TableCell>
                    <TableCell className="text-end">{`${item.salesAmount}.00`}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="w-[100%]">
                <TableRow>
                  <TableCell colSpan={3} className="w-[100%]">Total</TableCell>
                  <TableCell className="text-right font-extrabold">
                    {`${totalPurchaseAmount}.00`}

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
                  <TableRow className="border-t" key={item.index}>
                    <TableCell className="font-medium border-r-2  w-[100%]  ">{item.salesReturn}</TableCell>
                    <TableCell className="text-end px-[35px]">{`${item.sales_return_Amount}.00`}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="w-[100%]">
                  <TableCell colSpan={3} className="w-[100%]">Total</TableCell>
                  <TableCell className="text-right font-extrabold">
                    {`${totalReturnPurchaseAmount}.00`}
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

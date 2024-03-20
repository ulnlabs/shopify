import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React from 'react'
import { AiOutlineBarcode } from 'react-icons/ai'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function page() {
  return (
    <div className='w-full p-4 '>
      <DashboardHeader title='Labels' subtitle='' breadcrumb={[{ path: '/dashboard', title: 'Dashboard' }, { path: '/item/labels', title: "Labels" }]} />
      <div className=" mt-4 border-t-2 rounded-lg border-[--primary] p-4 shadow-sm h-fit items-center w-full">
        <div className="w-full h-fit container flex flex-col gap-6 py-4">
          <div className="flex gap-2  w-full items-center">
            <AiOutlineBarcode className='text-2xl' />
            <input type="text" placeholder='' className='p-2 border outline-none rounded w-full' />
          </div>
          <div className="">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
        <div className="w-full py-2 items-center justify-center gap-4 pt-4 grid grid-cols-2">
          <button className=' py-2 text-white rounded  bg-red-400'>Save</button>
          <button className=' py-2 text-white rounded  bg-gray-400'>Close</button>
        </div>
      </div>
    </div>
  )
}

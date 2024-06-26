'use client'
import React, { useContext, useEffect, useRef } from 'react'
import DataTable from './billDatable'
import { columnHeader_dataTable } from '../../../../global'
import { useRouter } from 'next/navigation'
import { useReactToPrint } from 'react-to-print';
import companyDetail from '@/app/mongoose/models/companyProfile'
import { ContextData } from '../../../../contextapi'
interface invoiceType {
  date: Date | any
  invoiceId: string | any
  discountAll: number | any
  otherCharges: number | any
  itemList: [any]
  paymentType: string | any,
  note: string | any
  taxType: string | any
  discountType: string | any
  total: number | any
  isSales?: boolean | any
  status?: string | any
  c_id?: {} | any
  s_id?: {} | any

}
function invoice({ date, invoiceId, discountAll, discountType, otherCharges, itemList, paymentType, note, taxType, total, isSales, status, c_id, s_id }: invoiceType) {

  const router = useRouter()

  const R_QUANTITY: columnHeader_dataTable = {
    accessorKey: "returned_quantity",
    header: "Quantity"
  }
  const R_NET_COST: any = {
    accessorKey: "net_cost",
    header: "Net Cost",
    cell: (({ row }: any) => <p>{row.original.price * row.original.returned_quantity}</p>)
  };
  const R_TAX: columnHeader_dataTable = {
    accessorKey: "tax",
    header: "Tax",
  };
  const R_TAX_AMOUNT: any = {
    accessorKey: "taxAmount",
    header: "Tax Amount",
    cell: (({ row }: any) => {
      const tax = row.original.tax ? row.original.tax?.match(/\d+/g).map(Number)[0] : 0
      const taxValue = tax / 100 * (row.original.price * row.original.returned_quantity)
      return <p>{Math.floor(taxValue * 100) / 100}</p>
    })
  };
  const R_DISCOUNT_AMOUNT: any = {
    accessorKey: "discount",
    header: "Discount Amount",
    cell: (({ row }: any) => {
      const discountValue = row.original.discountPer / 100 * row.original.price
      return <p>{Math.floor((discountValue * row.original.returned_quantity) * 100) / 100}</p>
    })
  };
  const R_DISCOUNT: any = {
    accessorKey: "discountPer",
    header: "Discount",
    /*     cell: (({ row }: any) => {
          console.log(row.original.discount * 100 / row.original.subtotal);
          return <p>{row.original.discount * 100 / row.original.subtotal}</p>
        }) */
  };
  const R_SUBTOTAL: any = {
    accessorKey: "subtotal",
    header: "Sub Total ",
    cell: (({ row }: any) => <p>{row.original.subtotal / row.original.quantity * row.original.returned_quantity}</p>)
  };


  const ITEM_NAME: columnHeader_dataTable = {
    accessorKey: "itemName",
    header: "Item Name",
  };
  const UNIT_PRICE: columnHeader_dataTable = {
    accessorKey: "price",
    header: "Unit Price",
  };
  const QUANTITY: columnHeader_dataTable = {
    accessorKey: "quantity",
    header: "Quantity",
  };

  const NET_COST: any = {
    accessorKey: "net_cost",
    header: "Net Cost",
    cell: (({ row }: any) => <p>{row.original.price * row.original.quantity}</p>)
  };
  const TAX: columnHeader_dataTable = {
    accessorKey: "tax",
    header: "Tax",
  };
  const TAX_AMOUNT: columnHeader_dataTable = {
    accessorKey: "taxAmount",
    header: "Tax Amount",
  };
  const DISCOUNT_AMOUNT: columnHeader_dataTable = {
    accessorKey: "discount",
    header: "Discount Amount",
  };
  const DISCOUNT: any = {
    accessorKey: "discountPer",
    header: "Discount",
    /*     cell: (({ row }: any) => {
          console.log(row.original.discount * 100 / row.original.subtotal);
          return <p>{row.original.discount * 100 / row.original.subtotal}</p>
        }) */
  };
  const subTotal: columnHeader_dataTable = {
    accessorKey: "subtotal",
    header: "Sub Total ",
  };


  const DATE: columnHeader_dataTable = {
    accessorKey: "date",
    header: "Date"
  };
  const PAYMENT_TYPE: columnHeader_dataTable = {
    accessorKey: "payment_type",
    header: "Payment Type"
  };
  const PAYMENT_NOTE: columnHeader_dataTable = {
    accessorKey: "payment_note",
    header: "Payment Note"
  };
  const PAYMENT: columnHeader_dataTable = {
    accessorKey: "payment",
    header: "Payment"
  };
  /*   const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    console.log(year); */

  const { companyDetail } = useContext(ContextData);
  console.log(companyDetail);




  console.log(taxType);
  const taxValue = (taxType && taxType.match) ? taxType?.match(/\d+/g)!.map(Number)[0] : 0

  console.log(taxValue);

  const overallCharges = (taxValue / 100 * Number(otherCharges)) + Number(otherCharges);

  console.log(overallCharges);

  const totalPrice = itemList?.reduce((total, Item: any) => total + Item.price, 0)
  const totalQuantity = itemList?.reduce((total, Item: any) => total + Item.quantity, 0)
  const totalTaxAmount = Math.floor(itemList?.reduce((total, Item: any) => total + Item.taxAmount, 0) * 100) / 100
  const totalDisAmount = Math.floor(itemList?.reduce((total, Item: any) => total + Item.discount, 0) * 100) / 100
  const totalAmount = Math.floor(itemList?.reduce((total, Item: any) => total + Item.subtotal, 0) * 100) / 100
  console.log(discountAll);

  const discountValue = Math.floor((discountType ? (discountType.toLowerCase() === "fixed" ? discountAll : discountAll * (totalAmount + overallCharges) / 100) : 0) * 100) / 100
  console.log(discountValue);
  const rTotalQuantity = itemList?.reduce((total, Item: any) => total + Item.returned_quantity, 0)
  const rTotalTaxAmount = Math.floor(itemList?.reduce((total, Item: any) => total + (Item.taxAmount / Item.quantity) * Item.returned_quantity, 0) * 100) / 100
  const rTotalDisAmount = Math.floor(itemList?.reduce((total, Item: any) => total + (Item.discount / Item.quantity) * Item.returned_quantity, 0) * 100) / 100
  const rTotalAmount = Math.floor(itemList?.reduce((total, Item: any) => total + (Item.subtotal / Item.quantity) * Item.returned_quantity, 0) * 100) / 100

  console.log(status);

  const paymentInformation = [
    {
      date: date,
      payment_type: paymentType,
      payment_note: note || "-",
      payment: totalAmount,
    },
  ]

  const billRef = useRef<HTMLInputElement | null>(null)

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    documentTitle: 'Invoice',
  });

  return (
    <div className="">
      <div className=" w-full p-3  text-xl font-medium">
        <h1>Invoice :-</h1>
      </div>


      <div className='grid mt-3'>

        <div className="w-full py-4 px-10 " ref={billRef} >

          {isSales ? <h1>Sales Invoice</h1> : <h1>Purchase Invoice</h1>}
          <div className='border-b-2 w-full py-3 flex  justify-between'>
            <p>Invoice #{invoiceId}</p>
            <p>Date:{date}</p>
          </div>
          <div className="flex w-[100%] py-3  flex-col">
            <div className="w-full  flex  justify-between md:gap-0 gap-3">
              <div>
                <p>From</p>
                <p>{companyDetail.companyName}</p>
                <p>{companyDetail.address},{companyDetail.city},{companyDetail.state}</p>
                <p>{companyDetail.mobile}</p>
                <p>{companyDetail.email}</p>
                <p>{companyDetail.gstNo}</p>
                <p>{companyDetail.vatNo}</p>
              </div>
              {/*  <div className='flex md:flex-row justify-between ' > */}
              <div className="">
                {isSales ? <div>
                  <p>Customer Details</p>
                  <p>Name: {c_id.name ? c_id?.name : "Unkown"}</p>
                  <p>Mobile: {c_id.mobile ? c_id?.mobile : "XXXXXXXXXX"}</p>
                  <p>Address: {c_id?.address ? c_id.address : " ..."}  </p>
                </div>
                  : <div>
                    <p>Supplier Details</p>
                    <p>Name: {s_id.name ? s_id?.name : "Unkown"}</p>
                    <p>Mobile: {s_id.mobile ? s_id?.mobile : "XXXXXXXXXX"}</p>
                    <p>Address: {s_id.address ? s_id.address : "..."} </p>
                  </div>
                }

                {/* </div> */}

              </div>
            </div>
            <div>
              <DataTable final totalPrice={totalPrice} totalDisAmount={totalDisAmount} totalAmount={totalAmount} totalQuantity={totalQuantity} totalTaxAmount={totalTaxAmount} columns={[ITEM_NAME, UNIT_PRICE, QUANTITY, NET_COST, TAX, TAX_AMOUNT, DISCOUNT, DISCOUNT_AMOUNT, subTotal]} data={itemList} />
            </div>
            <div className="w-full flex flex-col gap-2 text-base font-semibold mt-4">
              <div className="">
                <p>Discount on All :{discountAll}%</p>
                <p>OtherCharges : {otherCharges} </p>
                <p>tax : {taxType || "none"}</p>
              </div>
              <div className="">
                <h3 className="text-xl">Payment Information :</h3>
                <DataTable columns={[DATE, PAYMENT_TYPE, PAYMENT_NOTE, PAYMENT]} data={paymentInformation} />
              </div>
              <div className="pt-3 grid grid-cols-12 ">
                <p className='col-span-3 col-end-11 text-end ' >SubTotal : </p>       <p className='col-span-2 col-end-13 ml-2 text-start'> ₹{totalAmount}</p>
                <p className='col-span-3 col-end-11 text-end ' >Other Charges : </p>  <p className='col-span-2 col-end-13 ml-2 text-start'> ₹{overallCharges}</p>
                <p className='col-span-3 col-end-11 text-end ' >Discount on All : </p><p className='col-span-2 col-end-13 ml-2 text-start'> ₹{discountValue}</p>
                <p className='col-span-3 col-end-11 text-end ' >Grand Total : </p>    <p className='col-span-2 col-end-13 ml-2 text-start'> ₹{total}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-10 mb-5 flex gap-3 flex-wrap mt-2 ">

          <button className='bg-green-400 px-2 py-3 rounded-md' onClick={handlePrint} >Print</button>
          {isSales ? <button className='bg-yellow-400  px-2 py-3 rounded-md'
            onClick={(e) => {
              e.preventDefault();
              router.push("/sales/new-return")
            }}
          >Sales Return</button>
            : <button className='bg-yellow-400  px-2 py-3 rounded-md'
              onClick={(e) => {
                e.preventDefault();
                router.push("/purchases/new-return")
              }}
            >Purchase Return</button>
          }
        </div>
      </div>
      {
        status?.toLocaleLowerCase() === "Return Raised".toLowerCase() && (
          <div className='flex justify-center mt-3 mb-10'>


            <div className="w-[95%]">
              <h2>Returned Items:</h2>
              <DataTable final totalPrice={totalPrice} totalDisAmount={rTotalDisAmount} totalAmount={rTotalAmount} totalQuantity={rTotalQuantity} totalTaxAmount={rTotalTaxAmount} columns={[ITEM_NAME, UNIT_PRICE, R_QUANTITY, R_NET_COST, R_TAX, R_TAX_AMOUNT, R_DISCOUNT, R_DISCOUNT_AMOUNT, R_SUBTOTAL]} data={itemList} />
            </div>
          </div>
        )

      }
    </div >

  )
}

export default invoice
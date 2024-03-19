import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React from 'react'

function page() {
  return (
    <div className='w-full flex flex-col items-center py-6 px-6 gap-4'>
      <DashboardHeader title='Dashboard' subtitle='Business analatics'/>
      <div className="flex justify-evenly w-full gap-6 flex-wrap">
        <SaleAmount title="today Sale Amount" amount={2000} />
        <SaleAmount title="today Sale Amount" amount={20} />
      </div>
      <div className="flex w-full justify-evenly items-center flex-wrap">
        <ProductCount title='Product Count' count={30} subtitle='Daily Sale' dec='10% of profit from overall month' />
        <ProductCount title='Product Count' count={30} subtitle='Daily Sale' dec='10% of profit from overall month' />
      </div>
      <div className="flex items-center justify-center w-full py-2">
        <div className="sm:w-[82%] w-full h-[200px] border bg-gray-200 rounded-[30px]"></div>
      </div>
    </div>
  )
}

export default page

const SaleAmount = ({ title, amount }: { title: String, amount: number }) => {
  return (
    <div className="sm:w-[400px] w-full p-2  shadow-gray-200 rounded-[20px] shadow-[inset_0px_0px_4px_1px] flex items-center justify-between">
      <div className="min-w-[100px] min-h-[100px] border rounded-[20px] font-bold flex items-center justify-center text-4xl text-[--primary]">
        {
          amount >= 1000 ? amount / 1000 + "k" : (amount >= 100 && amount < 1000) ? amount / 100 + "h" : "₹" + amount
        }
      </div>
      <h2 className='text-gray-700 px-4 text-lg'>{title}</h2>
    </div>
  )
}

const ProductCount = ({ title, count, subtitle, dec }: { title: string, count: number, subtitle: string, dec: string }) => {
  return (
    <div className="relative flex flex-col justify-end items-center h-[220px] sm:w-fit w-full sm:px-0 px-3">
      <div className="relative sm:w-[400px] w-full h-[180px] flex items-end justify-center rounded-[30px] bg-gray-100 shadow shadow-[inset_0px_0px_1px_2px] shadow-gray-200">
        <div className="sm:w-[360px] w-[90%] h-[120px] px-6 flex justify-between items-center shodow-sm shadow-[inset_0px_1px_4px_1px] shadow-gray-200 bg-white rounded-[30px] absolute mx-auto -top-[20px]">
          <h4 className='text-xl'>{title}</h4>
          <h1 className='text-6xl text-[--primary] font-bold'>{count}</h1>
        </div>
        <div className="flex flex-col item-start justify-end gap-2 py-4 sm:w-[360px] w-[90%] px-4">
          <h1 className="text-2xl font-semibold text-gray-800">{subtitle}</h1>
          <p className='text-[10px] font-light '>{dec}</p>
        </div>
      </div>
    </div>
  )
}
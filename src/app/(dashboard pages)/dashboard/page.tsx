'use client'
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
function page() {
  const date = new Date
  date.setDate(1)

  const [todaySalesData, setTodaySales] = useState<any>([])
  const [monthlySale, setMonthlySale] = useState<any>([]);
  useEffect(() => {
    const fetchTodaySales = async () => {
      const { data } = await axios.put('/api/sales', {
        data: {
          header: "getSales",
          from: new Date,
          end: new Date
        }
      })
      setTodaySales(data)
    }
    const fetchSales = async () => {
      const response = await axios.put('/api/sales', {
        data: {
          header: "getSales",
          from: date,
          end: new Date
        }

      })
      setMonthlySale(response.data)
    }
    fetchTodaySales();
    fetchSales();
  }, [])
  const SalesAmount = todaySalesData ? todaySalesData?.reduce((acc: any, data: any) => {
    return acc + data.total
  }, 0) : 0


  const MonthlySaleAmount = monthlySale ? monthlySale?.reduce((acc: any, data: any) => {
    console.log(data);

    return acc + data.total
  }, 0) : 0

  const [purchaseData, setPurchaseData] = useState<any>();
  const [purchaseMonthly, setPurchaseMonthly] = useState<any>();

  useEffect(() => {
    const fetchPurchase = async () => {
      const { data } = await axios.put('/api/purchase', {
        data: {
          header: "getPurchase",
          from: new Date,
          end: new Date
        }
      })
      setPurchaseData(data)
    }
    const fetchMonthlyPurchase = async () => {
      const { data } = await axios.put('/api/purchase', {
        data: {
          header: "getPurchase",
          from: date,
          end: new Date
        }
      })
      setPurchaseMonthly(data)
    }
    fetchMonthlyPurchase();
    fetchPurchase();
  }, [])


  const PurchaseAmount = purchaseData ? purchaseData?.reduce((acc: any, data: any) => {
    return acc + data.total
  }, 0) : 0

  console.log(purchaseMonthly);

  const purchaseMonthlyAmount = purchaseMonthly ? purchaseMonthly?.reduce((acc: any, data: any) => acc + data.total, 0) : 0
  console.log(purchaseMonthly);

  console.log(monthlySale ? monthlySale.length : 0);

  const todaySaleCount = todaySalesData ? todaySalesData.length : 0
  const monthlySaleCount = monthlySale ? monthlySale.length : 0

  const [todayExpense, setTodayExpense] = useState<any>();
  const [MonthlyExpense, setMonthlyExpense] = useState<any>();
  useEffect(() => {
    const fetchExpense = async () => {
      const { data } = await axios.put('/api/expenses',
        {
          from: new Date,
          end: new Date
        }
      )
      setTodayExpense(data)
    }
    const fetchMonthlyExpense = async () => {
      const { data } = await axios.put('/api/expenses',
        {
          from: date,
          end: new Date
        }
      )
      setMonthlyExpense(data)
    }
    fetchExpense();
    fetchMonthlyExpense();
  }, [])


  console.log(todayExpense);
  const todayExpenseAmount = todayExpense ? todayExpense?.reduce((acc: any, data: any) => acc + data.amount, 0) : 0
  console.log(todayExpenseAmount);



  const MonthlyExpenseAmount = MonthlyExpense ? MonthlyExpense?.reduce((acc: any, data: any) => acc + data.amount, 0) : 0

  function calculateProfitPercentage(purchasePrice: number, salesPrice: number) {
    // Validate input (optional)
    if (typeof purchasePrice !== 'number' || typeof salesPrice !== 'number') {
      throw new Error('Invalid input: Purchase price and sales price must be numbers.');
    }

    // Handle cases where purchase price is zero (avoid division by zero)
    if (purchasePrice === 0) {
      return 'Cannot calculate percentage with zero purchase price.';
    }

    // Calculate profit
    const profit = salesPrice - purchasePrice;

    // Calculate profit percentage with absolute value (avoid negative percentage)
    const profitPercentage = Math.abs((profit / purchasePrice) * 100);

    // Indicate profit or loss based on sign
    const profitOrLoss = profit > 0 ? 'Profit' : 'Loss';

    return ` ${profitPercentage.toFixed(2)}% ${profitOrLoss}`;
  }
  const todayprofit = calculateProfitPercentage(PurchaseAmount + todayExpenseAmount, SalesAmount);
  const monthPorfit = calculateProfitPercentage(purchaseMonthlyAmount + MonthlyExpenseAmount, MonthlySaleAmount)



  return (
    <div className='w-full flex flex-col items-center py-6 px-6 gap-4'>
      <DashboardHeader title='Dashboard' subtitle='Business analatics' />
      <div className="flex justify-evenly w-full gap-6 flex-wrap">
        <SaleAmount title="Today Sale Amount" amount={SalesAmount || 0} path="/sales/sales-list" />
        <SaleAmount title="Monthly Sale Amount" amount={MonthlySaleAmount || 0} path="/sales/sales-list" />

      </div>
      <div className="flex justify-evenly w-full gap-6 flex-wrap">
        <SaleAmount title="Today Purchase Amount" amount={PurchaseAmount || 0} path="/purchases/purchase-list" />
        <SaleAmount title="Monthly Purchase Amount" amount={purchaseMonthlyAmount || 0} path="/purchases/purchase-list" />

      </div>
      <div className="flex justify-evenly w-full gap-6 flex-wrap">
        <SaleAmount title="Today Expense Amount" amount={todayExpenseAmount || 0} path="/expenses/list" />
        <SaleAmount title="Monthly Expense Amount" amount={MonthlyExpenseAmount || 0} path="/expenses/list" />

      </div>
      <div className="flex w-full justify-evenly items-center flex-wrap">
        <ProductCount title='Today sales Count' count={todaySaleCount} subtitle='Today Sale' dec={`${todayprofit} of Today`} />
        <ProductCount title='This Month Sales Count' count={monthlySaleCount} subtitle='This Month Sale' dec={`${monthPorfit} of from overall month`} />
      </div>
      {/*  <div className="flex items-center justify-center w-full py-2">
        <div className="sm:w-[82%] w-full h-[200px] border bg-gray-200 rounded-[30px]"></div>
      </div> */}
    </div>
  )
}

export default page

const SaleAmount = ({ title, amount, path }: { title: String, amount: number, path: string }) => {
  return (
    <div className="sm:w-[400px] w-full p-2  shadow-gray-200 rounded-[20px] shadow-[inset_0px_0px_4px_1px] ">
      <div className='flex items-center justify-between' >
        <div className="min-w-[100px] px-2 min-h-[100px] border rounded-[20px] font-bold flex items-center justify-center text-4xl text-[--primary]">
          {
            amount >= 1000 ? Math.floor(amount / 1000 * 100) / 100 + "k" : "₹" + Math.floor(amount * 100) / 100
          }
        </div>
        <h2 className='text-gray-700 px-4 text-lg'>{title}</h2>
      </div>
      <div className='w-full flex justify-center'>
        <Link href={path} className='text-center'>Know More</Link>
      </div>
    </div>
  )
}

const ProductCount = ({ title, count, subtitle, dec }: { title: string, count: number, subtitle: string, dec: string }) => {
  return (
    <div className="relative flex flex-col justify-end items-center h-[220px] sm:w-fit w-full sm:px-0 px-3">
      <div className="relative sm:w-[400px] w-full h-[180px] flex items-end justify-center rounded-[30px] bg-gray-100  shadow-[inset_0px_0px_1px_2px] shadow-gray-200">
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
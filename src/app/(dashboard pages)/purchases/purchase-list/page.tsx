'use client'
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import List from '@/app/components/sales-pur/list'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const page = () => {

  const Customer = [
    "Deepath",
    "Hari",
    "Deepath",
    "Deepath",
    "Deepath",
  ]


  const [from, setFrom] = useState<Date>(new Date);
  const [end, setEnd] = useState<Date>(new Date);

  const fetchPurchase = async () => {
    const response = await axios.put('/api/purchase', {

      data: {
        header: "getPurchase",
        from: from,
        end: end
      }

    })
    console.log(response.data);
    return response.data

  }

  const { data, mutate } = useSWR("/api/purchase", fetchPurchase)
  useEffect(() => {
    mutate();
  })
  console.log(data);




  return (
    <div className='w-full px-10'>
      <DashboardHeader title="Purchasae" subtitle={"List"} />

      <List list={data ? data : []} mutate={mutate} path='new-purchase' page="Purchase" isReturn={false} setFrom={setFrom} setEnd={setEnd} from={from} end={end} />
    </div>
  )
}

export default page
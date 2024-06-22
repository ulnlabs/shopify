"use client"
import List from '@/app/components/sales-pur/list'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr';

const page = () => {


  const [from, setFrom] = useState<Date>(new Date);
  const [end, setEnd] = useState<Date>(new Date);


  const fetchPurchase = async () => {
    console.log(from.getHours());

    const response = await axios.put('/api/purchase', {

      data: {
        header: "getReturn",
        from: from,
        end: end
      }

    })
    return response.data
  }
  const { data: purchaseData, mutate, isLoading } = useSWR("/api/purchase", fetchPurchase)

  useEffect(() => {
    mutate()
  }, [from, end])
  return (
    <div className='w-full px-10'>
      <h1>Purchase Return List</h1>
      <List list={purchaseData ? purchaseData : []} path='new-purchase' page="Purchase" setFrom={setFrom} setEnd={setEnd} from={from} mutate={mutate} end={end} />

    </div>
  )
}

export default page
'use client'
import List from '@/app/components/sales-pur/list'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const page = () => {
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
    return response.data
  }

  const { data: purchaseData, mutate } = useSWR("/api/purchase", fetchPurchase)

  useEffect(() => {
    mutate()
  }, [from, end])

  return (
    <div className='w-full px-10'>
      <h1>Purchase List</h1>
      {/* {isLoading && <div>Loading...</div>} */}
      <List list={purchaseData ? purchaseData : []} mutate={mutate} isReturn={false} path='new-purchase' page="Purchase" setFrom={setFrom} setEnd={setEnd} from={from} end={end} />
    </div>
  )
}

export default page
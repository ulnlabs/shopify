'use client'
import List from '@/app/components/sales-pur/list'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {

  const Customer = [
    "Deepath",
    "Hari",
    "Deepath",
    "Deepath",
    "Deepath",
  ]
  const [purchaseList, setPurchaseList] = useState<any[]>([])

  const [from, setFrom] = useState<Date>(new Date);
  const [end, setEnd] = useState<Date>(new Date);
  useEffect(() => {
    const fetchSales = async () => {
      console.log(from.getHours());

      const response = await axios.put('/api/purchase', {

        data: {
          header: "getPurchase",
          from: from,
          end: end
        }

      })
      setPurchaseList(response.data);
      console.log(response.data);
    }

    fetchSales();
  }, [from, end])


  return (
    <div className='w-full px-10'>
      <h1>Purchase List</h1>
      <List list={purchaseList} Customer={Customer} path='new-purchase' page="Purchase" setFrom={setFrom} setEnd={setEnd} from={from} end={end}  />
    </div>
  )
}

export default page
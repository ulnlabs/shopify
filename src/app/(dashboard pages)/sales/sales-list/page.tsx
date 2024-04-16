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
  const [salesList, setSalesList] = useState<any[]>([])
  useEffect(() => {
    const fetchSales = async () => {
      const response = await axios.put('/api/sales', {
       /*  headers: {
          data: "getSales"
        } */

        data:{
          header : "getSales",
          from:from,
          end:end
        }

      })
      setSalesList(response.data)
      console.log(response.data);
    }

    fetchSales();
  }, [])


  const [from, setFrom] = useState<Date>(new Date);
  const [end, setEnd] = useState<Date>(new Date);
  
  return (
    <div className='w-full px-10'>
      <h1>Sales List</h1>
      <List list={salesList} Customer={Customer} path='new-sales' page="Sales" setFrom = {setFrom} setEnd={setEnd} from={from} end={end} isSales={true} />
    </div>
  )
}

export default page
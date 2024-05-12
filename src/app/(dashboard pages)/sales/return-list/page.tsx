"use client"
import List from '@/app/components/sales-pur/list'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = () => {

  const [returnList, setReturnList] = useState<any[]>([])

  const [from, setFrom] = useState<Date>(new Date);
  const [end, setEnd] = useState<Date>(new Date);
  useEffect(() => {
    const fetchSales = async () => {
      console.log(from.getHours());

      const response = await axios.put('/api/sales', {

        data: {
          header: "getReturn",
          from: from,
          end: end
        }

      })
      setReturnList(response.data);
      console.log(response.data);
    }

    fetchSales();
  }, [from, end])
  return (
    <div className='w-full px-10'>
      <h1>Sales Return List</h1>
      <List list={returnList}  path='new-sales' page="Sales" setFrom={setFrom} setEnd={setEnd} from={from} end={end} isSales={true} />

    </div>
  )
}

export default page
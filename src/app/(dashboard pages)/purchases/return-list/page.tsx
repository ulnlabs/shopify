"use client"
import List from '@/app/components/sales-pur/list'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = () => {

  const [returnList, setReturnList] = useState<any[]>([])

  const [from, setFrom] = useState<Date>(new Date);
  const [end, setEnd] = useState<Date>(new Date);
  useEffect(() => {
    const fetchPurchase = async () => {
      console.log(from.getHours());

      const response = await axios.put('/api/purchase', {

        data: {
          header: "getReturn",
          from: from,
          end: end
        }

      })
      setReturnList(response.data);
      console.log(response.data);
    }

    fetchPurchase();
  }, [from, end])
  return (  
    <div className='w-full px-10'>
      <h1>Purchase Return List</h1>
      <List list={returnList} path='new-purchase' page="Purchase" setFrom={setFrom} setEnd={setEnd} from={from} end={end} />

    </div>
  )
}

export default page
"use client"
import DashboardHeader from '@/app/components/dashboard/DashboardHeader';
import List from '@/app/components/sales-pur/list'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';


const page = () => {


  const [from, setFrom] = useState<Date>(new Date);
  const [end, setEnd] = useState<Date>(new Date);

  const fetchSales = async () => {
    console.log(from.getHours());

    const response = await axios.put('/api/sales', {

      data: {
        header: "getReturn",
        from: from,
        end: end
      }

    })

    return response.data
  }


  const { data, mutate } = useSWR("/api/sales", fetchSales)

  useEffect(() => {
    mutate();
  }, [from, end])

  return (
    <div className='w-full px-10'>
      <DashboardHeader title="Sales" subtitle={"Return List"} />
      <List list={data ? data : []} mutate={mutate} path='new-sales' page="Sales" setFrom={setFrom} setEnd={setEnd} from={from} end={end} isReturn={true} isSales={true} />

    </div>
  )
}

export default page
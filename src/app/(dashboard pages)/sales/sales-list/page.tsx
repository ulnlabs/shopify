'use client'
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import List from '@/app/components/sales-pur/list'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const page = () => {


  const [from, setFrom] = useState<Date>(new Date);
  const [end, setEnd] = useState<Date>(new Date);

  const fetchSales = async () => {
    console.log(from.getHours());

    const response = await axios.put('/api/sales', {

      data: {
        header: "getSales",
        from: from,
        end: end
      }

    })
    console.log(response.data);

    return response.data
  }

  const { data: salesList, mutate } = useSWR('/api/sales', fetchSales);

  useEffect(() => {

    mutate()
  }, [from, end])





  return (
    <div className='w-full px-10'>
      <DashboardHeader title="Sales" subtitle={"List"} />
      <List list={salesList ? salesList : []} path='new-sales' page="Sales" mutate={mutate} setFrom={setFrom} setEnd={setEnd} from={from} end={end} isReturn={false} isSales={true} />
    </div>
  )
}

export default page
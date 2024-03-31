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
  const [salesList,setSalesList] = useState<any[]>([])
  useEffect(()=>{
    const fetchSales = async () => {
     const response = await axios.get('/api/sales',{
        headers:{
          data:"getSales"
        }
      })
      setSalesList(response.data)
      console.log(response.data);
      
    }

    fetchSales();
  },[])

  return (
    <div className='w-full px-10'> 
        <h1>Sales List</h1>
        <List list={salesList} Customer={Customer} path='new-sales' page="Sales" isSales={true} />
    </div>
  )
}

export default page
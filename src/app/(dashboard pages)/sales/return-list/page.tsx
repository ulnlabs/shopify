import List from '@/app/components/sales-pur/list'
import React from 'react'

const page = () => {
  const Customer = [
    "Deepath",
    "Hari",
    "Deepath",
    "Deepath",
    "Deepath",
]
  return (
    <div className='w-full px-10'> 
        <h1>Sales Return List</h1>
        <List Customer={Customer} path='/new-return' page="Sales Return" isSales />
    </div>
  )
}

export default page
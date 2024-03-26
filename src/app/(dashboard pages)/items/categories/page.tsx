import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React from 'react'
import { DataTable } from './data-table';
import { COLUMNS_DATA, InventoryItem } from './columns';


function page() {
  const exampleData: InventoryItem[] = [
    {
      select: false,
      category: 'Electronic Devices',
      categoryName:'mobiles',
      code:'CO094',
      description:'MOBILE',
      status:'Active'
    },
    // Add more sample data here
  ];
  return (
    <div className='w-full px-2 py-4'>
      <DashboardHeader title='Items List'/>
      <div className="py-4 px-2">
        <DataTable columns={COLUMNS_DATA} data={exampleData} filter={true} />
      </div>
    </div>
  )
}

export default page
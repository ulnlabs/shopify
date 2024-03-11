import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'

function page() {
  return (
    <div className='w-full h-full px-4 py-2'>
      <DashboardHeader title='Sales Invoice' breadcrumb={[{ title: "new-sales", path: '/sales/new-sales' }, { title: 'pos', path: '/sales/pos' }]} />
      <div className="flex justify-between">
        <div className="w-1/2 h-full">
          <div className="flex item-center justify-between">
            <div className="flex items-center">
              <AiOutlineUser />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
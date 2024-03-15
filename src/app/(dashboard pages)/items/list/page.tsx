import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React from 'react'

function page() {
    return (
        <div className='w-full p-4'>
            <div className="py-1">
                <DashboardHeader title='Items List' subtitle='View/Search Items' breadcrumb={[{ title: 'item List', path: '/items/list' }]} />
                <div className="grid"></div>
            </div>
        </div>
    )
}

export default page
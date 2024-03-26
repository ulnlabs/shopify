"use client"
import { Selector } from '@/app/components/Custom-shadcn-components/Selector'
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import React, { useState } from 'react'

type Props = {}

function page({ }: Props) {
    const [userRole, setUserRole] = useState<string>("");

    return (
        <div className='w-full py-4 px-4'>
            <DashboardHeader title='Add User' subtitle='Enter User Information' breadcrumb={[{ title: 'Dashboard', path: '/dashboard' }, { title: 'view users', path: '/users/list' }, { title: 'create user', path: '/users/new' }]} />
            <div className="w-full mt-4 border-t-2 border-[--primary] rounded-lg py-2 lg:px-2 shadow">
                <form action="" className='w-full flex flex-col items-center justify-center' method="post">
                    <div className="flex gap-4 flex-col w-full items-center justify-center p-4">
                        <div className="lg:col-start-2 col-start-1 row-start-1 flex flex-col items-center gap-4 justify-center">
                            <input type="file" name="" id="" />
                            <div className="h-[200px] w-[200px] border rounded-full bg-white "></div>
                        </div>
                        <div className="grid lg:col-start-1 grid-cols-4 grid-rows-6 gap-4">
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left' htmlFor="username">User Name <span className='text-red-400'>*</span></label>
                            <input id='username' type="text" className='col-start-3 lg:col-span-3 col-span-4 py-1 px-2 rounded border outline-none' />
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left' htmlFor="phnum">Phone Number <span className='text-red-400'>*</span></label>
                            <input id='phnum' type="tel" className='col-start-3 lg:col-span-3 col-span-4 py-1 px-2 rounded border outline-none' />
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left' htmlFor="email">Email <span className='text-red-400'>*</span></label>
                            <input id='email' type="email" className='col-start-3 lg:col-span-3 col-span-4 py-1 px-2 rounded border outline-none' />
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left' htmlFor="role">role<span className='text-red-400'>*</span></label>
                            <div className="col-start-3 lg:col-span-3 col-span-4">
                                <Selector commonTitle='select role' changeState={setUserRole} currentstate={userRole} data={["admin", "user", "client"]} />
                            </div>
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left' htmlFor="password">Password <span className='text-red-400'>*</span></label>
                            <input id='password' type="password" className='col-start-3 lg:col-span-3 col-span-4 py-1 px-2 rounded border outline-none' />
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left whitespace-nowrap' htmlFor="conformpassword">Conform Password <span className='text-red-400'>*</span></label>
                            <input id='conformpassword' type="password" className='col-start-3 lg:col-span-3 col-span-4 py-1 px-2 rounded border outline-none' />
                        </div>
                    </div>
                    <div className="h-fit w-full py-4 flex items-center justify-center gap-4">
                        <button className='w-[200px] py-1 text-white bg-green-400 rounded'>Save User</button>
                        <button className='w-[200px] py-1 text-white bg-red-400 rounded'>close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page
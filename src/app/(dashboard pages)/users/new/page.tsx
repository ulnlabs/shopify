"use client"
import { Selector } from '@/app/components/Custom-shadcn-components/Selector'
import DashboardHeader from '@/app/components/dashboard/DashboardHeader'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Flip, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
type Props = {}

interface userDatatype {
    username?: string | '';
    phoneno?: string;
    email?: string | '';
    role?: string;
    password?: string;
    conformpass?: string;
    status?: 'active'
}


function page({ }: Props) {
    const [userRole, setUserRole] = useState<string>("");
    const [userdata, setUserDate] = useState<userDatatype | null>();
    const [profile, setProfile] = useState<string>();
    const router = useRouter()
    const eventHander = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!userdata?.username && !userdata?.email && !userdata?.password && !userdata?.phoneno && !userdata?.role && !userdata?.conformpass) {
            toast.warn("please fill all fields");
            return
        }
        setUserDate({ ...userdata, role: userRole });
        if (userdata?.password != userdata?.conformpass) {
            toast.error("password not mached!")
            return
        }
        const req = await fetch('/api/user/exist', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: userdata?.username, email: userdata?.email })
        })
        const response = await req.json()
        if (req.status == 400) {
            toast.warn(response?.msg, { transition: Flip });
            return
        }
        const postacc = await fetch('/api/user/adduser', {
            method: 'POST',
            body: JSON.stringify(userdata)
        })
        if (postacc.status == 200) {
            toast.success('New User Added');
            setUserDate({})
            return
        }
        toast.error('Something Went Wrong!');
        return
    }
    return (
        <div className='w-full py-4 px-4'>
            <DashboardHeader title='Add User' subtitle='Enter User Information' breadcrumb={[{ title: 'Dashboard', path: '/dashboard' }, { title: 'view users', path: '/users/list' }, { title: 'create user', path: '/users/new' }]} />
            <ToastContainer theme='light' position='top-right' autoClose={5000} closeOnClick />
            <div className="w-full mt-4 border-t-2 border-[--primary] rounded-lg py-2 lg:px-2 shadow">
                <form onSubmit={(e) => eventHander(e)} action="" className='w-full flex flex-col items-center justify-center' method="post">
                    <div className="flex gap-4 flex-col w-full items-center justify-center p-4">
                        <div className="grid lg:col-start-1 grid-cols-4 grid-rows-6 gap-4">
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left' htmlFor="username">User Name <span className='text-red-400'>*</span></label>
                            <input onChange={(e) => setUserDate({ ...userdata, username: e.target.value })} id='username' type="text" className='col-start-3 lg:col-span-3 col-span-4 py-1 px-2 rounded border outline-none' />
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left' htmlFor="phnum">Phone Number <span className='text-red-400'>*</span></label>
                            <input onChange={(e) => setUserDate({ ...userdata, phoneno: e.target.value })} id='phnum' type="tel" className='col-start-3 lg:col-span-3 col-span-4 py-1 px-2 rounded border outline-none' />
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left' htmlFor="email">Email <span className='text-red-400'>*</span></label>
                            <input onChange={(e) => setUserDate({ ...userdata, email: e.target.value })} id='email' type="email" className='col-start-3 lg:col-span-3 col-span-4 py-1 px-2 rounded border outline-none' />
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left' htmlFor="role">role<span className='text-red-400'>*</span></label>
                            <div className="col-start-3 lg:col-span-3 col-span-4">
                                <Selector commonTitle='select role' changeState={setUserRole} currentstate={userRole} data={["admin", "worker"]} />
                            </div>
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left' htmlFor="password">Password <span className='text-red-400'>*</span></label>
                            <input onChange={(e) => setUserDate({ ...userdata, password: e.target.value })} id='password' type="password" className='col-start-3 lg:col-span-3 col-span-4 py-1 px-2 rounded border outline-none' />
                            <label className='col-start-1 col-span-1 whitespace-nowrap text-left whitespace-nowrap' htmlFor="conformpassword">Conform Password <span className='text-red-400'>*</span></label>
                            <input onChange={(e) => setUserDate({ ...userdata, conformpass: e.target.value })} id='conformpassword' type="password" className='col-start-3 lg:col-span-3 col-span-4 py-1 px-2 rounded border outline-none' />
                        </div>
                    </div>
                    <div className="h-fit w-full py-4 flex items-center justify-center gap-4">
                        <button className='w-[200px] py-1 text-white bg-green-400 rounded'>Save User</button>
                        <button onClick={() => router.back()} className='w-[200px] py-1 text-white bg-red-400 rounded'>close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page
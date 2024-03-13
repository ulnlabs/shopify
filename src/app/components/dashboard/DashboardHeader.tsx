'use client'
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'
import { Slash } from 'lucide-react'
export type BreadcrumbType = {
    title: string,
    path: string
}
interface breadcrumbdata {
    title: string,
    subtitle?: string,
    breadcrumb?: BreadcrumbType[]
}

function DashboardHeader({ title, subtitle, breadcrumb }: breadcrumbdata) {
    const pathname = usePathname()
    const patharray: string[] = pathname.split('/')
    return (
        <div className='w-full h-[20px] px-2 flex justify-between items-center'>
            <div className="flex items-center gap-2">
                <h1 className='md:text-lg text-md font-semibold'>{title}</h1>
                <p className='text-[10px] font-light'>{subtitle ? subtitle : ""}</p>
            </div>
            <div className="">
                <Breadcrumb>
                    <BreadcrumbList className='md:flex hidden items-center justify-center'>
                        {
                            breadcrumb?.map((item: any, i) => {
                                return (
                                    <span className='flex items-center' key={i}>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href={item?.path}>{item?.title}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </span>
                                )
                            })
                        }
                    </BreadcrumbList>
                </Breadcrumb>

            </div>
        </div>
    )
}

export default DashboardHeader
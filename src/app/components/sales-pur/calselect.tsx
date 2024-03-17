"use client"
import { Calendar } from '@/components/ui/calendar'
import { format } from "date-fns"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'

interface dateType {
    date: Date,
}

const CalenSelect = ({ date, setDate }: any) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleDateClick = (label: any): void => {
        console.log(label);

    }

    return (
        <div>

            <div className="flex  py-1 text-w bg-primary-gray px-2 rounded-lg border items-center cursor-pointer "
                onClick={() => { setIsOpen(!isOpen) }}>
                <AiOutlineCalendar className="mr-2  h-4 w-4 shrink-0  opacity-50" />
                <Input placeholder='Select Customer' value={date ? format(date, "PPP") : ''} readOnly onClick={() => {
                    setIsOpen(!isOpen)
                }} className="  cursor-pointer " />
            </div>
            {
                isOpen && (
                    <div className="z-10 absolute mt-2 bg-white rounded-lg border  ">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </div>
                )
            }
        </div>
    )
}

export default CalenSelect
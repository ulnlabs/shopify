"use client"
import { Calendar } from '@/components/ui/calendar'
import { format } from "date-fns"
import { Input } from '@/components/ui/input'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'

interface dateType {
    date: Date,
}

const CalenSelect = ({ date, setDate }: dateType | any) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleDateClick = (label: any): void => {
        console.log(label);

        console.log(label);

        if (label) {
            console.log("d");
            setDate(label);
            setIsOpen(false);
        }
        else{
            setIsOpen(false);
        }
    }

    const calRef = useRef<any>(null)
    useEffect(() => {
        const handleClose = (e: any) => {
            if (!calRef.current?.contains(e.target)) {

                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClose)
    }, [])


    const today = new Date;
    return (
        <div className='relative' ref={calRef}>

            <div className="flex  py-1 text-w bg-primary-gray px-2 rounded-lg border items-center cursor-pointer "
                onClick={() => { setIsOpen(!isOpen) }}>
                <AiOutlineCalendar className="mr-2  h-4 w-4 shrink-0  opacity-50" />
                <Input placeholder='Select Customer' value={date ? format(date, "dd-MM-yyyy") : ''} readOnly onClick={() => {
                    setIsOpen(!isOpen)
                }} className="  cursor-pointer " />
            </div>
            {
                isOpen && (
                    <div className="z-10 absolute  bg-white rounded-lg border  ">
                        <Calendar
                            mode="single"
                            toDate={today}
                            fixedWeeks
                            selected={date}
                            onSelect={handleDateClick}
                            initialFocus
                        />
                    </div>
                )
            }
        </div>
    )
}


export default CalenSelect
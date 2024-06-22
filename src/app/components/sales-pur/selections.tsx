import { MdArrowDropDown } from "react-icons/md";
import React, { useState, SetStateAction, Dispatch, useRef, useEffect } from 'react'

import { IoMdContact } from 'react-icons/io'
import { Input } from '@/components/ui/input'

import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"



interface selectionProp {
    label?: string,
    setLabel: Dispatch<SetStateAction<string>>,
    placeholder?: string,
    inputData: any,
    icon?: boolean,
    payment?: boolean,
    id?: string
}

const Selections = ({ label, setLabel, placeholder, inputData, icon, payment, id }: selectionProp) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectRef = useRef<null | any>(null)

    useEffect(() => {
        const handleClose = (e: any) => {
            if (!selectRef.current?.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClose)
    })
    const handleStatusClick = (item: any): void => {
        setLabel(item.value);
        setIsOpen(!isOpen);
    }

    return (
        <div ref={selectRef} className="relative">
            <div className="bg-primary-gray py-1 rounded-lg px-2">

                <div className={` flex items-center ${icon ? "bg-primary-gray" : "bg-white border"}   rounded-md cursor-pointer `} onClick={() => { setIsOpen(!isOpen) }} >
                    {icon &&
                        <IoMdContact className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    }
                    <Input placeholder={placeholder}
                        id={id}
                        value={"" || label}
                        className={`${icon ? "border" : " border-none"} cursor-pointer`}
                        readOnly />
                    {!icon &&
                        <MdArrowDropDown className="mr-2 h-6 w-6 ml-2 shrink-0 opacity-50" />

                    }
                </div>
            </div>
            {
                isOpen && (
                    <div className={`z-10 absolute w-full ${!icon ? "px-2" : "py-1"} ${payment ? "py-1" : ""} `}>
                        <Command className="rounded-lg border bg-white py-1  ">
                            <CommandList>
                                <CommandGroup>
                                    {inputData.map((item: any, index: any) => (
                                        <CommandItem key={index}
                                            className="cursor-pointer px-2 py-1  rounded-md"
                                            onSelect={() => { handleStatusClick(item) }}
                                        >
                                            {item.value}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                )
            }
        </div>
    )
}

export default Selections

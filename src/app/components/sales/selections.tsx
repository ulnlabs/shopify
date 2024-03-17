import { MdArrowDropDown } from "react-icons/md";
import React, { useState, SetStateAction, Dispatch } from 'react'

import { IoMdContact } from 'react-icons/io'
import { Input } from '@/components/ui/input'

import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"



interface selectionProp {
    cValue?: string,
    setCValue: Dispatch<SetStateAction<string>>,
    placeholder?: string,
    inputData: string[],
    icon?: boolean,
    payment?: boolean,

}

const Selections = ({ cValue, setCValue, placeholder, inputData, icon, payment }: selectionProp, className: string) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);



    const handleStatusClick = (label: string): void => {
        setCValue(label);
        setIsOpen(!isOpen);
    }


    return (
        <div>
            <div className="bg-primary-gray py-1 rounded-lg px-2">

                <div className={` flex items-center ${icon ? "bg-primary-gray" : "bg-white"}  border rounded-md cursor-pointer `} onClick={() => { setIsOpen(!isOpen) }} >
                    {icon &&
                        <IoMdContact className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    }
                    <Input placeholder={placeholder}
                        value={"" || cValue}
                        className="border-none cursor-pointer"
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
                             <CommandGroup>                               {inputData.map((item, index) => (
                                    <CommandItem key={index}
                                        className="cursor-pointer px-2 py-1  rounded-md"
                                        onSelect={() => { handleStatusClick(item) }}
                                    >
                                        {item}
                                    </CommandItem>
                                ))}
                                </CommandGroup> 
 
                            </CommandList>
                        </Command>
                    </div>
                )
            }    </div>
    )
}

export default Selections

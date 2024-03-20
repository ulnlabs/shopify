import React, { useState, SetStateAction, Dispatch, useRef,useEffect } from 'react'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import { Input } from '@/components/ui/input';
import { MdArrowDropDown } from 'react-icons/md';

interface searchType {
    value?: string,
    setValue: Dispatch<SetStateAction<string>>,
    placeholder?: string,
    inputData: string[],
    searchPlaceholder?: string,
    className?:string,
}

const SearchSelect = ({ value, setValue, inputData, placeholder, searchPlaceholder,className }: searchType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleClick = (label: string) => {
        setValue(label);
        setIsOpen(false);
    }

    const selRef=useRef<any>()
    useEffect(()=>{
        const handleClose = (e:any) =>{
            if (!selRef.current?.contains(e.target)){
                setIsOpen(false)
            }
        }
        document.addEventListener('click',handleClose)
    },[])

    return (
        <div ref={selRef} className='relative'>
            
            <div className="  py-1 rounded-lg">
                <div className={`  px-2 py-1  border-none rounded-md cursor-pointer `} onClick={() => { setIsOpen(!isOpen) }} >
                    <div className='flex items-center rounded-md bg-primary-gray'>
                        <Input placeholder={placeholder}
                            value={"" || value}
                            className={`border-none bg-primary-gray cursor-pointer ${className}`}
                            readOnly />
                        <MdArrowDropDown className="mr-2 h-6 w-6 ml-2 shrink-0 opacity-50" />
                    </div>
                </div>
            </div>
            {
                isOpen && (
                    <div className={`z-10 absolute px-2 `}>
                        <Command className="rounded-lg border shadow-md">
                            <CommandInput placeholder={searchPlaceholder || " Type a Search "} />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {
                                        inputData.map((item: any) => (
                                            <CommandItem
                                                className="cursor-pointer bg-white px-2 py-1  rounded-md"
                                                onSelect={() => { handleClick(item) }}
                                            >
                                                {item}
                                            </CommandItem>
                                        ))
                                    }
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                )
            }

            
        </div>
    )
}

export default SearchSelect
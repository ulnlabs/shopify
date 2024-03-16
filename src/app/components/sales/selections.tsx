import React, { useState, SetStateAction, Dispatch } from 'react'

import { IoMdContact } from 'react-icons/io'
import { Input } from '@/components/ui/input'



interface selectionProp {
    cValue?: string,
    setCValue: Dispatch<SetStateAction<string>>,
    placeholder?: string,
    inputData: string[],

}

const Selections = ({ cValue, setCValue, placeholder, inputData }: selectionProp, className: string) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);



    const handleStatusClick = (label: string): void => {
        setCValue(label);
        setIsOpen(!isOpen);
    }


    return (
        <div>
            <div className={"flex items-center bg-primary-gray border py-1 px-2 rounded-lg" +className} >
                <IoMdContact className="mr-2 h-4 w-4 shrink-0  opacity-50" />
                <Input placeholder={placeholder}
                    value={"" || cValue}
                    onClick={() => { setIsOpen(!isOpen) }}
                    className=" cursor-pointer " readOnly />
            </div>
            {
                isOpen && (
                    <div className="z-10 absolute w-full mt-2 ">
                        <ul className="rounded-lg border bg-white ">
                                    {inputData.map((item, index) => (
                                        <li key={index}
                                            className="cursor-pointer"
                                            onClick={() => {handleStatusClick(item)}}
                                        >
                                            {item}
                                        </li>
                                    ))}
                            
                        </ul>
                    </div>
                )
            }    </div>
    )
}

export default Selections

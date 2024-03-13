"use client"
import { Dispatch, SetStateAction, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export type SelectorProps = {
    currentstate: string;
    data: string[];
    commonTitle: string;
    changeState: Dispatch<SetStateAction<string>>
}

export const Selector = ({ data, changeState, currentstate, commonTitle }: SelectorProps) => {
    const [opener, setOpener] = useState<boolean>(false);
    return (
        <Popover open={opener} onOpenChange={setOpener}>
            <PopoverTrigger className='border rounded-lg w-full flex items-center justify-between p-2 py-2'><p>{currentstate ? currentstate : commonTitle}</p>{opener ? <AiFillCaretUp /> : <AiFillCaretDown />}</PopoverTrigger>
            <PopoverContent className='w-full px-4'>
                <Command className="min-w-full">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandItem onSelect={() => {
                            changeState("")
                            setOpener(false)
                        }}>{commonTitle}</CommandItem>
                        {
                            data.map((item, index) => {
                                return (
                                    <CommandItem onSelect={() => {
                                        changeState(item)
                                        setOpener(false)
                                    }} key={index}>{item}</CommandItem>
                                )
                            })
                        }
                    </CommandList>
                </Command>

            </PopoverContent>
        </Popover>
    )
}
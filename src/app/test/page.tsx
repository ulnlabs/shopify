"use client"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useState } from "react"

export function PopoverDemo() {
    const [data, setData] = useState<string>("")
    const [openList, setOpenList] = useState<boolean | undefined>(false)
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Popover open={openList} onOpenChange={setOpenList}>
                <PopoverTrigger asChild className="w-[200px]">
                    <Button variant="outline">{data ? data : "Open popover"}</Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <div className="grid gap-4">
                        <Command className="w-full">
                            <CommandInput placeholder="Type a command or search..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandItem onSelect={() => {
                                    setData("dd")
                                    setOpenList(false)
                                }} className="text-red-800 cursor-pointer">Profile</CommandItem>
                                <CommandItem onSelect={() => { setData("data 3"); setOpenList(false) }} className="text-gray-800 cursor-pointer">Settings</CommandItem>
                            </CommandList>
                        </Command>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default PopoverDemo
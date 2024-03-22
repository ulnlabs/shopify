
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const data = [
    {
        unitname: " Unit",
        description: "Unit description",
        status: "Active",
        action: "Action"
    },
    {
        unitname: " Packets",
        description: "Packet description",
        status: "Active",
        action: "Action"
    },
    {
        unitname: " Grems",
        description: "Grems description",
        status: "Active",
        action: "Action"
    },
    {
        unitname: " Pieces",
        description: "Pieces description",
        status: "Active",
        action: "Action"
    },
    {
        unitname: " Drums",
        description: "Drums description",
        status: "Active",
        action: "Action"
    },



]


function Unitlist() {
    return (
        <div className="">
            <div className=" bg-[var(--settings)] h-screen ">
                <div className=" p-4 w-full ">
                    <h1 className='text-lg tracking-[.2rem] font-medium'>Unit List <span className=' text-xs text-gray-500'>View/Search Unit</span></h1>
                </div>
                <div className="mx-auto w-[95%]">
                    <div className=" border-t-2 border-violet-500 bg-white  rounded-md">

                        <div className="flex justify-between p-3">
                            <h1 className='text-sm tracking-[.2rem]'>Unit List</h1>
                            <button type='submit' className='p-1 bg-[var(--button)] rounded-md text-white text-sm' > + New Unit</button>
                        </div>
                        <div className="flex justify-between p-2">
                            <div className=""></div>
                            <div className="flex gap-2 ">
                                <label htmlFor="" className='text-sm'>
                                    Search :
                                </label>
                                <input type="text" className='border w-[10rem] rounded-sm border-gray-3' />
                            </div>
                        </div>
                        <div className=" ">

                        <div className=" w-[95%] mx-auto p-2 pb-8 border rounded-t-md ">
                            <Table className='border rounded-t-md '>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Unit Name</TableHead>
                                        <TableHead className="w-[250px]" >Description</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead >Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    
                                         {data.map((item, index) => (
                                            <TableRow>
                                                <TableCell key={index}>{item.unitname}</TableCell>
                                                <TableCell key={index}>{item.description}</TableCell>
                                                <TableCell key={index}>{item.status}</TableCell>
                                                <TableCell key={index}>{item.action}</TableCell>
                                                </TableRow>

                                        ))}
                                    
                                   
                                       
                                   
                                </TableBody>
                            </Table>
                        </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Unitlist
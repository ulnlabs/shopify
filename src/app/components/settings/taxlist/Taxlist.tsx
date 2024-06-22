"use client"
import React, { use, useEffect } from 'react'
import { useState } from 'react';
import DataTable from "../datatableforsettings/DataTable"
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import AddTax from '../popup/AddTax';
import { AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import Edit from "@/app/components/settings/popup/Edit"
import { columnHeader_dataTable } from '../../../../../global';
 interface initial{
  id:number|null,
  taxname:string,
  taxpercentage:string
    
}
export const data  =
  [
    {
      id: 1,
      taxname: "SGST 9%",
      taxpercentage: "9.00"
    },
    {
      id: 2,
      taxname: "IGST 9%",
      taxpercentage: "9.00"
    },
    {
      id: 3,
      taxname: "SGST 4.5%",
      taxpercentage: "4.50"
    },
  ]
import axios from 'axios';
interface TaxType {
  taxId: String,
  taxName: String,
  taxPercentage: String,
  taxStatus: boolean

}


function Taxlist() {
  const [Tax, setTax] = useState<TaxType[]>([]);
  const [popup, setpopup] = useState<boolean | null>(false)
  const [edit, setEdit] = useState<boolean | null>(false)
  const [selectedTax, setSelectedTax] = useState<TaxType|null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/taxList");
        console.log("retuernData", response.data);
        if (response.data) {
          setTax(response.data.data);
          console.log(Tax);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const updateTaxStatus = async (taxId: string, status: boolean) => {

    try {
      const response = await axios.put('/api/taxList', {
        taxId,
        taxStatus: status
      });

      if (response.status === 200) {
        setTax(prevTax =>
          prevTax.map(tax =>
            tax.taxId === taxId ? { ...tax, taxStatus: status } : tax
          )
        );
      }
    } catch (error) {
      console.error("Error updating tax status:", error);
    }
  };


  const handleDelete = async (taxId: String) => {
    try {
      const response = await axios.delete('/api/taxList', {
        data: { taxId }
      });

      if (response.status === 200) {
        setTax(prevTax => prevTax.filter(tax => tax.taxId !== taxId));
        console.log("Tax deleted successfully:", response.data);
      }
    } catch (error) {
      console.error("Error deleting tax:", error);
    }
  };


  const handleEdit = async (taxId: string, taxName: string, taxPercentage: string,taxStatus:boolean) => {
    const taxData = { taxId, taxName, taxPercentage, taxStatus };
    setSelectedTax(taxData);
    setEdit(true);
  }
  const updateTax = async (taxId: String, updatedData: any) => {
    try {
      console.log(taxId, updatedData);
      
      const response = await axios.put('/api/taxList', {
        taxId,
        ...updatedData
      });

      if (response.status === 200) {
        setTax(prevTax =>
          prevTax.map(tax =>
            tax.taxId === taxId ? { ...tax, ...updatedData } : tax
          )
        );
      }
    } catch (error) {
      console.error("Error updating tax:", error);
    }
  };

  const Tax_percentage: columnHeader_dataTable = {
    accessorKey: "taxPercentage",
    header: "Tax(%)",
  };
  const Tax_name: columnHeader_dataTable = {
    accessorKey: "taxName",
    header: "Tax Name",
  };

  const C_SELECT = {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  };
  const status = {
    accessorKey: "taxStatus",
    cell: ({ row }: any) => {
      return (
        <button
          className={` ${row.original.taxStatus ? "bg-green-500 p-2 rounded-md text-white" : "bg-red-500 p-2 rounded-md text-white"}`}
          onClick={() => updateTaxStatus(row.original.taxId, !row.original.taxStatus)}
        >
          {row.original.taxStatus ? "Active" : "Inactive"}
        </button>
      )
    }
  };
  const C_ACTION = {
    accessorKey: "action",
    cell: ({ row }: any) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-9  bg-blue-300 p-2 rounded-md">
              <h1 className=" "> Action</h1>
              <BiCaretDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex justify-between" onClick={() => {
              setEdit(true);
              handleEdit(row.original.taxId, row.original.taxName, row.original.taxPercentage, row.original.taxStatus)


            }}>
              <h1>

                Edit
              </h1>
              <div className="">
                <RiEdit2Fill />
              </div>
            </DropdownMenuItem>


            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-between" onClick={() => {
              handleDelete(row.original.taxId);
            }}>
              <h1>

                Delete
              </h1>
              <div className="">
                <MdDelete className=" text-red-600" size={20} />
              </div>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
  const c_columns: ColumnDef<any>[] = [
    C_SELECT,
    Tax_name,
    Tax_percentage,
    status,
    C_ACTION,
  ];

  const user = (NewTax: TaxType) => {
    setTax([...Tax, NewTax as TaxType]);
    console.log("Tax data :", Tax);




  }



  return (
    <div className="relative ">
      <div className=" h-screen ">
        <AnimatePresence mode='wait'>
          {
            popup && <AddTax close={setpopup} dataset={user} /> || edit && <Edit close={setEdit} selectedTax={selectedTax} updatedData={updateTax} />
          }
        </AnimatePresence>
        <div className="mx-auto w-[95%]   mt-3">
          <div className=" border rounded-md p-2 ">

            <div className="flex justify-between items-center p-3">
              <h1 className='text-md tracking-[.2rem] font-extralight'>Tax List :-</h1>
              <button onClick={() => setpopup(true)} type='submit' className='px-1 font-normal rounded-md  text-black border  hover:bg-white text-sm' > <span className='text-lg'>+</span>Add Tax</button>
            </div>

            <div className=" ">
              <DataTable columns={c_columns} data={Tax} />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Taxlist



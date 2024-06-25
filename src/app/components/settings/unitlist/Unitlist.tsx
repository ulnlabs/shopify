"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import DataTable from "../datatableforsettings/DataTable"
import AddUnit from "@/app/components/settings/popup/Addunit"
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import Edit_Unit from "@/app/components/settings/popup/Edit_Unit"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { columnHeader_dataTable,customerList } from '../../../../../global';
import { ColumnDef } from "@tanstack/react-table";
import { AnimatePresence } from 'framer-motion';
interface UnitType {
  unitId: String,
  unitName: String,
  unitDescription: String,
  unitStatus: boolean

}

function Unitlist() {
  const [Unit, setUnit] = useState<UnitType[]>([]);
  const [popup, setpopup] = useState<boolean | null>(false)
  const [edit, setEdit] = useState<boolean | null>(false)
  const [selectedUnit, setSelectedUnit] = useState<UnitType | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/unitList");
        if (response.data) {
          setUnit(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const updateunitStatus = async (unitId: string, status: boolean) => {

    try {
      const response = await axios.put('/api/unitList', {
        unitId,
        unitStatus: status
      });

      if (response.status === 200) {
        setUnit(prevunit =>
          prevunit.map(unit =>
            unit.unitId === unitId ? { ...unit, unitStatus: status } : unit
          )
        );
      }
    } catch (error) {
      console.error("Error updating unit status:", error);
    }
  };


  const handleDelete = async (unitId: String) => {
    try {
      const response = await axios.delete('/api/unitList', {
        data: { unitId }
      });

      if (response.status === 200) {
        setUnit(prevunit => prevunit.filter(unit => unit.unitId !== unitId));
        console.log("unit deleted successfully:", response.data);
      }
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
  };


  const handleEdit = async (unitId: string, unitName: string, unitDescription: string, unitStatus: boolean) => {
    const unitData = { unitId, unitName, unitDescription, unitStatus };
    setSelectedUnit(unitData);
    setEdit(true);
  }
  
  const updateunit = async (unitId: String, updatedData: any) => {
    try {
      console.log(unitId, updatedData);

      const response = await axios.put('/api/unitList', {
        unitId,
        ...updatedData
      });

      if (response.status === 200) {
        setUnit(prevunit =>
          prevunit.map(unit =>
            unit.unitId === unitId ? { ...unit, ...updatedData } : unit
          )
        );
      }
    } catch (error) {
      console.error("Error updating unit:", error);
    }
  };


  const Unit_description: columnHeader_dataTable = {
    accessorKey: "unitDescription",
    header: "Description",
  };
  const Unit_name: columnHeader_dataTable = {
    accessorKey: "unitName",
    header: "Unit Name",
  };

  const status = {
    accessorKey: "unitStatus",
    cell: ({ row }: any) => {
      return (
        <button
          className={` ${row.original.unitStatus ? "bg-green-500 p-2 rounded-md text-white" : "bg-red-500 p-2 rounded-md text-white"}`}
          onClick={() => updateunitStatus(row.original.unitId, !row.original.unitStatus)}
        >
          {row.original.unitStatus ? "Active" : "Inactive"}
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
            <Button variant="ghost" className="h-9   bg-blue-300  rounded-md">
              <h1 className=" "> Action</h1>
              <BiCaretDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex justify-between" onClick={() => {
              setEdit(true);
              handleEdit(row.original.unitId, row.original.unitName, row.original.unitDescription, row.original.unitStatus)

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
              handleDelete(row.original.unitId);
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
    Unit_name,
    Unit_description,
    status,
    C_ACTION,
  ];

  const user = (NewUnit: UnitType) => {
    setUnit([...Unit, NewUnit as UnitType]);
    console.log("Unit data :", Unit);

  }


  return (
    <div className="">
      <div className=" h-screen ">
        <AnimatePresence mode="wait" >

          {popup && <AddUnit close={setpopup} dataset={user} /> || edit && <Edit_Unit close={setEdit} selectedunit={selectedUnit} updatedData={updateunit} />}
        </AnimatePresence>
        <div className="mx-auto w-[95%]  mt-3">
          <div className=" border p-3   rounded-md">
            <div className="flex justify-between items-center p-3">
              <h1 className='text-md tracking-[.2rem] font-extralight'>Unit List :-</h1>
              <button onClick={() => { setpopup(true) }} type='submit' className='px-1 font-normal rounded-md  text-black border  hover:bg-white text-sm' > <span className='text-lg'>+</span>Add Unit</button>
            </div>
            <div className=" ">
              <DataTable columns={c_columns} data={Unit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unitlist
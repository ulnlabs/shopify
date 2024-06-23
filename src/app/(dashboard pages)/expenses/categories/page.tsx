"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/app/components/datatable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { columnHeader_dataTable } from "../../../../../global";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
function List() {
  const [category, setCategory] = useState<any>([])
  const [updater, setUpdater] = useState<boolean>(false)
  const { toast } = useToast()
  useEffect(() => {
    axios.get("/api/expenses", {
      headers: {
        data: "get-category"
      }
    }).then((res) => setCategory(res.data)
    )
  }, [updater])
  const handleDelete = (row: any): void => {

    axios.delete("/api/expenses", {
      headers: {
        data: "delete-category"
      },
      data: { id: row._id },
    }).then((res) => {
      setUpdater(!updater);
      toast({
        title: "New PopUp !",
        description: "category is deleted"
      })
    }).catch((err) => {
      toast({
        title: "New PopUp !",
        description: "something went wrong",
      })
    })
  }
  const CATEGORY_NAME: columnHeader_dataTable = {
    accessorKey: "name",
    header: "Category Name",
  };
  const DESCRIPTION = {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }: any) =>{
const value:string=row.getValue("description")
if(value.length>0){
  return( <div>{value}</div>)
}
else{
  return <div className="ml-3">-</div>
}
    } 
  };
  const ACTION = {
    accessorKey: "Action",
    cell: ({ row }: any) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                handleDelete(row.original);
              }}
            >
              Delete category
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
  const listColumn: ColumnDef<any>[] = [
    CATEGORY_NAME,
    DESCRIPTION,
    ACTION,
  ];


  return (

    <>

      <div className="container mx-auto py-3">
        <DataTable
          columns={listColumn}
          data={category}
          column={false}
          filter={true}
          rows={true}
          paginater={true}
        />
      </div>
    </>
  );
}

export default List;

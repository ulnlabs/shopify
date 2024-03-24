"use client";
import { useState } from "react";
import csvDownload from 'json-to-csv-export'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { motion,AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  column?: boolean;
  filter?: boolean;
  rows?: boolean;
  paginater?: boolean;
}
import { useContext } from "react";
import { ContextData } from "../../../../contextapi";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { UserContext } from "@/UserContext";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export function DataTable<TData, TValue>({
  columns,
  data,
  column,
  filter,
  rows,
  paginater,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { selectedRow, setSelectedRow } = useContext(ContextData);
  const { isDeleted, setIsDeleted } = useContext(UserContext);
  const { toast } = useToast();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [veiw, setVeiw] = useState<tableVeiw>({
    column: column!,
    filter: filter!,
    rows: rows!,
    paginator: paginater!,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      rowSelection,
    },
  });

  const deleteCustomer = async (param: string) => {
    if (param == "rows") {
      try {
        const response = await axios.delete("/api/customers", {
          headers: { data: "deleterow" },
          data: selectedRow,
        });
        if (response.status == 200) {
          setIsDeleted(!isDeleted);
          toast({
            title: "New Message !",
            description: " Customer(s) is deleted successfully",
          });
          setSelectedRow([]);
        }
      } catch (error) {}
    }
  };
  const exportCsv=async ()=>{
  const custData=data.filter((item:any)=>{
    return selectedRow.includes(item._id)
  })
  const firstIndex=custData[0]
  const header=  Object.keys(firstIndex as string[])
  console.log(header);
  
   const dataToConvert = {
    data: custData,
    filename: 'customer-list',
    delimiter: ',',
    headers: header
  }
  csvDownload(dataToConvert)
  }


  /* here a small tip i like to filter email in the first div you can add your own filter make  your own logic by replace email by your ancestorkey */
  return (
    <>
      <div className="flex items-center py-4">
        {veiw.filter && (
          <Input
            placeholder="Search..."
            onChange={(event) => {
              table.setGlobalFilter(event.target.value);
              console.log(table.getColumn("mobile"));
            }}
            className="max-w-sm"
          />
        )}

        {veiw.column && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <AnimatePresence mode="wait">
        {selectedRow.length > 0 && (

      <motion.div  exit={{x:100,opacity:0}} animate={{x:0,opacity:1}} initial={{opacity:0,x:100}} transition={{duration:.5,type:"spring"}} className="flex justify-end h-16  gap-2">
          <Button variant={"outline"} onClick={() => deleteCustomer("rows")}>
            Delete
          </Button>
        <Button variant={"outline"} onClick={exportCsv}>Exoport CSV</Button>
      </motion.div>
        )}
        </AnimatePresence>
      <div className="rounded-md border">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-primary-gray">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                ></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {veiw.rows && (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      )}
      {veiw.paginator && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
/* at all you have your own data table to use your data table call this component like this on your code exam : page.tsx    <DataTable columns={c_columns} data={customerData} /> the c_colums is your column replace it with your and data also  for reference how i share my data see dashboard/customers/list/page.tsx ,i hope u got it  */

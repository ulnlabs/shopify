"use client";
import { useState } from "react";
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
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
import { AiFillCloseCircle } from "react-icons/ai";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
  column?: boolean;
  filter?: boolean;
  rows?: boolean;
  paginater?: boolean;
}

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
  /* here a small tip i like to filter email in the first div you can add your own filter make  your own logic by replace email by your ancestorkey */

  const [isBrandOpen, setIsBrandOpen] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const handleBackspace = () => {
    setSelectedBrand(prev => prev.slice(0, -1));
  };
  const handleChange = (e: any) => {
    setSelectedBrand(e.target.value);
  };

  return (
    <>
      <div className="flex items-center py-4">
        {veiw.filter && (
          <Input
            placeholder="Filter ItemName..."
            value={(table.getColumn("itemName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("itemName")?.setFilterValue(event.target.value)

            }
            className="max-w-sm"
          />
        )}
        {
          selectedBrand ?
            <div className="w-full ml-2 h-[40px] border rounded-lg flex justify-between px-4 items-center text-gray-700">
              <p>{selectedBrand}</p>
              <AiFillCloseCircle onClick={() => {setSelectedBrand("");
                table.setColumnFilters([])
              }} className="cursor-pointer" />
            </div> :
            <Command className="ml-3">
              <input placeholder="Type a command or search..." value={selectedBrand} onChange={handleChange} onClick={() => setIsBrandOpen(!isBrandOpen)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    handleBackspace();
                  }
                }} className="max-w-sm relative border px-[0.75rem] py-[0.42rem] border-gray-300 focus:outline-none rounded-md " />
              {isBrandOpen &&
                <CommandList className="absolute max-w-sm mt-9 w-fulltext-left  bg-white rounded-md border z-10 ">
                  {data!.map((item: any, index: any) => (
                    <CommandItem key={index} className="px-4 py-2 hover:bg-gray-100 border-b" value={item.brand} onSelect={() => {
                      setSelectedBrand(item.brand);
                      setIsBrandOpen(!isBrandOpen);
                      table.setColumnFilters([{ id: "brand", value: item.brand }])
                    }}>{item.brand}</CommandItem>
                  ))}
                </CommandList>}
            </Command>
        }
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
                      onCheckedChange={(value) =>
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

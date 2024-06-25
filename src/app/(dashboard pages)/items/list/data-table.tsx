"use client";
import { useState, useEffect, useRef } from "react";
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
import { tableVeiw } from "../../../../../global";

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
  const inputBrandRef = useRef<HTMLInputElement | null>(null);
  const dropdownBrandRef = useRef<HTMLDivElement | null>(null);
  const [isBrandOpen, setIsBrandOpen] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const inputCategoryRef = useRef<HTMLInputElement | null>(null);
  const dropdownCategoryRef = useRef<HTMLDivElement | null>(null);
  const handleChangeBrand = (e: any) => {
    setSelectedBrand(e.target.value);
  };
  const handleChangeCategory = (e: any) => {
    setSelectedCategory(e.target.value);
  };
  useEffect(() => {
    const handleClickOutsideBrand = (event: any) => {
      if (inputBrandRef.current && !inputBrandRef.current.contains(event.target as Node) &&
        dropdownBrandRef.current &&
        !dropdownBrandRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideBrand);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideBrand);
    };
  }, [inputBrandRef, dropdownBrandRef]);
  useEffect(() => {
    const handleClickOutsideCategory = (event: any) => {
      if (inputCategoryRef.current && !inputCategoryRef.current.contains(event.target as Node) &&
        dropdownCategoryRef.current &&
        !dropdownCategoryRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideCategory);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCategory);
    };
  }, [inputCategoryRef, dropdownCategoryRef]);

  return (
    <>
      <div className="flex items-center py-4" >
        {veiw.filter && (
          <Input style={selectedBrand ? { width: "50%" } : {}}
            placeholder="Search..."
            onChange={(event) =>
              table.setGlobalFilter(event.target.value)
            }
            className="max-w-sm"
          />
        )}
       {/*  {
          selectedBrand ?
            <div style={selectedBrand ? { width: "50%" } : {}} className="max-w-sm ml-2  h-[40px] border rounded-lg flex justify-between px-4 items-center text-gray-700">
              <p>{selectedBrand}</p>
              <AiFillCloseCircle onClick={() => {
                setSelectedBrand("");
                table.setColumnFilters([]);
              }} className="cursor-pointer" />
            </div> :
            <Command className="ml-3">
              <input placeholder="Filter by Brand..." value={selectedBrand} onChange={handleChangeBrand} readOnly onClick={() => setIsBrandOpen(!isBrandOpen)} ref={inputBrandRef}
                className="max-w-sm relative border px-[0.75rem] py-[0.42rem] border-gray-300 focus:outline-none rounded-md " />
              {isBrandOpen &&
                <CommandList className="absolute max-w-sm mt-9 w-fulltext-left  bg-white rounded-md border z-10 " ref={dropdownBrandRef}>
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
        {
          selectedCategory ?
            <div style={selectedCategory ? { width: "50%" } : {}} className="max-w-sm ml-2  h-[40px] border rounded-lg flex justify-between px-4 items-center text-gray-700">
              <p>{selectedCategory}</p>
              <AiFillCloseCircle onClick={() => {
                setSelectedCategory("");
                table.setColumnFilters([]);
              }} className="cursor-pointer" />
            </div> :
            <Command className="ml-3">
              <input placeholder="Filter by Category..." value={selectedCategory} onChange={handleChangeCategory} readOnly onClick={() => setIsCategoryOpen(!isCategoryOpen)} ref={inputCategoryRef}
                className="max-w-sm relative border px-[0.75rem] py-[0.42rem] border-gray-300 focus:outline-none rounded-md " />
              {isCategoryOpen &&
                <CommandList className="absolute max-w-sm mt-9 w-fulltext-left  bg-white rounded-md border z-10 " ref={dropdownCategoryRef}>
                  {data!.map((item: any, index: any) => (
                    <CommandItem key={index} className="px-4 py-2 hover:bg-gray-100 border-b" value={item.category} onSelect={() => {
                      setSelectedCategory(item.category);
                      setIsCategoryOpen(!isCategoryOpen);

                      table.setColumnFilters([{ id: "category", value: item.category }])
                    }}>{item.category}</CommandItem>
                  ))}
                </CommandList>}
            </Command>
        } */}
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
/* at all you haveyour  own data table to use your data table call this component like this on your code exam : page.tsx    <DataTable columns={c_columns} data={customerData} /> the c_colums is your column replace it with your and data also  for reference how i share my data see dashboard/customers/list/page.tsx ,i hope u got it  */


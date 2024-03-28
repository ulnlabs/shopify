"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"
export interface InventoryItem {
    select: boolean;
    category: string;
    code: string;
    categoryName: string;
    description: string;
    status: string;
}

export const COLUMNS_DATA: ColumnDef<InventoryItem>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!value)}
                aria-label='Select all'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(value)}
                aria-label='Select row'
                className=" data-[state=checked]:bg-gray-800 border border-gray-800"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'code',
        header: 'Code',
        cell: ({ row }) => <div>{row.getValue('code')}</div>,
    },
    {
        accessorKey: 'categoryName',
        header: ({ column }: any) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Category
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <div>{row.getValue('description')}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
    },
    {
        id: "actions",
        header:'action',
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-fit px-4 p-0">
                            <span className="sr-only">Open menu</span>
                            <p>action</p>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText("j")}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];
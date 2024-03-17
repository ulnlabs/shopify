"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"

export interface InventoryItem {
    select: boolean;
    itemCode: string;
    itemName: string;
    brand: string;
    category: string;
    unit: string;
    stockQty: number;
    minQty: number;
    purchaseprice: number;
    finalsalesprice: number;
    tax: number;
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
                className="bg-gray-800 data-[state=checked]:bg-gray-800 border border-gray-800"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'itemCode',
        header: 'Item Code',
        cell: ({ row }) => <div>{row.getValue('itemCode')}</div>,
    },
    {
        accessorKey: 'itemName',
        header: 'Item Name',
        cell: ({ row }) => <div>{row.getValue('itemName')}</div>,
    },
    {
        accessorKey: 'brand',
        header: 'Brand',
        cell: ({ row }) => <div>{row.getValue('brand')}</div>,
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <div>{row.getValue('category')}</div>,
    },
    {
        accessorKey: 'unit',
        header: 'Unit',
        cell: ({ row }) => <div>{row.getValue('unit')}</div>,
    },
    {
        accessorKey: 'stockQty',
        header: 'Stock Quantity',
        cell: ({ row }) => <div>{row.getValue('stockQty')}</div>,
    },
    {
        accessorKey: 'minQty',
        header: 'Minimum Quantity',
        cell: ({ row }) => <div>{row.getValue('minQty')}</div>,
    },
    {
        accessorKey: 'purchaseprice',
        header: 'Purchase Price',
        cell: ({ row }) => (
            <div>
                ${parseFloat(row.getValue("purchaseprice"))}{' '}
            </div>
        ),
    },
    {
        accessorKey: 'finalsalesprice',
        header: 'Final Sales Price',
        cell: ({ row }) => (
            <div>
                ${parseFloat(row.getValue('finalsalesprice'))}{' '}
            </div>
        ),
    },
    {
        accessorKey: 'tax',
        header: 'Tax (%)',
        cell: ({ row }) => <div>{row.getValue('tax')}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
    },
];


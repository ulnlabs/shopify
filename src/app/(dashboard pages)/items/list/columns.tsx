"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

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
 /*  {
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
  }, */
  {
    accessorKey: "itemCode",
    header: "Item Code",
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "quantity",
    header: "Stock Quantity",
  },
  
  {
    accessorKey: "Purchaseprice",
    header: "Purchase Price",
  },
  {
    accessorKey: "salesPrice",
    header: "Final Sales Price",
   
  },
  {
    accessorKey: "tax",
    header: "Tax (%)",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

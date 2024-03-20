"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export interface InventoryItem {
  select: boolean;
  brandCode: string;
  brandName: string;
  description: string;
  status: string;
}
// 	Brand Code	Brand Name	Description	Status	Action
export const COLUMNS_DATA: ColumnDef<InventoryItem>[] = [
  {
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
  },
  {
    accessorKey: "brandCode",
    header: "brand Code",
    cell: ({ row }) => <div>{row.getValue("brandCode")}</div>,
  },
  {
    accessorKey: "brandName",
    header: "Brand Name",
    cell: ({ row }) => <div>{row.getValue("brandName")}</div>,
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey:'action',
    cell:()=>{
      return
    }
  }
];

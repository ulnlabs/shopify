"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

export interface InventoryItem {
  roleName: string;
  description: string;
  status: "active" | "suspended";
}

export const COLUMNS_DATA: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "roleName",
    header: "role Name",
    cell: ({ row }) => <div>{row.getValue("roleName")}</div>,
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "action",
    cell: () => {
      return <DropdownMenu>
        <DropdownMenuTrigger>Action</DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <DropdownMenuItem>Active</DropdownMenuItem>
          <DropdownMenuItem>Suspend</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    }
  },
];

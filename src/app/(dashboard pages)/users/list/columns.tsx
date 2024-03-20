"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

export interface InventoryItem {
  userName: string;
  mobile: string;
  email: string;
  role: string;
  status: "active" | "suspended";
}

export const COLUMNS_DATA: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "userName",
    header: "user Name",
    cell: ({ row }) => <div>{row.getValue("userName")}</div>,
  },
  {
    accessorKey: "mobile",
    header: "mobile",
    cell: ({ row }) => <div>{row.getValue("mobile")}</div>,
  },
  {
    accessorKey: "email",
    header: "email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "roleCategory",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
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

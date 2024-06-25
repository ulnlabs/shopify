"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

export interface InventoryItem {
  username: string;
  mobile: string;
  email: string;
  role: string;
  status: "active" | "suspended";
}
export const UserEventHandler = async (row: any) => {
  const email = await row.getValue('email');
  const status = await row.getValue('status');
  const updatedStatus = status == 'active' ? 'suspend' : 'active';
  const res = await fetch('/api/user/updatestatus', {
    method: 'POST',
    body: JSON.stringify({ email: email, status: updatedStatus })
  })
  if (res.ok) {
    console.log("user updated");
  }
}
export const COLUMNS_DATA: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "username",
    header: "user Name",
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "mobile",
    header: "mobile",
    cell: ({ row }) => <div>{row.getValue("phoneno")}</div>,
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
    cell: ({ row }) => {
      return <DropdownMenu>
        <DropdownMenuTrigger>Action</DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <DropdownMenuItem onClick={() => UserEventHandler(row)}>Active</DropdownMenuItem>
          <DropdownMenuItem onClick={() => UserEventHandler(row)}>Suspend</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    }
  },
];

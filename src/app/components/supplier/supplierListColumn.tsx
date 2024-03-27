
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
function handleDelete(original: any) {
    throw new Error("Function not implemented.");
}
const EMAIL={
accessorKey:"email",
header: ({ column }: any) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  },
}
const SELECT = {
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
  };

  const ACTION = {
    accessorKey: "action",
    cell: ({ row }: any) => {
      

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                handleDelete(row.original);
              }}
            >
              Delete Customer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("jking")}>
              Update customer
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
  const ID:supplierColumn={
    accessorKey:"id",
    header:"Supplier Id"
  }
  const NAME:supplierColumn={
    accessorKey:"name",
    header:"Supplier Name"
  }
  const MOBILE:supplierColumn={
    accessorKey:"mobile",
    header:"Mobile"
  }
  const PURCHASEDUE:supplierColumn={
    accessorKey:"purchasedue",
    header:"Purchase Due"
  }
  const RETURNDUE:supplierColumn={
    accessorKey:"returndue",
    header:"Return Due"
  }
  const STATUS:supplierColumn={
    accessorKey:"status",
    header:"Status"
  }
    export const s_columns: ColumnDef<any>[] = [
      SELECT,
      ID,
      NAME,
      MOBILE,
      EMAIL,
      PURCHASEDUE,
      RETURNDUE,
      STATUS,
      ACTION,
      
    ];
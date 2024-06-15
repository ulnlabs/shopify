"use client";
//this is a sample column it is not used anywhere
//for hint how do make your custom columns see line 137 or below to comment
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { UserContext } from "@/UserContext";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { customerList ,columnHeader_dataTable} from "../../../../global";
const { setIsDeleted, isDeleted } = useContext(UserContext)


/* //delete the data or update here you have to use your custom function import it from your area */
async function handleDelete(row: customerList): Promise<void> {


  if (row._id) {
    const ID = row._id

    const response = await axios.delete("/api/customers", { data: { id: ID } })
    if (response.status) {
      setIsDeleted(!isDeleted)
    }
  }

}
//see this is an example to sort your column  replace it wth yours
const C_Email = {
  accessorKey: "email",
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
};

const C_ID: columnHeader_dataTable = {
  accessorKey: "cid",
  header: "ID",
};
const C_NAME: columnHeader_dataTable = {
  accessorKey: "name",
  header: "Name",
};
const C_MOBILE: columnHeader_dataTable = {
  accessorKey: "mobile",
  header: "Mobile",
};

const C_PAID: any = {
  accessorKey: "paid",
  header: () => <div className="text-right">Paid</div>,
  cell: ({ row }: any) => {
    const amount = parseFloat(row.getValue("paid"));
    if (!isNaN(amount)) {

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    }
    return <div className="text-right font-medium">-</div>;

  },
};

const C_STATUS: columnHeader_dataTable = {
  accessorKey: "status",
  header: "Status",
};
const C_SELECT = {
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
const C_ACTION = {
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
export const c_columns: ColumnDef<any>[] = [
  C_SELECT,
  C_ID,
  C_NAME,
  C_MOBILE,
  C_Email,
  C_PAID,

  C_STATUS,
  C_ACTION,
];
/* 
hey guys here you see my columns ,the array c_columns is used to create a data table to make your custom table you need first a array like c_columns  dont forget to have columndef on that . 
start :
above i created C_NAME which has its own type from global file there are two value needed for simple col head;
in case u need custom column like select, email just copy the above declaration C_EMAIL and rename it then use it on your custom array , don't forget to export your array.
for sorting your column see C_EMAIL  
donot overWRITE the above code  write your code on below to this comment and export it
*/

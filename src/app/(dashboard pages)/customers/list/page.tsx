"use client";
import { DataTable } from "@/app/components/datatable/DataTable";
import { useEffect, useState } from "react";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

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
export default function Page() {
  const { toast } = useToast()
  const [customerData, setCustomerData] = useState<customerList[]>([]);
  const { isDeleted, setIsDeleted } = useContext(UserContext);
  useEffect(() => {
    async function getData(): Promise<void> {
      const response = await axios.get(`/api/customers`, {
        headers: {
          data: "get-data",
        },
      });
      const data = response.data;

      setCustomerData(data);
    }
    getData();
  }, [isDeleted]);

  async function handleDelete(row: customerList): Promise<void> {
    if (row._id) {
      const ID = row._id;

      const response = await axios.delete("/api/customers", {
        data: { id: ID },
      });
      if (response.status==200) {
        console.log(response.status);
        
        setIsDeleted(!isDeleted);
        toast({
      
          title: "New Message !",
          description: " Customer is deleted successfully",
        })
      }
    }
  }
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
    accessorKey: "id",
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
  const c_columns: ColumnDef<any>[] = [
    C_SELECT,
    C_ID,
    C_NAME,
    C_MOBILE,
    C_Email,
    C_PAID,
    C_STATUS,
    C_ACTION,
  ];

  return (
    <>
      <DashboardHeader title="customers" />

      <div className="container mx-auto py-3">
        <DataTable
          columns={c_columns}
          data={customerData}
          column={true}
          filter={true}
          rows={true}
          paginater={true}
        />
      </div>
      
    </>
  );
}

"use client";

import { ColumnDef } from "@tanstack/react-table";
const InvoiceNo: columnHeader_dataTable = {
  accessorKey: "Invoiceno",
  header: " Invoice Number",
};
const Sales_Date: columnHeader_dataTable = {
  accessorKey: "SalesDate",
  header: "Sales Date",
};
const  Customer_Name: columnHeader_dataTable = {
  accessorKey: "Customername",
  header: "Customer Name",
};
const  Customer_Id: columnHeader_dataTable = {
    accessorKey: "Customerid",
    header: "Customer Id",
  };

const Invoice_Total: columnHeader_dataTable = {
  accessorKey: "Invoicetotal",
  header: "Invoice Total(₹)"
};
const Paid_Payment: columnHeader_dataTable = {
    accessorKey: "Payment",
    header: "Paid Payment(₹)",
  };
  const Due_amount: columnHeader_dataTable = {
    accessorKey: "Deuamount",
    header: " Due Amount(₹)",
  };
  const due_Date: columnHeader_dataTable = {
    accessorKey: "Duedate",
    header: "Due Days",
  };


export const c_columns: ColumnDef<any>[] = [
    InvoiceNo,
    Sales_Date,
    Customer_Id,
    Customer_Name,
    Invoice_Total,
    Paid_Payment,
    Due_amount,
    due_Date




];
/* 
hey guys here you see my columns ,the array c_columns is used to create a data table to make your custom table you need first a array like c_columns  dont forget to have columndef on that . 
start :
above i created C_NAME which has its own type from global file there are two value needed for simple col head;
in case u need custom column like select, email just copy the above declaration C_EMAIL and rename it then use it on your custom array , don't forget to export your array.
for sorting your column see C_EMAIL  
donot overWRITE the above code  write your code on below to this comment and export it
*/

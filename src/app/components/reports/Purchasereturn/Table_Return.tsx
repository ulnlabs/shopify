"use client";

import { ColumnDef } from "@tanstack/react-table";
const InvoiceNo: columnHeader_dataTable = {
  accessorKey: "Invoiceno",
  header: " InvoiceNo",
};
const Return_Date: columnHeader_dataTable = {
  accessorKey: "ReturnDate",
  header: "Return Date",
};
const  Purchase_Code: columnHeader_dataTable = {
  accessorKey: "Purchasecode",
  header: "Purchase code",
};

const Supplier_Name: columnHeader_dataTable = {
  accessorKey: "Suppliername",
  header: "Supplier Name",
};
const total_Invoice: columnHeader_dataTable = {
  accessorKey: "InvoiceTotal",
  header: "Invoice Total(₹)",
};
const Paid_Payment: columnHeader_dataTable = {
  accessorKey: "Payment",
  header: "Paid Payment(₹)",
};
const Due_amount: columnHeader_dataTable = {
  accessorKey: "Deuamount",
  header: " Due Amount(₹)",
};


export const c_columns: ColumnDef<any>[] = [
  InvoiceNo,
  Return_Date,
  Purchase_Code,
  Supplier_Name,
  total_Invoice,
  Paid_Payment,
  Due_amount,



];
/* 
hey guys here you see my columns ,the array c_columns is used to create a data table to make your custom table you need first a array like c_columns  dont forget to have columndef on that . 
start :
above i created C_NAME which has its own type from global file there are two value needed for simple col head;
in case u need custom column like select, email just copy the above declaration C_EMAIL and rename it then use it on your custom array , don't forget to export your array.
for sorting your column see C_EMAIL  
donot overWRITE the above code  write your code on below to this comment and export it
*/

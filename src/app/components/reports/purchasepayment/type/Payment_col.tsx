"use client";
import { columnHeader_dataTable } from "../../../../../../global";
import { ColumnDef } from "@tanstack/react-table";
const InvoiceNo: columnHeader_dataTable = {
  accessorKey: "Invoiceno",
  header: "Purchase InvoiceNo",
};
const Payment_Date: columnHeader_dataTable = {
  accessorKey: "Date",
  header: "Payment Date",
};
const Supplier_ID: columnHeader_dataTable = {
  accessorKey: "Supplierid",
  header: "Supplier ID",
};

const Supplier_Name: columnHeader_dataTable = {
  accessorKey: "Suppliername",
  header: "Supplier Name",
};
const Payment_Type: columnHeader_dataTable = {
  accessorKey: "PaymentType",
  header: "Payment Type",
};
const Payment_Note: columnHeader_dataTable = {
  accessorKey: "PaymentNode",
  header: " Payment Note",
};
const due_Date: columnHeader_dataTable = {
  accessorKey: "Duedate",
  header: "Due Days",
};
const Paid_Payment: columnHeader_dataTable = {
  accessorKey: "Payment",
  header: "Paid Payment(₹)",
};

export const c_columns: ColumnDef<any>[] = [
  InvoiceNo,
  Payment_Date,
  Supplier_ID,
  Supplier_Name,
  Payment_Type,
  Paid_Payment,
  Payment_Note


];
/* 
hey guys here you see my columns ,the array c_columns is used to create a data table to make your custom table you need first a array like c_columns  dont forget to have columndef on that . 
start :
above i created C_NAME which has its own type from global file there are two value needed for simple col head;
in case u need custom column like select, email just copy the above declaration C_EMAIL and rename it then use it on your custom array , don't forget to export your array.
for sorting your column see C_EMAIL  
donot overWRITE the above code  write your code on below to this comment and export it
*/

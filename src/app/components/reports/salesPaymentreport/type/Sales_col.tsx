"use client";
import { columnHeader_dataTable } from "../../../../../../global";
import { ColumnDef } from "@tanstack/react-table";
const InvoiceNo: columnHeader_dataTable = {
  accessorKey: "Invoiceno",
  header: "Sales InvoiceNo",
};
const Payment_Date: columnHeader_dataTable = {
  accessorKey: "Date",
  header: "Payment Date",
};
const Customer_ID: columnHeader_dataTable = {
  accessorKey: "Customerid",
  header: "Customer ID",
};

const Customer_Name: columnHeader_dataTable = {
  accessorKey: "Customername",
  header: "Customer Name",
};
const Payment_Type: columnHeader_dataTable = {
  accessorKey: "PaymentType",
  header: "Payment Type",
};
const Payment_Note: columnHeader_dataTable = {
  accessorKey: "PaymentNode",
  header: " Payment Note",
};

const Paid_Payment: columnHeader_dataTable = {
  accessorKey: "Payment",
  header: "Paid Payment(₹)",
};
const Created_by: columnHeader_dataTable = {
  accessorKey: "Createdby",
  header: "Created By",
};


export const c_columns: ColumnDef<any>[] = [
  InvoiceNo,
  Payment_Date,
 Customer_ID,
 Customer_Name,
  Payment_Type,
  Paid_Payment,
  Created_by


];
/* 
hey guys here you see my columns ,the array c_columns is used to create a data table to make your custom table you need first a array like c_columns  dont forget to have columndef on that . 
start :
above i created C_NAME which has its own type from global file there are two value needed for simple col head;
in case u need custom column like select, email just copy the above declaration C_EMAIL and rename it then use it on your custom array , don't forget to export your array.
for sorting your column see C_EMAIL  
donot overWRITE the above code  write your code on below to this comment and export it
*/

"use client";
import { columnHeader_dataTable } from "../../../../../global";
import { ColumnDef } from "@tanstack/react-table";
const InvoiceNo: columnHeader_dataTable = {
  accessorKey: "Invoiceno",
  header: " InvoiceNo",
};
const Purchase_Date: columnHeader_dataTable = {
  accessorKey: "PurchaseDate",
  header: "Purchase Date",
};

const Supplier_Name: columnHeader_dataTable = {
  accessorKey: "Suppliername",
  header: "Supplier Name",
};
const Item_Name: columnHeader_dataTable = {
  accessorKey: "itemname",
  header: "Item Name",
};
const Quantity: columnHeader_dataTable = {
  accessorKey: "Quantity",
  header: "Quantity",
};
const Amount: columnHeader_dataTable = {
  accessorKey: "Amount",
  header: " Amount(₹)",
};


export const c_columns: ColumnDef<any>[] = [
  InvoiceNo,
  Purchase_Date,
  Supplier_Name,
  Item_Name,
  Quantity,
  Amount
  


];
/* 
hey guys here you see my columns ,the array c_columns is used to create a data table to make your custom table you need first a array like c_columns  dont forget to have columndef on that . 
start :
above i created C_NAME which has its own type from global file there are two value needed for simple col head;
in case u need custom column like select, email just copy the above declaration C_EMAIL and rename it then use it on your custom array , don't forget to export your array.
for sorting your column see C_EMAIL  
donot overWRITE the above code  write your code on below to this comment and export it
*/

"use client";
import { columnHeader_dataTable } from "../../../../../global";
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

const Item_Sales_Count: columnHeader_dataTable = {
  accessorKey: "Itemcount",
  header: "Item Sales Count",
};
const Item_Name: columnHeader_dataTable = {
  accessorKey: "InvoiceTotal",
  header: "Item Name",
};
const Sales_Amount: columnHeader_dataTable = {
  accessorKey: "salesamount",
  header: "Sales Amount(₹)",
};



export const c_columns: ColumnDef<any>[] = [
    InvoiceNo,
    Sales_Date,
    Customer_Name,
    Item_Name,
    Item_Sales_Count,
    Sales_Amount




];
/* 
hey guys here you see my columns ,the array c_columns is used to create a data table to make your custom table you need first a array like c_columns  dont forget to have columndef on that . 
start :
above i created C_NAME which has its own type from global file there are two value needed for simple col head;
in case u need custom column like select, email just copy the above declaration C_EMAIL and rename it then use it on your custom array , don't forget to export your array.
for sorting your column see C_EMAIL  
donot overWRITE the above code  write your code on below to this comment and export it
*/

"use client";

import { ColumnDef } from "@tanstack/react-table";

const Item_Code: columnHeader_dataTable = {
  accessorKey: "Code",
  header: "Item Code",
};
const Item_Name: columnHeader_dataTable = {
  accessorKey: "Name",
  header: "Item Name",
};

const Brand: columnHeader_dataTable = {
  accessorKey: "Brand",
  header: "Brand Name",
};
const Category: columnHeader_dataTable = {
  accessorKey: "Category",
  header: "Category",
};
const Unit_Price: columnHeader_dataTable = {
  accessorKey: "UnitPrice",
  header: " Unit Price(₹)",
};
const Sales_Price: columnHeader_dataTable = {
  accessorKey: "SalesPrice",
  header: " Sales Price(₹)",
};

const Current_Stock: columnHeader_dataTable = {
  accessorKey: "CurrentStock",
  header: "Current Stock",
};
const Stock_Value: columnHeader_dataTable = {
  accessorKey: "StockValue",
  header: "Stock Value",
};
const Tax: columnHeader_dataTable = {
  accessorKey: "Tax",
  header: "Tax",
};


export const c_columns: ColumnDef<any>[] = [
  Item_Code,
  Item_Name,
  Brand,
  Category,
  Unit_Price,
  Tax,
  Sales_Price,
  Current_Stock,
  Stock_Value



];
/* 
hey guys here you see my columns ,the array c_columns is used to create a data table to make your custom table you need first a array like c_columns  dont forget to have columndef on that . 
start :
above i created C_NAME which has its own type from global file there are two value needed for simple col head;
in case u need custom column like select, email just copy the above declaration C_EMAIL and rename it then use it on your custom array , don't forget to export your array.
for sorting your column see C_EMAIL  
donot overWRITE the above code  write your code on below to this comment and export it
*/

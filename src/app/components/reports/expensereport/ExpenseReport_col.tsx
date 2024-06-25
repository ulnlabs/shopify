"use client";
import { columnHeader_dataTable } from "../../../../../global";
import { ColumnDef } from "@tanstack/react-table";
const EXPENSE_CODE: columnHeader_dataTable = {
  accessorKey: "expense_code",
  header: "Expense Code",
};
const EXPENSE_DATE: columnHeader_dataTable = {
  accessorKey: "expense_date",
  header: "Expense Date",
};

const CATEGORY_NAME: columnHeader_dataTable = {
  accessorKey: "category_name",
  header: "Category Name",
};
const REFERENCE_NO: columnHeader_dataTable = {
  accessorKey: "referece_no",
  header: "Reference_no",
};
const EXPENSE_FOR: columnHeader_dataTable = {
  accessorKey: "expense_for",
  header: "Expense for",
};
const AMOUNT: columnHeader_dataTable = {
  accessorKey: "Amount",
  header: " Amount(₹)",
};
const NOTE: columnHeader_dataTable = {
  accessorKey: "note",
  header: "Note",
}
const CREATED_BY: columnHeader_dataTable = {
  accessorKey: "created_by",
  header: "Created by",
}


export const c_columns: ColumnDef<any>[] = [
  EXPENSE_CODE,
  EXPENSE_DATE,
  CATEGORY_NAME,
  REFERENCE_NO,
  EXPENSE_FOR,
  AMOUNT,
  NOTE,
  CREATED_BY,


];
/* 
hey guys here you see my columns ,the array c_columns is used to create a data table to make your custom table you need first a array like c_columns  dont forget to have columndef on that . 
start :
above i created C_NAME which has its own type from global file there are two value needed for simple col head;
in case u need custom column like select, email just copy the above declaration C_EMAIL and rename it then use it on your custom array , don't forget to export your array.
for sorting your column see C_EMAIL  
donot overWRITE the above code  write your code on below to this comment and export it
*/

import { MdOutlineDelete } from "react-icons/md"; 

import { ColumnDef } from "@tanstack/react-table";

 const DATE: columnHeader_dataTable = {
    accessorKey: "date",
    header: "DATE",
};

const c_NAME: columnHeader_dataTable = {
    accessorKey: "name",
    header: "CUSTOMER NAME",
};

const TOTAL: columnHeader_dataTable = {
    accessorKey: "total",
    header: "TOTAL",
};

const USER: columnHeader_dataTable = {
    accessorKey: "user",
    header: "CREATED BY",
};

const ACTION: columnHeader_dataTable = {
    accessorKey: "action",
    header: "ACTION",
};

const s_NAME: columnHeader_dataTable = {

    accessorKey: "name",
    header: "SUPPLIER NAME",
}


export const s_LIST_Column: ColumnDef<any> []=  [


    DATE,
    c_NAME,
    TOTAL,
    USER,
    ACTION,

];

export const p_LIST_Column: ColumnDef<any> []=  [


    DATE,
    s_NAME,
    TOTAL,
    USER,
    ACTION,

];

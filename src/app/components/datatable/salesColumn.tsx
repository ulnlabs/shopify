import { MdOutlineDelete } from "react-icons/md"; 

import { ColumnDef } from "@tanstack/react-table";

 const i_NAME: columnHeader_dataTable = {
    accessorKey: "name",
    header: "Item Name",
};

const i_QUANTITY: columnHeader_dataTable = {
    accessorKey: "quantity",
    header: "Quantity",
};

const i_PRICE: columnHeader_dataTable = {
    accessorKey: "price",
    header: "PRICE",
};

const i_DISCOUNT: columnHeader_dataTable = {
    accessorKey: "discount",
    header: "DISOUNT",
};

const i_TAX: columnHeader_dataTable = {
    accessorKey: "tax",
    header: "TAX",
};
const i_SUBTOTAL: columnHeader_dataTable = {
    accessorKey: "subtotal",
    header: "SUB TOTAL",
};

const i_REMOVE = {
    accessorKey: "remove",
    cell: ({ row }: any) => (
       <MdOutlineDelete />

    )
};


export const sales_Column: ColumnDef<any> []=  [


    i_NAME,
    i_QUANTITY,
    i_PRICE,
    i_DISCOUNT,
    i_TAX,
    i_SUBTOTAL,
    i_REMOVE,
];
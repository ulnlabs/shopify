import { AiOutlinePlus } from "react-icons/ai"; 
import { AiOutlineMinus } from "react-icons/ai"; 
import { MdOutlineDelete } from "react-icons/md"; 

import { ColumnDef } from "@tanstack/react-table";

 const i_NAME: columnHeader_dataTable = {
    accessorKey: "name",
    header: "Item Name",
};

let quantity = 1

const i_QUANTITY:columnHeader_dataTable  = {
    accessorKey: "quantity",
    header:"QUANTITY",
   /*  cell: ({ row }: any) => (
        <span className="flex gap-1 items-center">
            <AiOutlineMinus />
            {quantity}
            <AiOutlinePlus />
        </span>
    )  */
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
    accessorKey: "REMOVE",

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
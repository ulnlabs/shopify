
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

const i_TAXPERCEN: columnHeader_dataTable = {
    accessorKey: "taxpercen",
    header: "TAX %",
};

const i_TAX: columnHeader_dataTable = {
    accessorKey: "tax",
    header: "TAX",
};

const i_UNIT: columnHeader_dataTable = {
    accessorKey: "unitcost",
    header: "UNIT COST",
};

const i_TOTAL:columnHeader_dataTable = {
    accessorKey: "total",
    header:"Total Amount",
}

const i_REMOVE = {
    accessorKey: "remove",
    cell: ({ row }: any) => (
       <MdOutlineDelete />

    )
};


export const pur_Column: ColumnDef<any> []=  [


    i_NAME,
    i_QUANTITY,
    i_PRICE,
    i_DISCOUNT,
    i_TAXPERCEN,
    i_TAX,
    i_UNIT,
    i_TOTAL,
    i_REMOVE,
];
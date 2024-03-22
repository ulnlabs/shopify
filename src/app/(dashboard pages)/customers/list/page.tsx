"use client";
import { useEffect, useState } from "react";
import DataTable from "@/app/components/datatable/DataTable";
import { c_columns } from "@/app/components/datatable/Column";

export default function DemoPage() {
  const [customerData, setCustomerData] = useState<customerList[]>([]);
  useEffect(() => {
    async function getData(): Promise<void> {
      const response = await fetch(`/api/customer`);
      const data = await response.json();

      setCustomerData(data);
    }
    getData();
  }, []);

  return (
    <>
      <header className="w-[90%]  h-[50px]  text-xl font-semibold text-gray-400 flex px-10 rounded-2xl shadow-[rgba(50,50,93,0.25)_0px_6px_4px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  items-center  ">
        Customers List
      </header>
      {customerData.length > 0 && (
        <div className="container mx-auto py-3">
          <DataTable
            columns={c_columns}
            data={customerData}
            column={true}
            filter={true}
            rows={true}
            paginater={true}
          />
        </div>
      )}
    </>
  );
}

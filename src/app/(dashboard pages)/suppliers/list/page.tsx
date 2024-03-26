"use client";
import { DataTable } from "@/app/components/datatable/DataTable";
import { useEffect, useState } from "react";
import { s_columns } from "@/app/components/supplier/supplierListColumn";
export default function DemoPage() {
  const [customerData, setCustomerData] = useState<customerList[]>([]);
  useEffect(() => {
    async function getData(): Promise<void> {
      const response = await fetch(`/api/customers`);
      const data = await response.json();

      setCustomerData(data);
    }
    getData();
  }, []);

  return (
    <>
      
      {customerData.length > 0 && (
        <div className="container mx-auto py-3">
          <DataTable
            columns={s_columns}
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

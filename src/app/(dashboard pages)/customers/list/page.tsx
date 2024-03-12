                "use client"
                import { DataTable } from "@/app/components/customer/CustomerList";
                import { useEffect, useState } from "react";
                import { columns } from "@/app/components/customer/tablelist/Column";


                export default  function DemoPage() {
                    const [customerData,setCustomerData]=useState<customerList[]>([])
                    useEffect(()=>{
                    
                    async  function getData():Promise<void>{
                            
                   const response= await    fetch(`/api/customer`)
                        const data= await response.json()
                        
                        setCustomerData(data)
                        
                        }
                        getData()
                    },[])

                return (
                    <>
                    {
                customerData.length>0 && (

                    <div className="container mx-auto py-3">
                        <DataTable columns={columns} data={customerData} />
                    </div>
                )
                    }
                    </>
                );
                }

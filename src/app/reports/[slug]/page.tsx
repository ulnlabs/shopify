import React from 'react'
import Proandloss from '@/app/components/reports/profit and loss report/Proandloss';
import Purchasereprot from '@/app/components/reports/purchasereport/Purchasereprot';
import ReturnPurchase from '@/app/components/reports/Purchasereturn/ReturnPurchase';
import PaymentReport from '@/app/components/reports/purchasepayment/PaymentReport';
import SalesReport from "@/app/components/reports/itemSalesReport/SalesReport"

function page({params}:{params:{slug:string}}) {
    const route=params.slug

    interface Reports {
        current_route: React.ReactNode;
        header: React.ReactNode;

    }
    let report:Reports={
        current_route: "",
        header:"",
    }
    switch(route){
        case "profit-loss":
            report.current_route=<Proandloss />
            report.header="Profit And Loss Report"
            break;
        case "purchase":
            report.current_route=<Purchasereprot />
            report.header="Purchase Report"
            break;
        case "purchase-return":
            report.current_route=<ReturnPurchase />
            report.header="Purchase Return Report"
            break;
        case "purchase-payments":
            report.current_route=<PaymentReport />
            report.header="Purchase Payment Report"
            break;
        case "item-sales":
            report.current_route=<SalesReport />
            report.header="Sales Report"
            break;
    }
    
  return (
    <>
    <div className="">
        <div className="tracking-[3px] text-xl p-4">{report.header}</div>
        <div className="">
            {report.current_route}
        </div>
       
    </div>
   
    </>
  )
}

export default page
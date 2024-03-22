import React from 'react'
import Proandloss from '@/app/components/reports/profit and loss report/Proandloss';
import Purchasereprot from '@/app/components/reports/purchasereport/Purchasereprot';
import ReturnPurchase from '@/app/components/reports/Purchasereturn/ReturnPurchase';
import PaymentReport from '@/app/components/reports/purchasepayment/PaymentReport';
import ItemSalesReport from "@/app/components/reports/itemSalesReport/ItemSalesReport";
import ItemReport from "@/app/components/reports/itemreport/ItemReport";
import SalesReport from "@/app/components/reports/salesreport/SalesReport";
import SalesReturnReport from "@/app/components/reports/salesreturnreport/SalesReturnReport";
import SalesPaymentReport from "@/app/components/reports/salesPaymentreport/SalesPaymentReport";
import StackReport from "@/app/components/reports/stockreport/StackReport";
import ExpiredItemReport from "@/app/components/reports/Expireditem/ExpiredItemReport"

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
            report.current_route=<ItemSalesReport />
            report.header="Sales Report"
            break;
        case "item-purchase":
            report.current_route=<ItemReport />
            report.header="Item Purchase Report"
            break;
        case "sales":
            report.current_route=<SalesReport />
            report.header="Sales Report"
            break;
        case "sales-return":
            report.current_route=<SalesReturnReport />
            report.header="Sales Return Report"
            break;
        case "sales-payments":
            report.current_route=<SalesPaymentReport />
            report.header="Sales Payment Report"
            break;
        case "stock":
            report.current_route=<StackReport/>
            report.header="Stock Report"
            break;
        case "expired-items":
            report.current_route=<ExpiredItemReport/>
            report.header="Expired Item Report"
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
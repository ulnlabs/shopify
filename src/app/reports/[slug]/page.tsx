import React from 'react'
import Proandloss from '@/app/components/reports/profit and loss report/Proandloss';

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
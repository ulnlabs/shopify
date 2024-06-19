import mongoose from "mongoose";
const salesData=new mongoose.Schema({
    defaultDiscount:{
        type:String,
        require:true
    },
   
    invoiceFormat:{
        type:String,
        require:true
    },
    showPaidAmount:{
        type:Boolean,
        require:true
    },
    showUpiCode:{
        type:Boolean,
        require:true
    },
    termsAndcondition:{
        type:String,
        require:true
    },
    footerText:{
        type:String,
        require:true
    }
  
    


})
const sitelist_sales= mongoose.models.sitelist_sales||mongoose.model("sitelist_sales",salesData)
export default sitelist_sales;
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
const sitelist_Sales= mongoose.models.v||mongoose.model("sitelist_Sales",salesData)
export default sitelist_Sales;
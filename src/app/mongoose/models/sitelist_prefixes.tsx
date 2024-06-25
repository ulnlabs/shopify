import mongoose from "mongoose";
const prefixesData=new mongoose.Schema({
    Category:{
        type:String,
        require:true
    },
   
    Customer:{
        type:String,
        require:true
    },
    Expense:{
        type:String,
        require:true
    },
    Purchas:{
        type:String,
        require:true
    },
    PurchaseReturn:{
        type:String,
        require:true
    },
    Sales:{
        type:String,
        require:true
    },
    SalesReturn:{
        type:String,
        require:true
    },
    Supplier:{
        type:String,
        require:true
    },
    item:{
        type:String,
        require:true
    }
  
})
const sitelist_prefixes= mongoose.models.sitelist_prefixes||mongoose.model("sitelist_prefixes",prefixesData)
export default sitelist_prefixes;
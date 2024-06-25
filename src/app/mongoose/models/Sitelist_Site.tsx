import mongoose from "mongoose";
const siteData=new mongoose.Schema({
    siteName:{
        type:String,
        require:true
    },
   
    dateFormat:{
        type:String,
        require:true
    },
    currency:{
        type:String,
        require:true
    },
    enableRoundOff:{
        type:Boolean,
        require:true
    },
    disableTax:{
        type:Boolean,
        require:true
    },
    language:{
        type:String,
        require:true
    }
  
    


})
const sitelist_Site= mongoose.models.sitelist_Site||mongoose.model("sitelist_Site",siteData)
export default sitelist_Site;
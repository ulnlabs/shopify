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
        type:String,
        require:true
    },
    disableTax:{
        type:String,
        require:true
    },
    language:{
        type:String,
        require:true
    }
  
    


})
const sitelist= mongoose.models.sitelist||mongoose.model("sitelist",siteData)
export default sitelist;
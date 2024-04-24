
import mongoose from "mongoose";

const siteData = new mongoose.Schema({

    siteName :{
        type:String,
        required:true
    },
    dateFormat :{
        type:Date,
        required:true
        
    },
    currency:{
        type:String,
        required:true,
       
    },
    roundOf:{
        type:Boolean,
       
    },
    disableTax :{
        type:Boolean,
       
    
    },
    language :{
        type:String,
        required:true
    }
}
    
   
    
)
const siteList=mongoose.models.siteList || mongoose.model("siteList",siteData)
export default siteList;

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
        default:"₹ INR"
    },
    roundOf:{
        type:Boolean,
        default:false,
        required:true
    },
    disableTax :{
        type:Boolean,
        default:false,
        required:true
    
    },
    language :{
        type:String,
        required:true
    }
} 
)
const Site=mongoose.models.Site || mongoose.model("Site",siteData)
export default Site;
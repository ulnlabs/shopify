import { time } from "console";
import { Currency } from "lucide-react";
import mongoose from "mongoose";
const siteData= new mongoose.Schema({
    site:{
        siteName:{
            type:String,
            require:true
        },
        timeZone:{
            type:String,
            require:true

        },
        dateFormat :{
            type:String,
            require:true
            
        } ,
        timeFormat :{
            type:String,
            require:true
            
        } ,
        currency :{
            type:String,
            require:true
            
        } ,
        
        enableRoundOff: {
            type: Boolean,
            default: false
        },
        disableTax: {
            type: Boolean,
            default: false
        },
        language: {
            type: String,
            required: true
        },
        siteLogo: {
            type: Buffer,
            required: true
        }
    },
    sales:{
        defaultDiscount:{
            type:String,
            require:true
        },
        showPaidAmount:{
            type:false,
            require:true
        },
        showUpiCode:{
            type:false,
            require:true
        },
        invoiceFormat:{
            type:String,
            require:true
        },
        footerText:{
            type:String,
            require:true
        },
        termsAndcondition:{
            type:String,
            require:true
        }
    },
    prefixes:{
        category:{
            type:String,
            require:true
        },
        supplier:{
            type:String,
            require:true
        },
        
        sales:{
            type:String,
            require:true
        },
        expense:{
            type:String,
            require:true
        },
        item:{
            type:String,
            require:true
        },
        purchase:{
            type:String,
            require:true
        },
        customer:{
            type:String,
            require:true
        },
        salesReturn:{
            type:String,
            require:true
        }

    }

})

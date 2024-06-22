import mongoose from "mongoose"

const SiteSalesData = new mongoose.Schema({
        discount:{
            type:Number,
            required:true
        },
        paidamount:{
            type:Boolean,
            default:false,
            required:true
        },
        UPIcode:{
            type:Boolean,
            default:false,
            required:true
        },
        invoiceFormat:{
            type:String,
            required:true
        },
        invoiceFooter:{
            type:String,
            required:true
        },
        termsAndConditions:{
            type:String,
            required:true
        }

})
const SiteSales=mongoose.models.SiteSales || mongoose.model("SiteSales",SiteSalesData)
export default SiteSales
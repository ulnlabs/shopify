import mongoose from "mongoose";

const PrefixesData =new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    supplier:{
        type:String,
        required:true
    },
    purchaseReturn:{
        type:String,
        required:true
    },
    sales:{
        type:String,
        required:true
    },
    expenses:{
        type:String,
        required:true
    },
    item:{
        type:String,
        required:true
    },
    purchase:{
        type:String,
        required:true
    },
    salesReturn:{
        type:String,
        required:true
    }
})
const Prefixes = mongoose.models.Prefixes || mongoose.model("Prefixes",PrefixesData)
export default Prefixes
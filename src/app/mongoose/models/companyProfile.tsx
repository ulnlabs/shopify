import mongoose from "mongoose";
const companyData=new mongoose.Schema({
    companyName:{
        type:String,
        require:true
    },
   
    mobile:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    postalcode:{
        type:Number,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    panNo:{
        type:String,
        require:true
    },
    bankdetails:{
        type:String,
        require:true
    },
    vatNo:{
        type:String,
        require:true
    },
    gstNo:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
   
    


})
const companyDetail= mongoose.models.companyDetail||mongoose.model("companyDetail",companyData)
export default companyDetail;
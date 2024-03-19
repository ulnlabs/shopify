import mongoose, { Schema } from "mongoose";
const customerData = new Schema({
    file_name: {
        type: String,
        required: true
    }


})

const customerDB = mongoose.models.customer || mongoose.model("customer", customerData)
export default customerDB
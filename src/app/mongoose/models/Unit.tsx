import mongoose from "mongoose";
const Unitmodel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})
const Unit = mongoose.models.Unit || mongoose.model<unitType>("Unit ", Unitmodel)
export default Unit

export interface unitType{
    name:string;
    description?:string
}

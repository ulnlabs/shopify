import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
});

const Unit = mongoose.models.Unit || mongoose.model<unitType>("Unit", UnitSchema);
export default Unit;

export interface unitType {
    name: string;
    description: string;
}

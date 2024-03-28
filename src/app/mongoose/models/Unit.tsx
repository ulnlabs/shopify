import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    descrition: {
        type: String,
        required: true,
    },
});

export const unitModel =
    mongoose.models.Unit || mongoose.model<IUnit>("Unit", unitSchema);

interface IUnit {
    name: string;
    discrption: string;
}

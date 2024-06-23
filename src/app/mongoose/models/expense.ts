import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const newCategory = new Schema({
    name: {
        require: true,
        type: String
    },
    description: String

})

export const addCategory = mongoose.models.category || mongoose.model("category", newCategory);

const newexpense = new Schema({
    date: {
        type: Date,
        require: true,
        default: Date.now()
    },
    amount: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    expfor: {
        type: String,
        require: true
    },
    refno: {
        type: String,
        require: true
    },
    note: {
        type: String
    },
    createdBy: {
        type: String,
        require: true
    }


})

export const addExpense = mongoose.models.expense || mongoose.model("expense", newexpense);
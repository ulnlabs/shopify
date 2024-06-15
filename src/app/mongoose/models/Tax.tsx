import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
 
});

export const taxModel =
  mongoose.models.Tax || mongoose.model<ITax>("Tax", taxSchema);

export interface ITax extends mongoose.Document {
  value: string;

}



import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

export const taxModel =
  mongoose.models.Tax || mongoose.model<ITax>("Tax", taxSchema);

export interface ITax extends mongoose.Document {
  name: string;
  value: number;
}



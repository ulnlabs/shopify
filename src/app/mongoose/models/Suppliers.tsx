import mongoose from "mongoose";
const supplier = new mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  id: {
    require: true,
    type: Number,
  },
  mobile: {
    require: true,
    type: String,
  },
  email: String,
 
  state: String,
  city: String,
  pincode: String,
  address: String,
});
export const supplierModal =
  mongoose.models.supplier || mongoose.model("supplier", supplier);

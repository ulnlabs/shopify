import mongoose from "mongoose";
const customer = new mongoose.Schema({
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
  gst: String,
  tax: String,
  due: String,
  state: String,
  city: String,
  pincode: String,
  address: String,
});
export const customerModel =
  mongoose.models.customer || mongoose.model("customer", customer);

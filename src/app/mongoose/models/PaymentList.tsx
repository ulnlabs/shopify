import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        unique: true,
    },
    paymentName: {
        type: String,
        required: true,
        unique: true,
    },
    paymentStatus: {
        type: Boolean,
        required: true,
        default: true,
    }
});
const paymentlistModel = mongoose.models.paymentList || mongoose.model("paymentList", paymentSchema);
export default paymentlistModel;





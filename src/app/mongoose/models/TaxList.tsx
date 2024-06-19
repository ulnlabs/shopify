import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
    taxId: {
        type: String,
        unique: true,
    },
    taxName: {
        type: String,
        required: true,
        unique: true,
    },
    taxPercentage: {
        type: String,
        required: true,
    },
    taxStatus: {
        type: Boolean,
        required: true,
        default: true,
    }
});
const taxlistModel = mongoose.models.taxList || mongoose.model("taxList", taxSchema);
export default taxlistModel;





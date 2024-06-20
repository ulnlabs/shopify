import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    unitId: {
        type: String,
        unique: true,
    },
    unitName: {
        type: String,
        required: true,
        unique: true,
    },
    unitDescription: {
        type: String,
        required: true,
    },
    unitStatus: {
        type: Boolean,
        required: true,
        default: true,
    }
});
const unitlistModel = mongoose.models.UnitList || mongoose.model("UnitList", unitSchema);
export default unitlistModel;





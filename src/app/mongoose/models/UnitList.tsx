import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const unitSchema = new mongoose.Schema({
    unitId: {
        type: String,
        unique: true,
        default: () => uuidv4()

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





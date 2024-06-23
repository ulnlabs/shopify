import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const taxSchema = new mongoose.Schema({
    taxId: {
        type: String,
        unique: true,
        default: () => uuidv4()

    },
    taxName: {
        type: String,
        required: true,
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
taxSchema.virtual('value').get(function () {
    return `${this.taxName} - ${this.taxPercentage}`;
});

taxSchema.set('toObject', { virtuals: true });
taxSchema.set('toJSON', { virtuals: true });

// Create a unique compound index on the combination of taxName and taxPercentage
taxSchema.index({ taxName: 1, taxPercentage: 1 }, { unique: true });
const taxlistModel = mongoose.models.taxList || mongoose.model("taxList", taxSchema);
export default taxlistModel;





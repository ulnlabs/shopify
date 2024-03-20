import mongoose, { Schema } from 'mongoose';

const SuppliersSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    gst: {
        type: String,
    },
    tax: {
        type: String,
    },
    due: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: String,
    },
    address: {
        type: String,
    },
});

const Suppliers = mongoose.models.Suppliers || mongoose.model('Suppliers', SuppliersSchema)

export default Suppliers;

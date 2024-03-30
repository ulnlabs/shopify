import mongoose, { Schema } from 'mongoose';


export type items = {
    name: String,

}
const SalesSchema = new Schema({
    c_id: {
        type: String,
        required: true
    },
    c_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    items: [{
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
            required: true
        }
    }],
    note: {
        type: String,
    },
    subtotal: {
        type: String,
    },
    total: {
        type: String,
    },
    paymentType: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Sales = mongoose.models.Sales || mongoose.model('Sales', SalesSchema)

export default Sales;

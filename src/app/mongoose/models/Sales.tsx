import mongoose, { Schema } from 'mongoose';


export type items = {
    name: String,

}

const SalesSchema = new Schema({
    cud_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    item: {
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
        },
        subtotal: {
            type: Number,
            required: true
        },
    },
    quantity: {
        type: String,
        required: true
    },
    charges: {
        value: {
            type: Number,
        },
        valueType: {
            type: String,
        }
    },
    discount: {
        disType: {
            type: String,
            required: true
        },
        discountvalue: {
            type: Number,
            required: true
        },
    },
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

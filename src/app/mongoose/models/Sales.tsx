import mongoose, { Schema } from 'mongoose';


const SalesSchema = new Schema({
    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },

    date: {
        type: Date,
        required: true
    },
    salesCode: {
        type: String,
        required: true
    },
    items: [{
        itemCode: {
            type: String,
            required: true
        },
        itemName: {
            type: String,
            required: true
        },
        sold_quantity: {
            type: Number,
            required: true
        },
        returned_quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        discountType: {
            type: String,
            required: true
        },
        tax: {
            type: String,
            required: true
        },
        taxType: {
            type: String,
            required: true
        },
    }],
    note: {
        type: String,
    },
    otherCharges: {
        type: Number,

    },
    taxType: {
        type: String,
    },
    discount: {
        type: Number,

    },
    discountType: {
        type: String
    },
    paymentType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Sales = mongoose.models.Sales || mongoose.model('Sales', SalesSchema)


export const Return = mongoose.models.Return || mongoose.model('Return', SalesSchema)
export default Sales;

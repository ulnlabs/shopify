import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema({
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
    purchaseCode: {
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
}, {
    timestamps: true
});


export const Purchase = mongoose.models.Purchase || mongoose.model("purchase", purchaseSchema)
import mongoose, { Schema } from "mongoose";


const purchaseSchema = new Schema({
    s_id: {
        type: String,
        required: true
    },
    s_name: {
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
        Purchase_quantity: {
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
    }
}, {
    timestamps: true
});


export const Purchase = mongoose.models.purchase || mongoose.model("purchase", purchaseSchema)
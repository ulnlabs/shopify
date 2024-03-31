import mongoose, { Schema } from 'mongoose';

const item = new Schema ({
    name:String,
    price:Number,
    itemCode:Number,
    discount:Number,
    tax:String,
    taxType:String,
    discountType:String,
    quantity:Number,
    unitcost:Number,
    subtotal:Number,
})

export const items= mongoose.models.items || mongoose.model('items',item)
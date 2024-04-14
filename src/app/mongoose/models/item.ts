import mongoose, { Schema } from 'mongoose';

const item = new Schema ({
    itemName:String,
    price:Number,
    itemCode:String,
    discount:Number,
    tax:String,
    taxType:String,
    discountType:String,
    quantity:Number,
})

export const items= mongoose.models.items || mongoose.model('items',item)
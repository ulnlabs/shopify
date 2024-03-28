import mongoose, { Schema } from 'mongoose';

const item = new Schema ({
    name:String,
    price:Number,
    item_no:Number,
    discount:Number,
    tax:Number,
    tax_type:String,
    dis_type:String,
    quantity:Number,
    unitcost:Number,
    subtotal:Number,
})

export const items= mongoose.models.items || mongoose.model('items',item)
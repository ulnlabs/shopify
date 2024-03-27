import mongoose, { Schema, Document } from 'mongoose';

export interface IShopifyItem extends Document {
  itemCode: string;
  itemName: string;
  suppliers: string;
  purchasePrice: number;
  profitMargin: number;
  salesPrice: number;
  minQty: number;
  expireDate: Date;
  description: string;
  tax: number;
  finalPrice: number;
  discountType: string;
  discount: number;
  currentOpeningStock: number;
  adjustmentNote: string;
}

const ShopifyItemSchema: Schema = new Schema({
  itemCode: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  minQty: {
    type: Number,
    required: true
  },
  expireDate: {
    type: Date
  },
  barcode: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  taxType: {
    type: String
  },
  profitMargin: {
    type: Number,
    required: true
  },
  salesPrice: {
    type: Number,
    required: true
  },
  finalPrice: {
    type: Number,
    required: true
  },
  discountType: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  currentOpeningStock: {
    type: Number,
    required: true
  },
});
const Item = mongoose.models.ShopifyItem || mongoose.model('ShopifyItem', ShopifyItemSchema)

export default Item;


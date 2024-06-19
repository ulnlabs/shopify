import mongoose, { Schema, Document } from 'mongoose';

const ShopifyItemSchema: Schema = new Schema({
  itemCode: {
    type: String,
    required: true,
    unique: true
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
  /* minQty: {
    type: Number,
    required: true
  }, */
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  barcode: {
    type: String
  },
  description: {
    type: String,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  tax: {
    type: String,
    required: true
  },
  /*  purchasePrice: {
     type: Number,
     required: true
   }, */
  taxType: {
    type: String,
  },
  profitMargin: {
    type: Number,
    required: true
  },
  /*   salesPrice: {
      type: Number,
      required: true
    },
    finalPrice: {
      type: Number,
      required: true
    }, */
  discountType: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: true,
    required: true

  }
  /*  currentOpeningStock: {
     type: Number,
     required: true
   }, */
});
const Item = mongoose.models.ShopifyItem || mongoose.model('ShopifyItem', ShopifyItemSchema)

export default Item;


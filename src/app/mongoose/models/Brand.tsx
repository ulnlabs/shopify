import mongoose, { Schema, Document } from 'mongoose'

export interface IBrand extends Document {
  name: string
  desc?: string
}

const BrandSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSchema)
export default Brand

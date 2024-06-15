import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const Category = mongoose.models.Category || mongoose.model<CategoryType>("Category", categorySchema);

export default Category;

export interface CategoryType extends mongoose.Document {
  name: string;
  description: string;
}


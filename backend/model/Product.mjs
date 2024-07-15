import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  subCategoryItemId: {
    type: Schema.Types.ObjectId,
    ref: "SubCategoryItem",
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isGenderSpecific: {
    type: Boolean,
    required: true,
  },
  gender: {
    type: [String],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Product = model("Product", ProductSchema);

export default Product;

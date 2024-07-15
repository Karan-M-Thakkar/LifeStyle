import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  category: {
    type: String,
    unique: true,
    sparse: true,
    required: true,
  },
  subCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

const Category = model("Category", CategorySchema);

export default Category;

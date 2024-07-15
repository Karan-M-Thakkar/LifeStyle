import { Schema, model } from "mongoose";

const SubCategorySchema = new Schema({
  subCategory: {
    type: String,
    unique: true,
    sparse: true,
    required: true,
  },
  subCategoryItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategoryItem",
    },
  ],
});

const SubCategory = model("SubCategory", SubCategorySchema);

export default SubCategory;

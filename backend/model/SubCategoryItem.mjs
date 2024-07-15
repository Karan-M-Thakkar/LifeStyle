import { Schema, model } from "mongoose";

const SubCategoryItemSchema = new Schema({
  item: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
});

const SubCategoryItem = model("SubCategoryItem", SubCategoryItemSchema);

export default SubCategoryItem;

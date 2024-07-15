import { Router } from "express";
import Category from "../model/Category.mjs";

const utilsRouter = Router();

utilsRouter.get("/get-category-tree", async (req, res, next) => {
  try {
    const categories = await Category.find({}).populate({
      path: "subCategories",
      model: "SubCategory",
      populate: {
        path: "subCategoryItems",
        model: "SubCategoryItem",
      },
    });

    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
});

export default utilsRouter;

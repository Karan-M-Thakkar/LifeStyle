import { Router } from "express";
import Product from "../model/Product.mjs";

const productRouter = Router();

productRouter.post("/", async (req, res, next) => {
  const productDetails = req.body;

  const {
    categoryId,
    subCategoryId,
    subCategoryItemId,
    brand,
    title,
    description,
    isGenderSpecific,
    gender,
  } = productDetails;

  if (
    !categoryId ||
    !subCategoryId ||
    !subCategoryItemId ||
    !brand ||
    !title ||
    !description ||
    isGenderSpecific === undefined ||
    !gender
  ) {
    return res.status(401).json({
      code: 401,
      message:
        "Bad Request! At least one of the required attributes are missing or invalid!",
    });
  }

  const productDocument = {
    categoryId,
    subCategoryId,
    subCategoryItemId,
    brand,
    title,
    description,
    isGenderSpecific,
    gender,
  };

  try {
    const addedProduct = await Product.create(productDocument);

    res
      .status(201)
      .json({ message: "Product Added Successfully!", product: addedProduct });
  } catch (error) {
    next(error);
  }
});

productRouter.get("/search", async (req, res, next) => {
  const { query } = req;
  const { term, categoryId, subCategoryId, subCategoryItemId } = query;

  const criteria = { title: new RegExp(term, "i") };

  if (categoryId) {
    criteria.categoryId = categoryId;
  }

  if (subCategoryId) {
    criteria.subCategoryId = subCategoryId;
  }

  if (subCategoryItemId) {
    criteria.subCategoryItemId = subCategoryItemId;
  }

  try {
    const products = await Product.find(criteria).select("_id title");

    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
});

export default productRouter;

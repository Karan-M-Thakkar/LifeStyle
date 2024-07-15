import { Router } from "express";
import { checkAuthMiddleWare } from "./auth.mjs";

const userRouter = Router();

userRouter.use(checkAuthMiddleWare);

userRouter.post("/add-to-wishlist", async (req, res) => {
  res.status(201).send({ message: "Product added to wishlist!" });
});

export default userRouter;

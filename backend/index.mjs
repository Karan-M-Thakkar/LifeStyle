import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./router/auth.mjs";
import productRouter from "./router/product.mjs";
import userRouter from "./router/user.mjs";
import utilsRouter from "./router/utils.mjs";

const PORT = process.env.PORT || 3000;
const password = process.env.MONGODB_PASSWORD;

if (!password) {
  console.log("Please configure password for MongoDB connection");
  process.exit(1);
}

const mongoDbUrl = `mongodb+srv://karan_thakkar:${password}@styles-db.zxturjm.mongodb.net/styles?retryWrites=true&w=majority&appName=styles-db`;

mongoose.set("strictQuery", false);

mongoose.connect(mongoDbUrl);

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  setTimeout(next, 3000);
});

app.use("/auth", authRouter);

app.use("/user", userRouter);

app.use("/utils", utilsRouter);

app.use("/product", productRouter);

app.use((error, req, res, next) => {
  const code = error.code || 500;
  const message = error.message || "Internal Server Error";

  res.status(code).json({ code, message });
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}...`);
});

import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

const createJWT = (payload) => {
  return sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const verifyJWT = (token) => {
  return verify(token, process.env.JWT_SECRET);
};

export { createJWT, verifyJWT };

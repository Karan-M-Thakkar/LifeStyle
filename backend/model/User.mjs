import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  countryCallingCode: String,
  nationalNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", UserSchema);

export default User;

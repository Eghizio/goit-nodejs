import { model, Schema } from "mongoose";

export const User = model("user", new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Password should be hashed and salted
  password: { type: String, required: true },
}));

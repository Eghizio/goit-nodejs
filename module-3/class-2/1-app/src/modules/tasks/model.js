import { model, Schema } from "mongoose";

export const Task = model("task", new Schema({
  name: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
}));

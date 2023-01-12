import dotenv from "dotenv";
import mongoose, { Schema } from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

process.on("SIGINT", () => {
  mongoose.disconnect();
  console.log("Database disconnected!");
});

// const simpleStudentsSchema = new Schema({
//   name: String,
//   age: Number,
//   grades: [Number],
//   isAdmin: Boolean,
// });

// const User = mongoose.model("user", simpleStudentsSchema);

// const gregory = new User({
//   name: "Grzegorz",
//   age: 100,
//   grades: [4, 2, 5, 6],
//   isAdmin: true,
// });

// gregory.save().then(console.log);


const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
    // index: 1,
    // unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grades: {
    type: [Number],
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

// Model
const Student = mongoose.model("student", studentSchema);


const main = async () => {
  await Student.remove().then(console.log);

  await Student.create({ name: "Adam", age: 21 }).then(console.log);
  await Student.insertMany([
    { name: "Beth", age: 24 },
    { name: "Cecil", age: 42 },
    { name: "Kuba", age: 25 },
  ]).then(console.log)

  await Student.find().then(console.log);

  await Student.findOne({ name: "Adam" }).then(console.log);


  await Student.findOneAndRemove({ name: "Adam" }).then(console.log);

  await Student.findOneAndUpdate({ name: "Cecil" }, { age: 44 }).then(console.log);
};

main().catch(console.error);


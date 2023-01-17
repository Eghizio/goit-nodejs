import path from "path";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config.js";
import { api } from "./api.js";
import "./middlewares.js";


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join("src", "public")));

app.use("/api", api);

app.listen(3000, () => {
  mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(`\n${new Date().toISOString()}`);
    console.log(`Connected to the database.`);
    console.log(`Listening on http://localhost:3000`);
  });
});
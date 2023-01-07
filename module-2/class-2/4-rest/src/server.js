import express from "express";
import cors from "cors";
import morgan from "morgan";
import { tasksRouter } from "./tasks.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/tasks", tasksRouter);

app.listen(3000, () => console.log("Listening on 3000..."));

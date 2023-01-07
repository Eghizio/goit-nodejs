import express from "express";
import morgan from "morgan"; // alternative https://www.npmjs.com/package/winston
import { usersRouter } from "./users.js";

const getRandomLogLevel = () => {
  const morganLogLevels = ["combined", "common", "dev", "short", "tiny"];
  const randomLogLevel = morganLogLevels[Math.floor(Math.random() * morganLogLevels.length)];
  console.log(`Using Morgan log level - ${randomLogLevel}`);
  return randomLogLevel;
};


const app = express();

// app.use(morgan("dev"));
app.use(morgan(getRandomLogLevel()));


app.use(express.json());
app.use("/", express.static("./src/public"));
app.use("/users", usersRouter);

app.listen(3000, () => console.log("http://localhost:3000"));

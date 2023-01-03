import express from "express";
import { Logger, requestLogger } from "./utils.js";

const app = express();


let visits = 0;


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] - visits: ${++visits}`);
  next();
});

// Middleware register order matters
app.use(requestLogger);


app.get("/hello", requestLogger, (req, res) => {
  res.json({ "Hello": "There", visits });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.clear();
  Logger.cyan(`\n[server] Server running on port ${PORT}...\n${new Date()}\n`);
});
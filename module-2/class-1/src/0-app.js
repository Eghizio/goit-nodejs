import express from "express";
import { Logger } from "./utils.js";

const app = express();


app.get("/", (request, response) => {
  response.send("Hello there!");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact page</h1>");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.clear();
  Logger.cyan(`\n[server] Server running on port ${PORT}...\n${new Date()}\n`);
});
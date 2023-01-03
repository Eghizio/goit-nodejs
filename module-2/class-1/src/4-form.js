import express from "express";
import path from "path";
import { Logger } from "./utils.js";

const app = express();

app.set("json spaces", 2);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join("src", "public")));

app.post("/login", (req, res) => {
  const data = req.body;

  Logger.yellow(data);

  res.sendStatus(200);
});


const PORT = 3004;
app.listen(PORT, () => {
  console.clear();
  Logger.cyan(`\n[server] Server running on port ${PORT}...\n${new Date()}\n`);
});
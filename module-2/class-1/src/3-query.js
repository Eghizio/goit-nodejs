import express from "express";
import { Logger, users } from "./utils.js";

const app = express();

app.set("json spaces", 2);

app.get("/users", (req, res) => {
  console.log(req.query);
  const skip = parseInt(req.query.skip, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || Infinity;

  const requestedUsers = users
    .filter((_, i) => i >= skip)
    .slice(0, limit);

  res.json(requestedUsers);
});


const PORT = 3003;
app.listen(PORT, () => {
  console.clear();
  Logger.cyan(`\n[server] Server running on port ${PORT}...\n${new Date()}\n`);
});
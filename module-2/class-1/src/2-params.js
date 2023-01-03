import express from "express";
import { Logger, users } from "./utils.js";

const app = express();

app.set("json spaces", 2);


app.get("/contacts/:id", (req, res) => {
  res.send(`<h1>Contacts</h1> Parameter: ${req.params.id}`);
});

app.get("/users/:userid", (req, res) => {
  const id = req.params.userid;

  const user = users.find(user => user.id === id) ?? null;

  // if (!user) {
  //   Logger.red(`Couldn't find user with id: ${id}`);
  //   return res.sendStatus(404);
  // }

  // Logger.green(user);

  res.json({ user });
});


const PORT = 3002;
app.listen(PORT, () => {
  console.clear();
  Logger.cyan(`\n[server] Server running on port ${PORT}...\n${new Date()}\n`);
});
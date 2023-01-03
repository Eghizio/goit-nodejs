import { Router } from "express";
import { Logger, users } from "../utils.js";

export const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  console.log("Query:", req.query);
  const skip = parseInt(req.query.skip, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || Infinity;

  const requestedUsers = users
    .filter((_, i) => i >= skip)
    .slice(0, limit);

  res.json(requestedUsers);
});

usersRouter.get("/:userid", (req, res) => {
  const id = req.params.userid;

  const user = users.find(user => user.id === id) ?? null;

  if (!user) {
    Logger.red(`Couldn't find user with id: ${id}`);
    return res.sendStatus(404);
  }

  Logger.green(user);

  res.json({ user });
});

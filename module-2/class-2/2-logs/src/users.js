import { Router } from "express";

export const usersRouter = Router();

const users = [
  { id: 1, name: "Adam" },
  { id: 2, name: "Beth" },
  { id: 3, name: "Cecil" },
  { id: 4, name: "Kuba" },
];

usersRouter.get("/", async (req, res) => res.json(users));

usersRouter.post("/", async (req, res) => {
  const name = req.body.name;

  if (!name) throw new Error("KABOOOM!");

  const isNameTaken = users.filter(user => user.name === name).length > 0;
  if (isNameTaken) return res.sendStatus(400);

  const id = Math.max(...users.map(u => u.id)) + 1;
  users.push({ id, name });

  res.json({ id });
});
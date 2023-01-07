import { Router } from "express";
import { nanoid } from "nanoid";

export const tasksRouter = Router();

const createTask = (name) => ({
  id: nanoid().replaceAll("-", "_"), // just for id copying convenience
  name,
  isCompleted: false,
  dateCreated: new Date().toISOString()
});

const updateTask = (task, { name, isCompleted }) => ({
  ...task,
  name: name ? name : task.name,
  isCompleted: isCompleted ? isCompleted : task.isCompleted
});

const tasks = new Map();

const initialTask = createTask("First task");
tasks.set(initialTask.id, initialTask);



tasksRouter.get("/", (req, res) => res.json([...tasks.values()]));

tasksRouter.get("/:id", (req, res) => {
  const requestedTask = tasks.get(req.params.id);
  return requestedTask ? res.json({ task: requestedTask }) : res.sendStatus(404);
});

tasksRouter.post("/", (req, res) => {
  const name = req.body.name;

  if (!name) return res.sendStatus(400);

  const task = createTask(name);
  tasks.set(task.id, task);

  return res.status(201).json({ task });
});

tasksRouter.patch("/:id", (req, res) => {
  const id = req.params.id;

  const taskToEdit = tasks.get(id);

  if (!taskToEdit) return res.sendStatus(404);

  const { name, isCompleted } = req.body;
  const updatedTask = updateTask(taskToEdit, { name, isCompleted });
  tasks.set(updatedTask.id, updatedTask);

  return res.json({ task: updatedTask });
});

tasksRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  const taskToDelete = tasks.get(id);

  if (!taskToDelete) return res.sendStatus(404);

  tasks.delete(taskToDelete.id);

  return res.json({ id: taskToDelete.id });
});

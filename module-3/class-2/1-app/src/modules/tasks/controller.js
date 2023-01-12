import * as TasksService from "./service.js";

export const getAllTasks = async (req, res) => {
  const allTasks = await TasksService.getAll();
  return res.status(200).json(allTasks);
};

export const getTaskById = async (req, res) => {
  const id = req.params.id;

  const requestedTask = await TasksService.getById(id);

  if (!requestedTask) return res.sendStatus(404);
  return res.json(requestedTask);
};

export const createTask = async (req, res) => {
  const name = req.body.name;

  if (!name) return res.sendStatus(400);

  const task = await TasksService.create(name);

  return res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const id = req.params.id;
  const { name, isCompleted } = req.body;

  const exists = await TasksService.exists(id);

  if (!exists) return res.sendStatus(404);

  const updatedTask = await TasksService.update(id, { name, isCompleted });

  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;

  const exists = await TasksService.exists(id);

  if (!exists) return res.sendStatus(404);

  const deletedTask = await TasksService.deleteById(id);

  res.json(deletedTask);
}
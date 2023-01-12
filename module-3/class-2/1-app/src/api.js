import { Router } from "express";
import * as TasksController from "./modules/tasks/controller.js";

export const api = Router();

// Could accept query for filtering properties (example: return only names)
api.get("/tasks", TasksController.getAllTasks);

api.get("/tasks/:id", TasksController.getTaskById);

api.post("/tasks", TasksController.createTask);

// Middleware for validating request body (if body is invalid, reject request prematurely)
api.patch("/tasks/:id", TasksController.updateTask);

// Middleware for validating ID?
api.delete("/tasks/:id", TasksController.deleteTask);

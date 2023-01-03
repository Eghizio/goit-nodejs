import { Router } from "express";
import { contacts } from "../utils.js";

export const contactsRouter = Router();

contactsRouter.get("/", (req, res) => res.json({ contacts }));

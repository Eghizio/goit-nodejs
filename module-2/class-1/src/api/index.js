import { Router } from "express";
import { contactsRouter } from "./contacts.js";
import { usersRouter } from "./users.js";

export const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/contacts", contactsRouter);

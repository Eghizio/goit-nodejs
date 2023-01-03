import express from "express";
import path from "path";
import { contactsRouter } from "./api/contacts.js";
import { usersRouter } from "./api/users.js";
// import { apiRouter } from "./api/index.js";
import { Logger, requestLogger, Roles } from "./utils.js";

const app = express();

app.use(requestLogger);
app.use("/", express.static(path.join("src", "public")));

const requireRoles = (roles = []) => (req, res, next) => {
  const role = req.headers["role"];
  const isRoleAllowed = roles.includes(role);

  if (!isRoleAllowed) {
    Logger.red(`User has no admin permissions!`);
    return res.sendStatus(401);
  }

  next();
};

// app.use("/api", apiRouter);
app.use("/api/users", requireRoles([Roles.Admin]), usersRouter);
app.use("/api/contacts", contactsRouter);


app.get("/", (req, res) => res.redirect("/form.html"));
app.get("/hello", (req, res) => res.send("Hello there"));


const PORT = 3005;
app.listen(PORT, () => {
  console.clear();
  Logger.cyan(`\n[server] Server running on port ${PORT}...\n${new Date()}\n`);
});

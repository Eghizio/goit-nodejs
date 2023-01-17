import { Router } from "express";
import { User } from "./User.js";
import jwt from "jsonwebtoken";
import { config } from "./config.js";
import { auth } from "./middlewares.js";

// dummy implemenation (OWASP attacks)
// Use bcrypt or argon2
const hashPassword = (pwd) => "_#ash_$alt_" + pwd;
const isValidPassword = (pwd, user) => user && hashPassword(pwd) === user.password;

export const api = Router();

api.post("/registration", async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) return res.status(409).json({ message: "Email already in use" });

  try {
    const hashedPwd = hashPassword(password);
    await User.create({ username, email, password: hashedPwd });
    return res.status(201).json({ message: "User registered" });
  } catch (error) {
    next(error);
  }
});

api.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isValidPwd = isValidPassword(password, user);

  if (!user || !isValidPwd) return res.status(400).json({ message: "Invalid credentials" });

  const payload = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
  return res.json({ token });
});

api.get("/protected", auth, (req, res) => {
  const { username } = req.user;
  return res.json({
    message: `Authorization successful: ${username}`, data: {
      secret: "Najpierw mleko potem płatki"
    }
  });
});

api.get("/public", (req, res) => res.json({ public: "Publicly available data" }));
// api.get("/public", auth, (req, res) => res.json({ public: "Publicly available data" }));
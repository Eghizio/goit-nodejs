const createLogger = (color) => (...text) => console.log(color, ...text);

export const Logger = {
  cyan: createLogger("\x1b[36m%s\x1b[0m"),
  green: createLogger("\x1b[32m%s\x1b[0m"),
  red: createLogger("\x1b[31m%s\x1b[0m"),
  yellow: createLogger("\x1b[33m%s\x1b[0m"),
};

export const requestLogger = (req, res, next) => {
  Logger.yellow(`[${req.method}] ${new Date().toISOString()} "${req.originalUrl}"`);
  next();
};

export const users = [
  { id: "1", name: "Adam", },
  { id: "2", name: "Beth", },
  { id: "3", name: "Cecil", },
  { id: "4", name: "Kuba", },
];

export const contacts = [
  { name: "Adam", email: "adam@mail.com" },
  { name: "Beth", email: "beth@mail.com" },
  { name: "Cecil", email: "cecil@mail.com" },
  { name: "Kuba", email: "kuba@gmail.com" },
];

export const Roles = Object.freeze({
  User: "user",
  Admin: "admin"
});